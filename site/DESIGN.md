# Plan de design — version 2

## Sujet, public, rôle
- Sujet : le Code du travail confronté aux preuves.
- Public : lecteurs venus d'un post X, surtout sur téléphone, de tous bords politiques, sans formation juridique.
- Rôle de la page : faire comprendre en 3 minutes ce que disent les preuves, et donner envie de vérifier.

## Idée directrice
**Le Code annoté.** Le monde du sujet a son propre langage visuel : le Code rouge des éditeurs juridiques, ses
articles numérotés, ses annotations en marge, et le tableau comparatif « avant / après » des textes de loi.
La page reprend ces codes : le texte de loi est cité tel quel, surligné là où les preuves disent quelque chose,
et les preuves sont des notes en marge. Les propositions sont présentées comme des amendements barrés et insérés.

## Couleurs
- Papier `#FFFFFF`, encre `#1E2126`, crayon `#6B6E76`, filet `#E2E4E8`
- Rouge du Code `#A3161E` : références d'articles, appels de notes, France dans les graphiques
- Surligneur `#FFE36E` : ce que les preuves mettent en évidence (un seul usage, c'est l'élément mémorable)
- Insertion `#2E6B4A` (texte ajouté dans les amendements)

## Typographie
- Source Serif 4 : titres et texte courant ; corps 19 px, interligne 1,6
- Instrument Sans : notes de marge, graphiques, commandes ; 14-15 px
- Échelle 1,25 : 15 / 19 / 24 / 30 / 38 / 48
- Pas de capitales espacées, pas de libellés au-dessus des titres, pas de chasse fixe

## Mise en page
```
ordinateur (≥ 1080 px)                       téléphone
┌───────────────────────────┬──────────┐     ┌──────────────┐
│ texte, 640 px             │ notes    │     │ texte        │
│ citation d'article        │ en marge │     │ note (filet) │
│ graphique                 │ 240 px   │     │ graphique    │
└───────────────────────────┴──────────┘     └──────────────┘
```
Aligné à gauche. Les notes de marge sont alignées sur le bloc qu'elles commentent ; sur téléphone elles passent sous
le bloc, avec un filet rouge à gauche.

## Principes
- Une seule audace : le surligneur sur le texte de loi, et un seul mouvement (le surlignage du héros au chargement).
- Pas de cartes en série : les blocs sont du texte, des citations et des graphiques, séparés par l'espace.
- Les chiffres se lisent dans des phrases, pas dans des tuiles.
- Chaque graphique est à l'échelle, ses libellés lisibles dans les deux thèmes.

## Revue du plan
- « Fond crème, serif, accent terracotta » : évité. Papier blanc froid, rouge sombre tiré du Code imprimé, surligneur jaune.
- « Grille de cartes arrondies » de la version 1 : supprimée au profit de notes en marge.
- « Libellés en capitales et chips monospace » de la version 1 : supprimés.
