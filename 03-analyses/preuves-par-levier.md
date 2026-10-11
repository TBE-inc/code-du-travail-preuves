# Étape 3 — Ce que disent les preuves, levier par levier

11 octobre 2026. Confronte les gros postes de coût (`premiere-passe.md`) aux études du corpus (`01-sources/etudes/`).
Textes extraits dans `02-extractions/etudes-texte/` ; les références « p. N » renvoient à la page du PDF.

## Comment lire ce document

Pour chaque levier : ce que coûte la règle aujourd'hui, ce que disent les études, l'effet attendu d'un allègement
sur chaque objectif (`00-pilotage/objectifs.md`), qui perd, et un verdict.

**Niveaux de preuve** :
- **fort** : plusieurs études causales concordantes ou méta-analyse ;
- **moyen** : une étude causale solide, ou plusieurs études concordantes de qualité inégale ;
- **faible** : corrélations, études qualitatives, témoignages, ou résultats contradictoires.

**Verdicts** :
- **Gagnant partout** : améliore au moins un objectif sans dégrader de garde-fou. À retenir.
- **Gagnant sous condition** : gain probable, mais dégrade un garde-fou sans mesure d'accompagnement. Retenir avec la condition.
- **Non soutenu** : les preuves ne justifient pas l'allègement, ou le gain est trop faible.

---

## 1. Seuils d'effectif (11 et 50 salariés)

**Coût actuel** : au passage de 49 à 50 salariés, +2 200 à +14 800 € de charge administrative par an, et les heures
de délégation passent de 20 à 72 h par mois (R2314-1), soit +624 h, environ +27 600 € par an si elles sont toutes utilisées.
Au total, de l'ordre de 1 à 2 % de la masse salariale d'une entreprise de 50 salariés.

**Preuves** :
- Garicano, Lelarge et Van Reenen (données françaises 2002-2007, `garicano-...nber18841`, résumé p. 2 et p. 19) :
  accumulation nette d'entreprises à 49 salariés ; le seuil équivaut à une **taxe implicite d'environ 1,3 %** sur le
  travail (1 % à 3,3 % selon les variantes). Perte de bien-être collectif inférieure à 1 % du PIB si les salaires
  sont flexibles, **supérieure à 5 %** s'ils sont rigides à la baisse. **Les principaux perdants sont les salariés**,
  les gagnants les petites entreprises. — *Niveau moyen* (une étude structurelle solide ; données antérieures aux
  réformes de 2017 et 2019).
- Notre estimation (1 à 2 % de la masse salariale) tombe dans le même ordre de grandeur : deux méthodes indépendantes concordent.
- France Stratégie 2021 (`france-strategie-2021-...`, p. 14) : 41 % seulement des entreprises de 10 salariés et plus
  ont une instance représentative ; 49 000 procès-verbaux de carence fin 2020. Beaucoup de petites entreprises ne
  portent donc pas ce coût en pratique.

**Effet attendu d'un lissage** (obligations qui montent progressivement au lieu d'un saut à 50) :
croissance et productivité + (des entreprises cessent de se bloquer sous le seuil) ; emploi + modeste ;
salaires + (Garicano : les salariés sont les perdants actuels). Garde-fous : légère baisse des moyens de représentation
dans les entreprises de 50 à 75 salariés.

**Verdict : gagnant sous condition.** Lisser plutôt que relever : relever le seuil déplace simplement l'accumulation
d'entreprises un peu plus loin. Exemple concret : heures de délégation progressives entre 25 et 99 salariés au lieu
du saut de 20 à 72 h. Condition : garder la représentation, en changer la pente.

---

## 2. Procédure de licenciement et protection du CDI

**Coût actuel** : procédure de licenciement pour motif personnel, 84 à 690 M€ par an (898 000 licenciements).
France : indice OCDE de protection contre le licenciement de **2,68** en 2025 (moyenne OCDE 2,21 ; Danemark 1,94 ;
Allemagne 2,33 ; Italie 2,86), `donnees/ocde/protection-emploi-epl.csv`.

**Preuves sur l'économie** :
- Effet sur le **niveau** d'emploi ou de chômage : **pas d'effet net démontré**. Cahuc et Palladino 2024 (conclusion,
  p. 15) : résultats « mitigés » ; Avdagic 2013 (résumé) : « pas de soutien clair », résultats instables selon
  l'échantillon ; Howell et al. 2006 : la majorité des estimations ne sont pas significatives. — *Niveau fort*
  (convergence de revues dans les deux camps).
