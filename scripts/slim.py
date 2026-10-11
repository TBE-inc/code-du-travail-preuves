import csv,sys,os
src=sys.argv[1]; tmp=src+'.tmp'
with open(src,newline='') as f, open(tmp,'w',newline='') as o:
    r=csv.reader(f); w=csv.writer(o); h=next(r)
    idx=[i for i,c in enumerate(h) if c not in ('DATAFLOW','LAST UPDATE')]
    w.writerow([h[i] for i in idx])
    for row in r: w.writerow([row[i] for i in idx])
os.replace(tmp,src)
