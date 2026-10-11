import pypdf,sys
for f in sys.argv[1:]:
    try:
        r=pypdf.PdfReader(f); t=(r.pages[0].extract_text() or '')[:250].replace('\n',' ')
        print(f.split('/')[-1],len(r.pages),'::',t,'\n')
    except Exception as e: print(f,'ERR',e)
