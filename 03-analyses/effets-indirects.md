# Effets indirects de la friction : ce que la paperasse empêche de produire

11 octobre 2026. Calcul : `scripts/effets_indirects.py` ; résultats : `effets-indirects-resultats.csv`.
Sources : `01-sources/etudes/effets-indirects/` et `01-sources/donnees/eurostat/`.

## Pourquoi cette note

Le modèle de coût (`premiere-passe.md`) mesure une **facture** : le temps et l'argent que les entreprises consacrent
aux démarches du Code. Il ne dit pas ce que ce temps aurait produit, ni ce que l'incertitude juridique et les seuils
empêchent de créer. Cette note ajoute ces effets, en les séparant bien de la facture : la facture est une mesure,
les effets indirects sont des estimations tirées de modèles et d'études.

## Résultats

| Couche | Bas | Central | Haut | Part du PIB |
|---|---|---|---|---|
| Heures de paperasse par an | 18 M h | 41 M h | 92 M h | |
| 0. Facture directe (modèle de coût) | 1,18 Md€ | 2,94 Md€ | 7,32 Md€ | 0,04 à 0,25 % |
| 1. Production immobilisée (heures à la valeur ajoutée) | 1,56 Md€ | 3,79 Md€ | 9,23 Md€ | 0,05 à 0,31 % |
| 2. Défense des employeurs aux prud'hommes | 0,25 Md€ | 0,49 Md€ | 0,98 Md€ | 0,01 à 0,03 % |
| 3a. PIB à long terme, nos propositions | 0,16 Md€ | 0,43 Md€ | 1,13 Md€ | 0,005 à 0,04 % |
| 3b. PIB à long terme, un quart de la paperasse du Code en moins | 0,47 Md€ | 1,33 Md€ | 3,77 Md€ | 0,02 à 0,13 % |
| 4. PIB perdu au seuil de 50 salariés, salaires flexibles | | | moins de 30 Md€ | moins de 1 % |
| 4. PIB perdu au seuil de 50 salariés, salaires rigides | 120 Md€ | | 150 Md€ | 4 à 5 % |

## Méthode, couche par couche

### 1. Le temps libéré produit plus qu'il ne coûte

Le modèle de coût valorise une heure de paperasse à son coût pour l'entreprise : 44,30 €. Mais une heure rendue au
travail productif produit en moyenne la valeur ajoutée d'une heure de travail en France : **65,1 €** en 2025
(PIB de 2 991 Md€, 30,6 millions de personnes en emploi, 1 500 heures chacune ; Eurostat). La différence (1,47 fois)
correspond à la part du capital dans la production. La couche 1 recalcule la facture avec cette valeur.

*Limite* : pour un dirigeant de très petite entreprise, une heure peut valoir bien plus (une vente, un client) ;
aucune donnée publique ne permet de le chiffrer. Les enquêtes de dirigeants (CJD, avril 2025, 536 dirigeants)
indiquent qu'une majorité passe 1 à 5 heures par semaine en tâches administratives, toutes administrations
confondues, et qu'un quart y dépense 6 000 à 10 000 € par an.

### 2. L'incertitude juridique a un coût propre

En 2025, les conseils de prud'hommes ont reçu **129 816 demandes**, dont 126 485 visant un employeur ; 83 374
contestent le motif d'un licenciement. Une affaire au fond dure en moyenne 15,5 mois, 31,7 mois en cas de
départage (Références statistiques Justice 2026, 8.1). La couche 2 chiffre seulement la défense de l'employeur :
frais d'avocat (1 500 à 6 000 € par demande) et temps du dirigeant ou des RH (10 à 40 heures). **Ces deux
paramètres sont des hypothèses**, faute de source publique. Les indemnités versées ne sont pas comptées : ce sont
des transferts entre employeur et salarié, pas une perte pour l'économie.

