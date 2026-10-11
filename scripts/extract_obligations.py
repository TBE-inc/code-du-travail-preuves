"""Extraction par règles des obligations pesant sur l'employeur dans le Code du travail.

Entrée : 02-extractions/code-du-travail-articles.json (sortie de parse.py)
Sortie : 02-extractions/obligations.csv (une ligne par phrase-obligation)

Méthode : découpage en phrases, détection d'un sujet employeur + d'un marqueur
d'obligation (présent de l'indicatif juridique, « doit », « est tenu », interdiction),
puis classement par catégorie, destinataire, seuil d'effectif et fréquence.
C'est une première passe heuristique : sa précision est mesurée sur échantillon.
"""
import csv
import json
import re
import sys

SRC, OUT = sys.argv[1], sys.argv[2]

NOMBRES = {
    'onze': 11, 'vingt': 20, 'vingt-cinq': 25, 'cinquante': 50, 'cent': 100,
    'cent cinquante': 150, 'deux cents': 200, 'deux cent cinquante': 250,
    'trois cents': 300, 'cinq cents': 500, 'mille': 1000, 'deux mille': 2000,
    'trois mille': 3000, 'cinq mille': 5000, 'dix mille': 10000,
}
NB = '|'.join(sorted(NOMBRES, key=len, reverse=True))
SEUIL = re.compile(
    rf"(au moins|moins de|plus de|d'au moins|inférieur à|supérieur à|égal ou supérieur à|de)\s+"
    rf"({NB}|\d+)\s+salariés", re.I)

SUJET = re.compile(
    r"\b(l'employeur|les employeurs|le chef d'entreprise|l'entreprise|les entreprises|"
    r"l'entreprise utilisatrice|l'entrepreneur|l'entreprise de travail temporaire|"
    r"le donneur d'ordre|le maître d'ouvrage|l'exploitant|l'établissement)\b", re.I)
# employeur complément d'objet (« condamnant l'employeur », « à l'employeur ») : pas sujet
EMPL_OBJET = re.compile(r"(\bà|\bde|\bdu|contre|condamnant|demander à|auprès de|entre)\s+(l'employeur|l'entreprise|les employeurs|les entreprises)\b", re.I)
EMPL = re.compile(r"\b(l'employeur|les employeurs|le chef d'entreprise|l'entreprise|les entreprises|l'entreprise utilisatrice|"
                  r"l'entrepreneur|l'entreprise de travail temporaire|le donneur d'ordre|le maître d'ouvrage|l'exploitant|"
                  r"la coopérative|la structure|l'utilisateur|l'organisme d'accueil|l'agence|chaque entrepreneur|tout employeur|chaque employeur|le groupement)\b", re.I)

# obligations au passif, employeur sous-entendu (« le comité est consulté », « un registre est tenu »)
PASSIF = re.compile(
    r"\b(est|sont)\s+(consulté|consultés|informé|informés|tenu|tenus|établi|établie|établis|affiché|affichée|affichés|"
    r"remis|remise|transmis|transmise|communiqué|communiquée|communiqués|mis à (la )?disposition|mise à (la )?disposition|"
    r"adressé|adressée|notifié|notifiée|déclaré|déclarée|conservé|conservée|conservés|annexé|annexée|joint|jointe|"
    r"soumis à l'avis|soumise à l'avis|organisé|organisée|réalisé|réalisée|effectué|effectuée|vérifié|vérifiés|"
    r"installé|installée|aménagé|aménagés|aménagée|équipé|équipés|fourni|fournie|fournis|délivré|délivrée|versé|versée|"
    r"porté à la connaissance|portée à la connaissance|mis en place|mise en place|élaboré|élaborée|mis à jour|"
    r"tenu à la disposition|tenue à la disposition|tenus à la disposition|tenues à la disposition)\b", re.I)
PASSIF_ADMIN = re.compile(r"par (l'autorité|le préfet|l'inspecteur|le directeur|le ministre|décret|arrêté|la commission|"
                          r"le juge|le conseil|l'opérateur|l'organisme|la caisse|France Travail|l'Etat|l'État|le président)", re.I)
# passifs où l'employeur subit ou reçoit, ou hors champ employeur
EXCL_PASSIF = re.compile(r"(l'employeur|le groupement|l'entreprise|les entreprises)[^.]{0,80}(est|sont) (informé|informés|invité|notifié)|"
                         r"\bà l'(employeur|entreprise)\b[^.]{0,30}$|est versée? à l'(employeur|entreprise)|dossier médical|"
                         r"comptes (annuels )?du comité|aide[^.]{0,60}est versée|par le médecin|au médecin|par le comité", re.I)
