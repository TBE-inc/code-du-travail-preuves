"""Extrait le texte de chaque PDF (avec marqueurs de page) vers un dossier de sortie."""
import pypdf, sys, os, glob
src, out = sys.argv[1], sys.argv[2]
for f in sorted(glob.glob(os.path.join(src, '**', '*.pdf'), recursive=True)):
    dst = os.path.join(out, os.path.relpath(f, src).replace(os.sep, '__')[:-4] + '.txt')
    if os.path.exists(dst):
        continue
    try:
        r = pypdf.PdfReader(f)
        with open(dst, 'w', encoding='utf-8') as o:
            for i, p in enumerate(r.pages, 1):
                o.write(f'\n[[page {i}]]\n' + (p.extract_text() or ''))
        print(len(open(dst, encoding='utf-8').read().split()), 'mots', os.path.basename(dst))
    except Exception as e:
        print('ERREUR', f, e)