- Effet sur la **productivité et la réallocation** : négatif. Bassanini, Nunziata et Venn (différence de différences
  par secteur, OCDE 1982-2003) : la protection contre le licenciement freine la croissance de la productivité là où
  elle est contraignante ; Cahuc et Palladino : elle ralentit le passage des emplois vers les entreprises les plus
  productives. — *Niveau moyen à fort*.
- Contre-argument : Vergeer et Kleinknecht 2014 (`contre-arguments/`) : la déréglementation et la rotation de la
  main-d'œuvre peuvent nuire à l'apprentissage dans l'entreprise et à l'innovation « de routine ». — *Niveau faible à moyen*.
- Réformes étrangères :
  - **Italie (Jobs Act 2015)**, Boeri et Garibaldi (résumé) : forte hausse des embauches en CDI et des transformations
    de CDD en CDI ; effets faibles sur les licenciements, concentrés sur les grandes entreprises. Mais la réforme
    combinait une subvention à l'embauche : impossible de séparer les deux effets.
  - **Allemagne (Hartz)**, Bradley et Kügler 2019 (résumé) : le chômage dure moins longtemps, mais **le chômage
    total ne baisse pas et les salaires baissent** ; les peu qualifiés perdent le plus ; la baisse des allocations
    explique l'essentiel de la baisse des salaires.
  - **Danemark (flexisécurité)**, Kreiner et Svarer 2022 (résumé) : licenciement facile et indemnisation généreuse
    **ne suffisent pas** ; il faut un accompagnement actif massif, évalué par expériences contrôlées. Algan et Cahuc
    2005 : le modèle repose sur un fort civisme et se transpose mal en Europe continentale.

**Preuves sur les garde-fous** :
- Sullivan et von Wachter 2009 (résumé) : une perte d'emploi augmente la mortalité de **15 à 20 % sur 20 ans**,
  soit environ 1,5 an d'espérance de vie en moins pour un salarié licencié à 40 ans. — *Niveau fort*.
- Nordt et al. 2015 : environ un suicide sur cinq associé au chômage (63 pays ; association). Clark et Oswald 1994 :
  les chômeurs ont un bien-être nettement plus bas, à caractéristiques égales.
- Sverke et al. 2019 : les effets négatifs de l'insécurité de l'emploi sont **plus faibles là où la protection sociale
  est forte**. Fabrin-Petersen 2022 : l'effet des contrats précaires sur le bien-être passe par l'insécurité
  **ressentie**, pas par le contrat lui-même.

**Effet attendu** :
- Simplifier la **forme** (modèles officiels de lettre, présomption de régularité, une erreur de forme sanctionnée par
  une indemnité plafonnée) : coût administratif −, insécurité juridique −, rien ne change sur le fond. Le barème
  de 2017 est déjà appliqué dans 90 % des cas (France Stratégie 2021, p. 16).
- Réduire la protection **sur le fond** : productivité +, emploi ≈ 0, mais risque sur la santé et le bien-être des
  licenciés si la transition n'est pas sécurisée (Hartz : salaires −).

**Verdict** :
- **Forme : gagnant partout, mais déjà fait en grande partie.** Relecture de L1235-2 : depuis 2017, une irrégularité de procédure ou une motivation insuffisante coûte au plus un mois de salaire. Gain restant marginal (voir `04-propositions/00-sommaire.md`).
- **Fond : gagnant sous condition** : seulement couplé à un accompagnement de transition fort, sur le modèle danois.
  La piste la plus cohérente avec une approche libérale est celle de Blanchard et Tirole 2003 (`blanchard-tirole-...`,
  p. 5-6) : remplacer une partie du contrôle par le juge par une **contribution de licenciement** qui fait payer à
  l'entreprise le coût réel qu'elle impose à l'assurance chômage (principe « licencieur-payeur »). Moins de procédure,
  plus de responsabilité.

---

## 3. CDD et contrats très courts

**Coût actuel** : contrat CDD écrit, 39 à 272 M€ par an. Mais le vrai sujet est le volume : 21,9 M d'embauches en CDD
en 2025, dont 84 % de moins d'un mois (DARES), très souvent chez le même employeur (note CAE n° 24).

**Preuves** :
- Note CAE n° 24, Cahuc et Prost 2015 (p. 9) : l'essor des CDD très courts vient en bonne partie des règles de cumul
  entre allocation chômage et salaire, qui rendent rentable l'alternance d'emploi et de chômage. Le levier est
  l'assurance chômage, pas le Code du travail. — *Niveau moyen*.
- Unédic 2026 (p. 1) : la France régule les contrats temporaires surtout par les règles d'assurance chômage, à
  l'inverse de l'Espagne, de l'Italie et des Pays-Bas.