L'effet le plus important de cette incertitude n'est pas chiffré ici : elle freine l'embauche. En avril 2017,
**14 % des entreprises** de l'industrie, des services et du bâtiment (résultats pondérés par les effectifs) citaient
les risques juridiques d'un licenciement parmi les barrières à l'embauche en CDI ou CDD long, et 10 % son coût ;
deux tiers de celles qui citent une barrière réglementaire en citent une deuxième (INSEE, Note de conjoncture,
juin 2017, tableau 3a). Passer d'un pourcentage d'entreprises freinées à un nombre d'emplois exigerait une
élasticité qu'on n'a pas.

### 3. L'effet d'entraînement sur la croissance

La Commission européenne a évalué l'effet macroéconomique d'une baisse de 25 % des charges administratives,
mesurées avec la même méthode que notre modèle de coût. Selon les modèles d'équilibre général, le niveau du PIB
augmenterait à terme de **1,4 % (WorldScan, Gelauff et Lejour 2006) à 1,8 % (QUEST, qui intègre l'entrée de
nouvelles entreprises)**, pour une charge de 3,5 % du PIB dans l'Union à 25 (Kox 2005, CPB). Rapporté à la charge
supprimée, cela donne **1,6 à 2,1 € de PIB par euro de paperasse en moins**, une fois les effets diffusés : temps
réalloué à la production, entrée de nouvelles entreprises (QUEST).

Appliqué à nos propositions (100 à 550 M€ de facture en moins), le gain de PIB à long terme est de 0,16 à 1,1 Md€
par an. Pour un quart de toute la paperasse du Code, il est de 0,5 à 3,8 Md€ par an, soit 0,02 à 0,13 % du PIB.

*Limites* : ce multiplicateur vient de modèles, pas d'une mesure après coup ; il suppose que la paperasse retirée
était vraiment inutile ; il a été calculé pour l'ensemble des charges administratives européennes, pas pour le seul
droit du travail français.

Klapper, Laeven et Rajan (Journal of Financial Economics, 2006) confirment le mécanisme sur données d'entreprises
européennes : des formalités d'entrée coûteuses réduisent la création d'entreprises, surtout dans les secteurs où
elle est naturellement forte, et y ralentissent la croissance de la valeur ajoutée par salarié des entreprises
existantes.

### 4. Les seuils : là où la friction coûte le plus

Garicano, Lelarge et Van Reenen (American Economic Review, 2016) ont mesuré l'effet de l'ensemble des obligations
qui se déclenchent à 50 salariés, sur toutes les entreprises françaises de 2002 à 2007. Si les salaires s'ajustent,
la perte est inférieure à 1 % du PIB. S'ils sont rigides à la baisse, ce qui est plutôt le cas en France, la
réglementation **réduit le PIB de 4 à 5 %, surtout par plus de chômage**. Les principaux perdants sont les salariés.

*Limites* : données antérieures aux réformes de 2017 et 2019 ; l'étude porte sur toutes les obligations du seuil,
pas seulement sur les heures de délégation visées par notre proposition P3, qui ne supprime donc qu'une partie
de cet effet.

## Ce que ça change à nos conclusions

1. **La friction coûte plus que sa facture**. Chaque euro de paperasse inutile retiré
   rapporte à terme 1,6 à 2,1 € de PIB, et chaque heure libérée vaut 1,5 fois son coût.
2. **Mais l'ordre de grandeur reste modeste pour la paperasse de forme** : au plus 0,3 % du PIB, même en
   comptant les effets indirects. Notre conclusion « la paperasse ne suffit pas à relancer l'économie » tient.
3. **Les seuils sont le vrai gisement** : leur coût se compte en points de PIB, des dizaines de fois plus que la paperasse.
   Lisser les seuils (P3 et au-delà) est la mesure à plus fort enjeu économique du projet.
4. **L'incertitude juridique est un frein à l'embauche mesurable** (citée par 14 % des entreprises en 2017),
   ce qui renforce les propositions qui réduisent l'aléa sans retirer de droits (P4 sur le CDD, barème déjà en place
   pour le licenciement).

## Pistes non traitées

- Chiffrer l'effet sur l'emploi de l'incertitude juridique (élasticité à trouver dans la littérature).
- Remplacer les hypothèses de frais de défense par des données (assureurs protection juridique, barèmes d'avocats).
- Refaire la couche 3 avec un multiplicateur propre au droit du travail, si une étude existe.
