import csv,sys,os
src=sys.argv[1]; tmp=src+'.tmp'
with open(src,newline='') as f, open(tmp,'w',newline='') as o:
    r=csv.reader(f); w=csv.writer(o); h=next(r); w.writerow(h); v=h.index('OBS_VALUE')
    for row in r:
        if row[v]!='': w.writerow(row)
os.replace(tmp,src)
