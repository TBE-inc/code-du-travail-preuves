# Brief UX — version 3

Méthode reprise de stashed.me (`docs/brief-emotionnel.md`, `docs/design-system.md`) : on juge chaque écran
contre des émotions cibles et des anti-émotions, et le système de design est réduit au strict nécessaire.

## Diagnostic de la version 2 (mesuré sur l'accueil, octobre 2026)

| Mesure | Valeur | Problème |
|---|---|---|
| Tailles de texte différentes | 14 | aucune hiérarchie lisible |
| Notes de marge | 18 | le texte secondaire (14-15 px) domine : environ 9 éléments de texte sur 10 |
| Appels de note | 35 | des chiffres rouges partout dans la lecture |
| Surlignages | 10 | l'élément « mémorable » n'est plus rare, donc plus mémorable |
| Éléments rouges | 70 | le rouge ne signale plus rien |
| Hauteur sur téléphone | 20 272 px | environ 24 écrans |

## Lecteur

Arrive d'un post X, sur téléphone, en 30 secondes à 3 minutes. Curieux, souvent sceptique, de tous bords
politiques. Ne connaît pas le droit du travail. Juge la page en 50 ms (Lindgaard, 2006) et la parcourt
en diagonale (NN/g : 79 % des lecteurs scannent).

## Émotions cibles

| Émotion | Ce que le lecteur se dit | Comment on le vérifie |
|---|---|---|
| Clarté | « J'ai compris l'essentiel en 30 secondes. » | Les 5 constats se lisent sans ouvrir aucun détail. |
| Confiance | « C'est sourcé, ce n'est pas un tract. » | Chaque constat montre son niveau de preuve et ses limites en un geste. |
| Surprise | « Je ne savais pas ça. » | Un chiffre clé par constat, et un seul. |
| Envie de vérifier | « Je veux tester mon cas. » | Les trois outils sont atteignables en un clic depuis n'importe quelle page. |

## Anti-émotions

- **Bordélique** : je ne sais pas quoi lire en premier.
- **Militant** : on veut me vendre une conclusion.
- **Technocratique** : du jargon, des tableaux, des notes partout.
- **Interminable** : je ne vois pas la fin.

## Principes

1. **Pyramide inversée.** L'accueil donne la conclusion d'abord, le détail ensuite, la preuve à la demande.
   Chaque constat a la même anatomie : affirmation, un chiffre clé, deux ou trois phrases, une image, puis
   « Preuves et limites » replié.
2. **Divulgation progressive.** Les preuves, sources et limites sont repliées sous chaque bloc (comme les notes
   de Gwern et Tufte sur téléphone), jamais supprimées. Rien n'est caché : un geste suffit.
3. **Une colonne.** Plus de colonne de marge : une seule colonne de lecture de 680 px, partout.
4. **Une couleur, un sens.** Rouge = le Code (références d'articles, texte de loi, la France dans les graphiques).
   Surligneur = le chiffre clé d'un constat, et rien d'autre. Vert et ambre = verdicts seulement.
5. **Peu de tailles.** Six tailles de texte, pas quatorze. Le serif pour les titres, les chiffres et le texte de
   loi ; le sans-serif pour tout le reste.
6. **L'accueil raconte, les pages approfondissent.** Les propositions, la méthode et les sources ont leur page.
7. **Ce qui bouge répond.** Un seul mouvement automatique (le surlignage de l'article au chargement) ; le reste
   répond à une action, et respecte `prefers-reduced-motion`.

## Architecture

```
Accueil       le constat en 5 blocs, puis « Ce qu'on propose » (5 lignes) et « Vérifier par vous-même »
Propositions  les 5 amendements et les 4 pistes hors du Code ; une fiche par amendement
Outils        les 2 847 obligations · mon entreprise · la France et ses voisins
Méthode       comment on a travaillé, ce qu'on a corrigé, les limites, le glossaire, les 29 sources
```

## Système

| Rôle | Valeur |
|---|---|
| Tailles | 13 (méta) · 17 (texte) · 20 (chapeau) · 22 (titre 3) · 32 (titre 2) · 48 (titre 1 et chiffre clé) |
| Espacements | 8 · 16 · 32 · 64 · 112 |
| Rayons | 6 (champs, boutons) · 999 (pastilles) |
| Colonne | 680 px |
