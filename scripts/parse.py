import re,sys,json,collections
lines=open(sys.argv[1]).read().split('\n')
foot=re.compile(r'^Code du travail - Dernière modification')
arts=[];ctx={};cur=None
for l in lines:
    s=l.strip()
    if foot.match(s) or s=='Code du travail': continue
    m=re.match(r'^(Partie législative|Partie réglementaire)$',s)
    if m: ctx['nature']=s; continue
    for k in ('Partie','Livre','Titre','Chapitre'):
        if re.match(rf'^(Première|Deuxième|Troisième|Quatrième|Cinquième|Sixième|Septième|Huitième) partie',s) and k=='Partie': ctx['Partie']=s;break
        if k!='Partie' and s.startswith(k+' '): ctx[k]=s;break
    else:
        m=re.match(r'^Article ([LRD]\*?\d[\d\-A-Z]*)$',s)
        if m:
            cur={'id':m.group(1),**{k:ctx.get(k,'') for k in ('nature','Partie','Livre','Titre','Chapitre')},'text':[]}
            arts.append(cur); continue
        if cur: cur['text'].append(s)
for a in arts: a['text']=' '.join(t for t in a['text'] if t); a['words']=len(a['text'].split())
json.dump(arts,open(sys.argv[2],'w'),ensure_ascii=False)
print(len(arts), sum(a['words'] for a in arts))
c=collections.Counter(); w=collections.Counter()
for a in arts: k=(a['nature'][:13],a['Partie'][:60]); c[k]+=1; w[k]+=a['words']
for k in sorted(c): print(k, c[k], w[k])
