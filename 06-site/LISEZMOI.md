# Site « Code du travail, preuves en main »

Site statique : `index.html`, `og.png` (image d'aperçu pour les réseaux) et `donnees/` (fichiers téléchargeables).
Aucune compilation, aucune dépendance.

## Déployer sur Vercel

**Option 1, sans ligne de commande** : sur vercel.com, « Add New… » → « Project » → importer ce dossier
(ou le glisser-déposer). Aucun réglage : Vercel sert `index.html` tel quel.

**Option 2, en ligne de commande** (depuis ce dossier) :

```
npx vercel deploy --prod
```

## Après le premier déploiement : rendre l'aperçu X fiable

X lit mieux une adresse d'image complète. Une fois l'adresse du site connue (par exemple
`https://code-du-travail-preuves.vercel.app`), remplacer dans `index.html` les deux lignes :

```
<meta property="og:image" content="/og.png">
<meta name="twitter:image" content="/og.png">
```

par l'adresse complète, puis redéployer :

```
<meta property="og:image" content="https://VOTRE-ADRESSE.vercel.app/og.png">
<meta name="twitter:image" content="https://VOTRE-ADRESSE.vercel.app/og.png">
```

Vérifier l'aperçu avant de poster : coller l'adresse dans un brouillon de post sur X.

## Mention

Le pied de page indique que l'analyse a été réalisée avec l'assistance d'une IA et que ce n'est ni un avis juridique
ni une étude relue par des pairs. À garder : c'est ce qui rend le travail honnête et vérifiable.