- **Espagne 2021**, Conde-Ruiz et al. 2023 (résumé) : la réforme a fait chuter le taux de CDD « sur le papier »,
  mais la durée réelle des emplois n'a pas augmenté. Changer l'étiquette du contrat ne stabilise pas l'emploi.
  — *Niveau moyen*.
- Cahuc et Palladino : réformer seulement les contrats temporaires (réforme « partielle ») aggrave la coupure
  CDI/CDD (Blanchard et Landier 2002).

**Verdict** :
- **Simplifier le formalisme du CDD : gagnant partout**, gain modeste. Piste : contrat-type numérique. Le contrat cadre pour missions répétées a été abandonné (risque d'encourager les contrats très courts, voir `04-propositions/P4`).
- **Durcir ou assouplir les règles du CDD dans le Code du travail : non soutenu.** L'expérience espagnole montre l'effet
  d'étiquette. Le levier efficace (cumul allocation-salaire, bonus-malus sur les cotisations) relève de l'assurance chômage.

---

## 4. Rupture conventionnelle

**Coût actuel** : 28 à 216 M€ par an (518 000 ruptures). Homologation administrative en 15 jours ouvrables, réputée
acquise en l'absence de réponse (L1237-14).

**Preuves** :
- Rapport du Sénat 2026 (p. 6) : 19 % des nouveaux allocataires de l'assurance chômage, **26 % des dépenses
  d'allocation (9,4 Md€)**, surtout des cadres. La procédure n'est pas le vrai coût : le vrai coût est l'externalité
  sur l'assurance chômage.

**Verdict** :
- **Accélérer l'homologation** : **rétrogradé en « gagnant sous condition »** après relecture : une procédure plus rapide peut augmenter le nombre de ruptures, donc le coût pour l'assurance chômage (voir `04-propositions/P5`).
- Le coût pour l'assurance chômage relève d'un autre levier (règles d'indemnisation, déjà en cours de modification en 2026).

---

## 5. CSE et dialogue social

**Coût actuel** : charge administrative du CSE, 156 à 833 M€ par an (toutes tailles, scénarios bas et haut) ; heures de délégation,
0,9 à 4,4 Md€ par an.

**Preuves** :
- France Stratégie 2021 (p. 16-18) : la fusion des instances en 2017 a réduit le nombre de réunions, sans changement
  majeur des pratiques ; risque de perte de contact entre élus et salariés. — *Niveau faible* (évaluation encore
  qualitative).
- IRES et CFDT 2024 (`contre-arguments/`, résumé p. 4) : constat « globalement négatif » sur la santé au travail depuis
  la suppression du CHSCT. — *Niveau faible* (entretiens avec des élus syndicaux).
- Theorell et al. 2015 (méta-analyse, 59 études) : le manque d'autonomie, la tension au travail et le harcèlement
  augmentent les symptômes dépressifs ; ces facteurs se corrigent par l'organisation du travail. — *Niveau fort*.
  Le sujet que traite le CSE pèse donc sur un garde-fou.
- Aghion, Algan, Cahuc et Shleifer 2010 : réglementation et défiance se renforcent mutuellement. Un dialogue social
  de meilleure qualité pourrait permettre moins de règles. — *Niveau moyen* (corrélations entre pays, avec modèle).

**Verdict : gagnant sous condition.**
- Rendre les obligations **proportionnelles** (pas de saut à 50, voir levier 1).
- Faire de l'accord d'entreprise la règle par défaut pour la fréquence des réunions et le contenu des consultations
  (déjà permis par L2312-19, mais pas utilisé partout).
- **Ne pas supprimer** l'instance : aucune preuve que sa suppression améliore les objectifs, des indices qu'elle
  protège un garde-fou (santé mentale au travail).

---

## 6. Document unique d'évaluation des risques

**Coût actuel** : environ 450 M€ par an (mesure de l'UE ramenée à la France ; de 195 M€ à 1,1 Md€ selon le scénario).

**Preuves** :
- Directive 89/391 (`textes/droit-europeen/`, article 9) : l'employeur doit **disposer** d'une évaluation des risques.
  L'article 9.2 autorise les États à **adapter les obligations documentaires à la taille des entreprises**.
  La mise à jour **annuelle** (R4121-2) et la conservation pendant **40 ans** (R4121-4) sont des ajouts français.
- Avis du groupe de haut niveau de l'UE 2009 (`methodes-evaluation/ue-2009-hlg-...`, p. 5) : des outils numériques et
  des modèles de document permettraient de réduire la charge d'environ **31 %**, notamment en évitant le recours à des
  consultants (46 % du coût).
- Theorell et al. 2015 : les conditions de travail influencent la santé mentale. Le contenu de l'évaluation compte.

**Verdict : gagnant partout.**
- Outil numérique officiel gratuit, présumé conforme quand il est utilisé.
- Mise à jour seulement en cas de changement (et non chaque année) sous 50 salariés.
- ~~Durée de conservation ramenée à un niveau raisonnable.~~ **Retiré après relecture** (voir `04-propositions/P1`) : les 40 ans sont fixés par la loi (L4121-3-1, V) et servent à prouver des expositions pour des maladies professionnelles tardives ; le portail numérique déjà prévu supprime la charge sans réduire cette protection.
On garde l'obligation d'évaluer ; on allège la paperasse autour. Gain estimé : environ 30 % de 450 M€, soit
**environ 140 M€ par an**.

---

## 7. Bulletin de paie

**Coût actuel** : premier poste, 0,3 à 2 Md€ par an.

**Preuves** : aucune étude du corpus sur l'effet d'une simplification de la paie. La complexité vient surtout des
cotisations (Code de la sécurité sociale) et du prélèvement à la source, pas du Code du travail (R3243-1 fixe seulement
les mentions). L'enquête CJD 2025 cite les déclarations sociales et fiscales parmi les tâches les plus lourdes.

**Verdict : hors du périmètre efficace.** Le gisement est réel mais se trouve dans le Code de la sécurité sociale
(assiettes, exonérations multiples). À traiter si le projet s'étend à ce code.

---

## Synthèse

| Levier | Gain estimé | Niveau de preuve | Verdict |
|---|---|---|---|
| Document unique : outil numérique, mise à jour sur changement | ≈ 140 M€/an | moyen | **Gagnant partout** |
| Licenciement : simplification de la forme | marginal (déjà fait en 2017) | moyen | Gagnant partout, gain résiduel faible |
| CDD : formalisme simplifié, contrat cadre | part des 39 à 272 M€/an | faible à moyen | **Gagnant partout** |
| Rupture conventionnelle : homologation immédiate des dossiers conformes | faible | faible | Gagnant sous condition (assurance chômage) |
| Seuils : lissage, notamment des heures de délégation | 1 à 2 % de la masse salariale au seuil de 50 | moyen | Gagnant sous condition |
| CSE : obligations proportionnelles, accord par défaut | part des 0,9 à 4,4 Md€/an | faible | Gagnant sous condition |
| Licenciement : allègement sur le fond + contribution de licenciement | productivité + ; emploi ≈ 0 | moyen à fort | Gagnant sous condition (sécuriser la transition) |
| CDD : durcir ou assouplir les règles du contrat | — | moyen (Espagne) | Non soutenu |
| Bulletin de paie | gros gisement | — | Hors périmètre (sécurité sociale) |

**Trois enseignements transversaux** :
1. **Simplifier la forme est presque toujours gagnant ; changer le fond demande une contrepartie.** Les études ne
   trouvent pas d'effet net de la protection de l'emploi sur le niveau d'emploi, mais des effets sur la productivité.
   La perte d'emploi elle-même a un coût sanitaire lourd. Une flexibilité sans sécurité de transition viole les garde-fous.
2. **Plusieurs leviers clés sont hors du Code du travail** : assurance chômage (CDD courts, rupture conventionnelle,
   flexisécurité) et sécurité sociale (paie). Un refactor limité au Code du travail plafonne vite.
3. **Lisser plutôt que supprimer** : le seuil de 50 est coûteux surtout parce qu'il est brutal, pas parce que les
   obligations existent.

## Limites

- Lecture ciblée (résumés, conclusions, passages clés), pas intégrale, des 51 documents.
- Les gains « gagnant partout » sont chiffrés à partir du modèle de coût, dont une partie des temps reste hypothétique.
- Effets sur la croissance des leviers « forme » : chiffrés depuis dans `effets-indirects.md`. Avec le multiplicateur
  de la Commission européenne (1,6 à 2,1 € de PIB par euro de charge supprimée), ils restent de 0,02 à 0,13 % du PIB
  pour un quart de la paperasse du Code en moins, loin derrière les seuils (moins de 1 % à 5 % du PIB).
- Aucune analyse causale propre sur données françaises à ce stade (étape 4 du workflow).


## Corrections après relecture des articles (étape 6)

Voir `04-propositions/00-sommaire.md` : conservation du document unique maintenue, simplification de la forme du licenciement déjà largement faite, rupture conventionnelle rétrogradée, contrat cadre CDD abandonné, nouvelle piste sur la transparence salariale.
