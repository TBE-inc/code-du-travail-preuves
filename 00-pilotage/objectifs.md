# Objectifs du refactor du Code du travail

Version 2 — 10 octobre 2026. V1 = objectifs du porteur du projet. V2 = V1 complétée par une passe de recherche
(cadres OCDE, World Happiness Report, littérature économique du travail). Ajouts marqués **[V2]**.

## Énoncé

Une réforme est bonne si elle rend la nation plus prospère et plus heureuse, durablement :
croissance économique, prospérité des entrepreneurs petits et grands, baisse du chômage,
hausse du pouvoir d'achat, amélioration de la santé mentale et du bien-être —
**[V2]** sans sacrifier le bien-être futur, et pas seulement en moyenne mais pour chaque groupe.

## Architecture des objectifs [V2]

Trois niveaux, inspirés du cadre OCDE *How's Life?* (bien-être actuel + capitaux pour le bien-être futur)
et de l'approche « wellbeing-years » (WELLBY, De Neve et al. 2020, reprise par le Trésor britannique) :

1. **Finalité** — ce qu'on veut au bout : satisfaction dans la vie et espérance de vie en bonne santé.
2. **Moteurs** — ce qui produit la finalité : revenu, emploi, qualité de l'emploi, liberté, confiance, dynamisme économique.
3. **Leviers** — ce que le Code du travail change réellement : coût et rapidité d'embauche/licenciement, formalités, seuils, sécurité des transitions, dialogue social.

Une réforme agit sur les leviers ; on prédit son effet sur les moteurs ; on vérifie que la finalité s'améliore.

## Règle de décision

Une réforme est **retenue** si elle améliore au moins un moteur sans dégrader aucun garde-fou
au-delà de l'incertitude statistique. Les arbitrages restants sont testés sous plusieurs pondérations ;
on privilégie ce qui gagne sous toutes. Unité commune possible : WELLBY ou euros (valeurs tutélaires
publiques, rapport Quinet).

## Moteurs à améliorer

### Prospérité matérielle
| Indicateur | Pourquoi | Source |
|---|---|---|
| PIB réel par habitant | Prospérité macro | INSEE |
| Revenu disponible **médian** réel par UC | Pouvoir d'achat réel du ménage typique | INSEE Filosofi / ERFS |
| Productivité horaire du travail | Moteur long terme des salaires | INSEE / OCDE |

### Emploi
| Indicateur | Pourquoi | Source |
|---|---|---|
| Taux d'emploi 15-64 ans | Plus robuste que le chômage | INSEE Enquête Emploi |
| Chômage de longue durée (> 1 an) | Le plus destructeur pour le bien-être | INSEE / Eurostat |
| **[V2]** Taux d'emploi des 15-24 ans et part des NEET | Le chômage des jeunes laisse des cicatrices durables | INSEE / Eurostat |
| **[V2]** Taux d'emploi des 55-64 ans | Point faible historique français | INSEE |
| **[V2]** Délai de retour à l'emploi et perte de salaire après licenciement | Protéger le salarié plutôt que le poste (voir littérature sur les « cicatrices ») | DARES, France Travail, DSN |

### Dynamisme et entrepreneuriat [V2 étendu]
| Indicateur | Pourquoi | Source |
|---|---|---|
| Créations d'entreprises, survie à 5 ans | Prospérité des petits entrepreneurs | INSEE Sirene / SINE |
| Part d'entreprises franchissant 10, 50, 250 salariés | Effet direct des seuils | INSEE FARE / Ésane |
| **[V2]** Taux de réallocation des emplois (créations + destructions d'emplois) | Destruction créatrice (Aghion-Howitt, Nobel 2025) : les emplois doivent pouvoir passer des entreprises moins productives aux plus productives | INSEE, DSN |
| **[V2]** Dualité du marché : part des CDD dans les embauches, transition CDD → CDI | La segmentation CDI protégé / CDD précaire est l'effet le plus nocif identifié (Cahuc & Palladino 2024) | DARES, DSN |
| **[V2]** Diffusion de l'innovation : R&D des PME, adoption technologique | Croissance de long terme | INSEE, OCDE |
| Heures de formalités par entreprise et par an | Friction directe | Standard Cost Model (calcul projet) |
| **[V2]** Sécurité juridique : contentieux prud'homal par 1 000 salariés, durée des procédures | Une règle floue coûte en procès ce qu'elle épargne en formalités | Ministère de la Justice |

### Qualité de vie au travail [V2]
| Indicateur | Pourquoi | Source |
|---|---|---|
| Autonomie au travail | La liberté de choix est un des principaux déterminants du bonheur (World Happiness Report) — et un objectif libéral | DARES Conditions de travail |
| Insécurité de l'emploi **ressentie** | Le ressenti pèse plus que le type de contrat lui-même (méta-analyse 2022 sur l'emploi non standard) | DARES, enquêtes européennes |
| Équilibre vie pro / vie perso, heures longues | Dimension OCDE | Eurostat, OCDE |

