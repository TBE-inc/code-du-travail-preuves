import csv,sys,os
keep={'FR','DE','DK','IT','ES','NL','SE','BE','AT','FI','PT','PL','IE','EU27_2020','EA20'}
src=sys.argv[1]; tmp=src+'.tmp'; n=k=0
with open(src,newline='') as f, open(tmp,'w',newline='') as o:
    r=csv.reader(f); w=csv.writer(o); h=next(r); w.writerow(h); g=h.index('geo')
    for row in r:
        n+=1
        if row[g] in keep: w.writerow(row); k+=1
os.replace(tmp,src); print(os.path.basename(src),n,'->',k,'lignes',os.path.getsize(src)//1e6,'Mo')
