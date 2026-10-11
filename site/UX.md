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
3. **Grille large, texte étroit.** Conteneur de 1200 px ; le texte courant reste à 68 caractères ; graphiques, outils et grilles prennent la largeur.
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

---

# Recherche v4 : rendre le contenu digeste (octobre 2026)

Retour : « toujours très indigeste à lire et à regarder ». Le texte n'est pas trop long (accueil : 680 mots
visibles, 12 mots par phrase en moyenne). Le problème est ailleurs : trop d'éléments différents par écran,
des redites, des graphiques chargés d'étiquettes.

## Ce que dit la recherche

| Principe | Source | Ce que ça implique ici |
|---|---|---|
| Vue d'ensemble d'abord, zoom, puis détail à la demande | Shneiderman, appliqué par Our World in Data | Accueil = 5 « insights » : titre-conclusion + 1 graphique + 1 phrase. Le reste derrière un lien. |
| Titre = la conclusion, pas une étiquette | Storytelling with Data, Evergreen | Le titre du graphique dit ce qu'il faut voir. Plus de « Écart de satisfaction… ». |
| Cohérence : retirer ce qui ne sert pas | Mayer | Chaque constat disait la même chose 3 fois (titre, chiffre clé, légende, paragraphe). Une seule fois. |
| Signalisation | Mayer | Un seul repère visuel fort par bloc (le chiffre ou la barre France), pas 4. |
| Segmentation à l'allure du lecteur | Mayer ; McKenna 2017 (stepper vs scroll) | Un constat = un écran mobile. Pas de bloc plus haut que 1,5 écran. |
| Lecture en « gâteau » : les yeux sautent de titre en titre | NN/g, schémas de lecture | Les titres doivent suffire seuls. Lire uniquement les titres = comprendre le site. |
| Phrases : 14 mots = 90 % compris ; 43 mots = moins de 10 % | Ann Wylie, cité par GOV.UK | Viser 15 mots, jamais plus de 25. |
| FALC : une idée par phrase, sujet-verbe-complément, éviter les pourcentages | Règles européennes FALC | Une idée par phrase. Ordres de grandeur concrets (« 1 salarié sur 5 ») plutôt que des indices. |
| Paragraphes courts : 2× plus d'attention | Poynter Eyetrack III | 1 à 3 phrases par paragraphe. |
| Les accordéons cachent : contenu replié souvent manqué ; ne rien replier de crucial | NN/g, Accordions | Replier seulement la preuve, jamais l'idée. Intitulé explicite. |
| Mettre en gras le début des mots n'aide pas | Snell 2024 ; Readwise ; RSOS 2025 | Pas de gadget typographique : le gras sert seulement au mot-clé de la phrase. |
| Longueur de ligne 50-75 caractères, interligne 1,5 | Baymard, Butterick | Colonne conservée (≈ 70 car.). |

## Mesure v3

| Page | Mots visibles | Mots par phrase | Phrases de plus de 25 mots |
|---|---|---|---|
| Accueil | 680 | 11,9 | 5 |
| Propositions | 410 | 14,5 | 2 |
| Fiche CDD | 371 | 12,3 | 4 |
| Mon entreprise | 305 | 18,0 | 3 |

Le texte est raisonnable. Ce qui fatigue : par constat, 7 types d'éléments empilés (repère, titre, chiffre,
légende, paragraphe, graphique de 5 à 23 lignes avec légende, accordéon), et des graphiques qui parlent avant
qu'on sache quoi y voir.

## Décision v4

Format « insight » retenu (Our World in Data) : sur l'accueil, chaque constat = titre-conclusion, un visuel
à un seul message (5 barres ou 3 verdicts au plus), une phrase, un lien. Le détail complet (graphiques
interactifs, tableaux, preuves et limites en clair) vit sur `/constats/<id>/`, avec Précédent / Suivant.
Accueil mobile : 9 525 px (v3) → 5 900 px environ.

## Décision v5

- Fond blanc cassé `#FDFDFD`, blocs blancs bordés ; palette de la maquette Figma (encre, rouge, surligneur).
  Mode sombre supprimé : le fond noir suivait le réglage du système et cassait l'identité « page annotée ».
- Récit factuel en questions-réponses : la question de départ, le parcours (7 étapes), 5 blocs « question,
  réponse, une preuve visuelle », le bloc 6 « Que changer ? », puis la fin : résumé, ce qu'on ne sait pas, outils.