# droits du salarié = obligation de l'employeur (« le salarié bénéficie d'un entretien avec son employeur »)
DROIT_SAL = re.compile(r"(le salarié|les salariés|tout salarié|le travailleur|les travailleurs|chaque travailleur)[^.]{0,40}"
                       r"\b(bénéficie|bénéficient|a droit|ont droit)\b", re.I)

SUJET_ADMIN = re.compile(
    r"^\s*(l'autorité administrative|l'inspecteur|l'agent de contrôle|le directeur|le préfet|"
    r"le ministre|le juge|le conseil|la commission|le comité|le salarié|les salariés|"
    r"le médecin|un décret|un arrêté)", re.I)

OBLIG = re.compile(
    r"\b(doit|doivent|est tenu|sont tenus|est tenue|a l'obligation|est obligatoire|sont obligatoires|"
    r"informe|consulte|transmet|adresse|communique|notifie|déclare|établit|tient|affiche|"
    r"met à (la )?disposition|remet|verse|organise|engage|négocie|convoque|propose|"
    r"conserve|procède|élabore|met en place|met en œuvre|met en oeuvre|assure|publie|"
    r"porte à la connaissance|saisit|justifie|fournit|désigne|rembourse|paie|prend en charge|"
    r"prend les mesures|veille|garantit|recueille|consigne|enregistre|évalue|"
    r"fait la proposition|fait connaître|fait parvenir|soumet|présente|recueille l'avis|demande l'avis|s'assure|"
    r"vérifie|effectue|réalise|accorde|informe et consulte|met à jour|mentionne|indique|précise|"
    r"ne peut|ne peuvent|est interdit|sont interdits|il est interdit)\b", re.I)

ADMIN_DEST = r"(autorité administrative|inspecteur du travail|inspection du travail|agent de contrôle|" \
             r"DREETS|direction régionale|préfet|organismes? de protection sociale|France Travail|" \
             r"Pôle emploi|caisse|URSSAF|administration|greffe|conseil de prud'hommes|ministre)"

CATEGORIES = [
    ('autorisation', re.compile(r"autorisation[^.]{0,80}" + ADMIN_DEST + r"|" + ADMIN_DEST + r"[^.]{0,80}autoris|soumis à autorisation", re.I)),
    ('declaration_admin', re.compile(
        r"(transm|adress|communiqu|déclar|notifi|inform|saisi|dépos|envoi)[^.]{0,120}" + ADMIN_DEST +
        r"|(effectue|accomplit|adresse)[^.]{0,40}déclaration|déclaration (préalable|nominative|d'activité)", re.I)),
    ('consultation_cse', re.compile(r"(consult|avis)[^.]{0,80}comité social et économique|comité social et économique[^.]{0,60}(consulté|émet un avis|rend un avis)", re.I)),
    ('information_cse', re.compile(r"(inform|communique|transmet|met à (la )?disposition|fournit)[^.]{0,80}(comité social et économique|délégation du personnel|représentants du personnel|expert)", re.I)),
    ('negociation', re.compile(r"(engage|ouvre)[^.]{0,30}négociation|négocie", re.I)),
    ('affichage', re.compile(r"affich|par tout moyen", re.I)),
    ('registre_document', re.compile(
        r"registre|document unique|dossier|(établit|tient|élabore|conserve|consigne|enregistre|tenu|mentionne)[^.]{0,60}"
        r"(document|bilan|rapport|plan|programme|liste|fiche|relevé|attestation|décompte|base de données)|"
        r"établit par écrit|plan (particulier|de prévention|général)|\bdocuments?\b[^.]{0,40}(est|sont) (tenu|conservé|établi)", re.I)),
    ('information_salarie', re.compile(
        r"(inform|remet|notifie|porte à la connaissance|communique|délivre|transmet)[^.]{0,80}(salarié|travailleur|intéressé|candidat|apprenti|stagiaire)|"
        r"\b(l'|les |lui )(informe|remet|notifie|communique)", re.I)),
    ('entretien_salarie', re.compile(r"entretien (professionnel|de parcours|individuel|annuel)|bénéficie[^.]{0,30}entretien", re.I)),
    ('formalisme_procedure', re.compile(
        r"lettre recommandée|par écrit|convoqu|entretien préalable|à peine de nullité|mentions|délai de", re.I)),
    ('preuve_justification', re.compile(r"\b(justifie|fournit au juge|apporte la preuve|éléments de nature à justifier)", re.I)),
    ('versement', re.compile(r"\b(verse|paie|rembourse|prend en charge)\b|indemnité|contribution|cotisation|rémunération", re.I)),
    ('sante_securite', re.compile(
        r"mesures (nécessaires|de prévention|de protection)|équipement|vérification|risque|"
        r"protection individuelle|sécurité(?! sociale)|évalue|siège|locaux|local |sanitaires|vestiaire|éclairage|"
        r"aération|incendie|machine|installation|exposition|bruit|écran", re.I)),
    ('formation', re.compile(r"\bformation|adaptation des salariés", re.I)),
    ('organisation_travail', re.compile(r"organise l'activité|horaire|pause|repos|durée du travail|temps de travail", re.I)),
    ('interdiction', re.compile(r"\bne peut\b|\bne peuvent\b|interdit", re.I)),
]

