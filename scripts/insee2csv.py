import sys,csv,os,xml.etree.ElementTree as ET
G='{http://www.sdmx.org/resources/sdmxml/schemas/v2_1/data/generic}'
src=sys.argv[1]; out=src[:-4]+'.csv'; n=0
with open(out,'w',newline='') as o:
    w=csv.writer(o); w.writerow(['IDBANK','TITLE_FR','KEY','TIME_PERIOD','OBS_VALUE'])
    for ev,el in ET.iterparse(src):
        if el.tag==G+'Series':
            key=';'.join(f"{v.get('id')}={v.get('value')}" for v in el.find(G+'SeriesKey'))
            at={v.get('id'):v.get('value') for v in el.find(G+'Attributes') or []}
            for ob in el.findall(G+'Obs'):
                t=ob.find(G+'ObsDimension').get('value'); v=ob.find(G+'ObsValue')
                w.writerow([at.get('IDBANK',''),at.get('TITLE_FR',''),key,t,v.get('value') if v is not None else '']); n+=1
            el.clear()
os.remove(src); print(os.path.basename(out),n,'obs',os.path.getsize(out)//1000,'Ko')
