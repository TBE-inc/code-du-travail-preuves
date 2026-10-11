import re,html,sys
t=open(sys.argv[1],encoding='utf-8',errors='replace').read()
t=re.sub(r'<script.*?</script>|<style.*?</style>','',t,flags=re.S|re.I)
t=re.sub(r'<(br|p|div|tr|h\d|li)[^>]*>','\n',t,flags=re.I)
s=html.unescape(re.sub(r'<[^>]+>','',t))
s=re.sub(r'[ \t]+',' ',s); s=re.sub(r'\n\s*\n+','\n\n',s)
open(sys.argv[2],'w').write(s.strip()); print(len(s.split()),'mots',sys.argv[2].split('/')[-1])
