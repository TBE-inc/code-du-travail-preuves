import pypdf,sys
r=pypdf.PdfReader(sys.argv[1])
print(len(r.pages))
with open(sys.argv[2],'w') as out:
    for p in r.pages: out.write((p.extract_text() or '')+'\n')