### Capital social [V2]
| Indicateur | Pourquoi | Source |
|---|---|---|
| Confiance interpersonnelle et confiance dans les institutions | La France a une confiance faible ; Aghion, Algan, Cahuc et Shleifer (QJE 2010) lient sur-réglementation et défiance dans les deux sens | European Social Survey, World Values Survey |
| Qualité perçue des relations employeurs-salariés | Un dialogue social coopératif rend la flexibilité acceptable (flexisécurité) | Forum économique mondial, enquêtes DARES |

## Garde-fous (ne pas dégrader)

| Domaine | Indicateur | Source |
|---|---|---|
| Bien-être | Satisfaction dans la vie (0-10) | INSEE SRCV |
| Santé mentale | Prévalence des épisodes dépressifs | DREES / Santé publique France |
| Suicide | Taux de suicide standardisé, notamment actifs et chômeurs | CépiDc-Inserm |
| **[V2]** Santé | Espérance de vie en bonne santé | INSEE / Eurostat |
| Sécurité au travail | Accidents graves et mortels pour 1 000 salariés | Assurance maladie risques professionnels |
| Inégalités | D9/D1, taux de pauvreté | INSEE |
| **[V2]** Écarts entre groupes | Effets séparés par âge, sexe, qualification, région, taille d'entreprise | INSEE, DARES |
| **[V2]** Bien-être futur | Soldes de l'assurance chômage et de la sécurité sociale, dépense de formation | Unédic, Cour des comptes |
| **[V2]** Travail dissimulé | Part estimée de l'emploi non déclaré | URSSAF, Cour des comptes |

## Enseignements de la recherche qui structurent le projet [V2]

1. **Le chômage tue, littéralement.** Nordt et al. (Lancet Psychiatry, 2015, 63 pays, 2000-2011) associent environ 45 000 suicides par an, soit un sur cinq, au chômage (association). Sullivan & von Wachter (version de travail NBER w13626, dans le corpus) : une perte d'emploi augmente la mortalité de 15 à 20 % sur les 20 années suivantes, soit environ 1,5 an d'espérance de vie en moins pour un salarié licencié à 40 ans. → Créer de l'emploi est un objectif de santé publique, et **la perte d'emploi elle-même doit être amortie**.
2. **Protéger le salarié, pas le poste.** La protection de l'emploi freine la réallocation vers les entreprises productives (Martin & Scarpetta ; Bassanini, Nunziata & Venn 2008). Les effets négatifs les plus forts viennent de la segmentation CDI/CDD (Cahuc & Palladino 2024). → Piste : moins de rigidité sur la rupture, plus de sécurité sur la transition.
3. **L'insécurité nuit moins là où la protection sociale est forte.** La méta-analyse Sverke et al. (2019) montre des effets négatifs de l'insécurité plus faibles dans les régimes à forte protection sociale. → La flexibilité doit être couplée à un filet de transition, sinon elle viole les garde-fous de santé mentale.
4. **L'accompagnement marche, mais lentement.** Card, Kluve & Weber (JEEA 2018, plus de 200 évaluations) : effets proches de zéro à court terme, positifs après 2-3 ans, surtout pour la formation et les chômeurs de longue durée. → Évaluer les réformes à 3-5 ans, pas à 1 an.
5. **Le revenu n'est pas tout.** World Happiness Report : PIB, soutien social, espérance de vie en bonne santé, liberté, générosité et absence de corruption expliquent environ trois quarts des écarts entre pays ; les facteurs sociaux pèsent au moins autant que le revenu. → La confiance et l'autonomie sont des objectifs à part entière.
6. **La croissance vient de la destruction créatrice** (Nobel 2025 : Mokyr, Aghion, Howitt). → Faciliter l'entrée, la croissance et la sortie des entreprises, sans laisser les perdants sans filet.

## Règles de méthode

1. Chaque affirmation d'effet cite une source vérifiée (DOI ou document local).
2. Chaque prédiction est une fourchette avec niveau de preuve (fort / moyen / faible).
3. Le droit du travail est un levier parmi d'autres : effets attendus modestes, annoncés comme tels.
4. Les études contraires aux hypothèses libérales sont incluses et pesées avec les mêmes critères.
5. Chaque réforme nomme qui perd, combien, et comment compenser.
6. **[V2]** Chaque effet est estimé par groupe (jeunes, seniors, peu qualifiés, femmes, régions, TPE/PME/grandes entreprises), pas seulement en moyenne.
7. **[V2]** Horizon d'évaluation : 1 an, 3-5 ans et 10 ans.

## Points encore ouverts

- Le Code du travail ne contrôle pas l'assurance chômage (Code de la sécurité sociale, accords Unédic) : la partie « sécurité » de la flexisécurité dépend de textes hors périmètre. À décider : élargir le périmètre ou le noter comme dépendance.
- Pondérations entre moteurs : non fixées, traitées par analyse de robustesse.
- Données individuelles (CASD) : non accessibles à ce stade ; travail sur agrégats et littérature.