FREQ = [
    ('annuelle', re.compile(r"chaque année|annuellement|tous les ans|une fois par an|au moins une fois par an|annuel(le)?\b", re.I)),
    ('pluriannuelle', re.compile(r"tous les (deux|trois|quatre|cinq|six) ans|triennal|quadriennal", re.I)),
    ('mensuelle', re.compile(r"chaque mois|mensuel", re.I)),
    ('trimestrielle', re.compile(r"chaque trimestre|trimestriel", re.I)),
    ('embauche', re.compile(r"embauche|recrutement|conclusion du contrat", re.I)),
    ('rupture', re.compile(r"licenci|rupture|démission|fin du contrat|terme du contrat", re.I)),
]


def seuil(text):
    vals = []
    for m in SEUIL.finditer(text):
        n = m.group(2).lower()
        vals.append(int(n) if n.isdigit() else NOMBRES[n])
    return min(vals) if vals else ''


def phrases(text):
    # coupe sur « . » suivi d'une majuscule, sans couper « L. 1234 » ni « art. »
    parts = re.split(r"(?<![A-Z])(?<!\bart)(?<!\bn°)\.\s+(?=[A-ZÀ-ÝÉ])", text)
    return [p.strip() for p in parts if len(p.strip()) > 15]


arts = json.load(open(SRC, encoding='utf-8'))
rows = []
for a in arts:
    for i, ph in enumerate(phrases(a['text'])):
        if re.search(r"\best puni|\bsont punis|\bamende de\b|emprisonnement", ph, re.I):
            continue  # sanction pénale : traitée à part, pas une obligation nouvelle
        sujet = [m for m in EMPL.finditer(ph) if not EMPL_OBJET.search(ph[max(0, m.start() - 15):m.end()])]
        actif = bool(sujet) and bool(OBLIG.search(ph[sujet[0].start():]))
        if actif and SUJET_ADMIN.search(ph) and not re.search(r"l'employeur", ph[:80], re.I):
            actif = False
        if actif and re.search(r"\bpeu(t|vent)\b", ph) and not re.search(r"\bne peu(t|vent)\b", ph) \
                and not OBLIG.search(re.sub(r"\bpeu(t|vent)\b[^,.;]*", "", ph)):
            actif = False  # simple faculté
        passif = bool(PASSIF.search(ph)) and not PASSIF_ADMIN.search(ph) and not re.search(r"\bpeu(t|vent) être\b", ph)
        if passif and EXCL_PASSIF.search(ph):
            passif = False
        if actif and re.match(r"\s*(le médecin|les médecins|le service de|l'organisme|l'opérateur|France compétences|la caisse)", ph, re.I):
            actif = False
        droit = bool(DROIT_SAL.search(ph))
        if not (actif or passif or droit):
            continue
        mode = 'actif' if actif else ('passif' if passif else 'droit_salarie')
        cats = [c for c, p in CATEGORIES if p.search(ph)]
        freq = next((f for f, p in FREQ if p.search(ph)), 'evenement')
        rows.append({
            'article': a['id'],
            'nature': 'L' if a['id'].startswith('L') else a['id'][0],
            'partie': a['Partie'][:60],
            'livre': a['Livre'][:90],
            'titre': a['Titre'][:90],
            'phrase_no': i,
            'categorie': cats[0] if cats else 'autre',
            'categories': ';'.join(cats),
            'seuil_effectif': seuil(a['text']),
            'frequence': freq,
            'mode': mode,
            'texte': ph[:600],
        })

with open(OUT, 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)
print(len(rows), 'obligations dans', len({r['article'] for r in rows}), 'articles')
