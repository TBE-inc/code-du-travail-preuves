# Site : Le Code du travail, annoté par les preuves

Vite + React + TypeScript. Plan de design : `DESIGN.md`.

```
npm install        # une fois
npm run dev        # http://localhost:5173/code-du-travail-preuves/
npm run build      # vérifie les types et construit dist/
npm run deploy     # construit et publie sur GitHub Pages (branche gh-pages)
```

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Chiffres des graphiques | `src/data/chiffres.ts` (chaque bloc cite son fichier d'origine dans `03-analyses/`) |
| Sources et numérotation des notes | `src/data/sources.ts` ; dans le texte, `<Fn id="garicano" />` |
| Textes des sections | `src/sections/` |
| Graphiques et calculateurs | `src/components/charts.tsx` |
| Styles | `src/styles.css` |
| Image d'aperçu pour les réseaux | `public/og.png` |
| Fichiers téléchargeables | `public/donnees/` |
