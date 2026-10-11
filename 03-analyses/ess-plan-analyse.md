# Plan d'analyse ESS — écrit avant d'exécuter

11 octobre 2026. Ce plan est figé avant toute estimation : hypothèses, échantillon et spécification ne seront pas
modifiés après avoir vu les résultats. Tout écart sera signalé comme tel.

## Question

Qu'est-ce qui pèse le plus sur le bien-être : le chômage, un contrat précaire, ou un chômage passé ?
L'effet dépend-il du niveau de protection de l'emploi du pays ?

## Données

European Social Survey, vagues 10 (2020-2022) et 11 (2023-2024), fichiers intégrés
(`01-sources/donnees/ess/`). Personnes de 18 à 64 ans en emploi salarié ou au chômage.

## Variables

- **Résultats** : satisfaction dans la vie `stflife` (0-10) ; bonheur `happy` (0-10) ; humeur dépressive `fltdpr`
  (1-4, vague 10 seulement).
- **Statut** (à partir de `mnactic`, `emplrel`, `wrkctra`) : salarié en CDI (référence) ; salarié en CDD ;
  salarié sans contrat ; chômeur (en recherche ou non).
- **Chômage passé** : `uemp12m` (au moins une période de chômage de 12 mois ou plus), chez les salariés actuels.
- **Autonomie** : `wkdcorga` (0-10, liberté d'organiser son travail), chez les salariés.
- **Contrôles** : âge, âge au carré, sexe, années d'études, décile de revenu du ménage (manquant = catégorie à part),
  effets fixes pays × vague.
- **Pondération** : `anweight`. **Erreurs-types** groupées par pays.

## Hypothèses

- **H1** : les chômeurs ont une satisfaction plus basse que les salariés en CDI, à caractéristiques égales.
- **H2** : les salariés en CDD ont une satisfaction plus basse que ceux en CDI, mais l'écart est nettement plus
  petit que celui du chômage.
- **H3** (Sverke 2019) : l'écart CDD/CDI et l'écart chômage/CDI sont plus faibles dans les pays où la protection
  de l'emploi est forte. Indicateur : indice OCDE 2025 de protection contre le licenciement (contrats réguliers,
  version 4), pays OCDE de l'échantillon. Test : interaction statut × indice.
- **H4** (cicatrice) : chez les salariés actuels, avoir connu 12 mois de chômage ou plus est associé à une
  satisfaction plus basse.
- **H5** (Theorell 2015) : chez les salariés, plus d'autonomie est associé à plus de satisfaction et moins d'humeur dépressive.

## Estimations

1. Modèle principal, tous pays (H1, H2).
2. Même modèle, France seule.
3. Interaction avec l'indice de protection de l'emploi (H3).
4. Salariés seulement, avec chômage passé et autonomie (H4, H5).
5. Robustesse : bonheur au lieu de satisfaction ; ajout de la santé déclarée (variable qui peut être une conséquence
   du statut, donc hors du modèle principal).

## Limites connues d'avance

- Données en coupe transversale : **associations, pas causalité**. Les personnes moins heureuses peuvent être plus
  souvent au chômage (sélection). Les estimations ne disent pas ce que produirait une réforme.
- Pas de question sur l'insécurité ressentie : le CDD est un indicateur imparfait de précarité.
- Effectifs français limités (environ 1 800 à 2 000 répondants par vague, dont une partie hors du champ).
- H3 repose sur environ 20 à 25 pays : puissance statistique faible.
