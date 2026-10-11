import json,re,sys,collections
arts=json.load(open(sys.argv[1]))
pats={
 'declaration_admin':r"(déclar\w+|transm\w+|adress\w+|communiqu\w+|notifi\w+|inform\w+)[^.]{0,80}(autorité administrative|inspect\w+ du travail|DREETS|direction régionale|préfet|administration)",
 'autorisation':r"autorisation (préalable|administrative|de l'inspecteur)|soumis à autorisation|après autorisation",
 'consultation_CSE':r"(consult\w+|avis)[^.]{0,40}comité social et économique|comité social et économique est consulté",
 'registre_affichage':r"\bregistre\b|\baffich\w+|tient à (la )?disposition",
 'seuil_effectif':r"(au moins|moins de|plus de)\s+\d+\s+salariés",
 'formalisme_ecrit':r"par écrit|lettre recommandée|à peine de nullité|mentions obligatoires|doit (comporter|mentionner)",
 'rapport_document':r"\brapport\b|\bbilan\b|document unique|base de données économiques",
 'sanction':r"\bamende\b|\bemprisonnement\b|puni",
}
cp={k:re.compile(v,re.I) for k,v in pats.items()}
tot=collections.Counter()
byLivre=collections.defaultdict(collections.Counter)
for a in arts:
    for k,p in cp.items():
        n=len(p.findall(a['text']))
        if n: tot[k]+=n; byLivre[(a['Partie'][:18],a['Livre'][:70])][k]+=n
print(dict(tot))
score=lambda c: c['declaration_admin']*3+c['autorisation']*4+c['consultation_CSE']*2+c['registre_affichage']+c['formalisme_ecrit']+c['rapport_document']*2+c['seuil_effectif']
for k,c in sorted(byLivre.items(),key=lambda x:-score(x[1]))[:30]:
    print(score(c),k,dict(c))
