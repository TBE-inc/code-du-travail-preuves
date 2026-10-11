# Étape 4 — Chômage, précarité et bien-être : résultats ESS

11 octobre 2026. Plan figé avant exécution : `ess-plan-analyse.md`. Tableaux complets : `ess-resultats-bruts.md`.
Script : `scripts/ess_analyse.py`. Données : European Social Survey, vagues 10 et 11, 32 pays, personnes de 18 à 64 ans
salariées ou au chômage (environ 40 000 observations).

## Écarts au plan (signalés)

1. L'humeur dépressive (`fltdpr`) n'existe que dans la vague 11, pas dans la vague 10 comme écrit dans le plan.
2. Erreur de codage corrigée avant interprétation : la question sur le chômage passé de 12 mois ou plus n'est posée
   qu'aux personnes ayant connu au moins 3 mois de chômage. Les autres étaient exclues (N = 10 165) ; elles valent
   désormais « non » (N = 35 234). Spécification inchangée.

## Résultats

Satisfaction dans la vie sur 0 à 10 (moyenne 7,1 ; écart-type 2,1). Écarts à caractéristiques égales (âge, sexe,
études, revenu du ménage, pays et vague), par rapport à un salarié en CDI.

| Situation | Écart de satisfaction | Intervalle à 95 % | Hypothèse |
|---|---|---|---|
| Chômeur | **−0,74** | −0,95 à −0,52 | H1 confirmée |
| Salarié en CDD | **−0,15** | −0,27 à −0,03 | H2 confirmée |
| Salarié sans contrat | −0,43 | −0,70 à −0,16 | |
| Salarié ayant connu 12 mois de chômage ou plus dans le passé | **−0,36** | −0,52 à −0,19 | H4 confirmée |
| Autonomie au travail (par point sur 10) | **+0,06** | +0,04 à +0,07 | H5 confirmée |

- **Le chômage pèse environ cinq fois plus que le CDD** sur la satisfaction (−0,74 contre −0,15). Même résultat avec
  le bonheur déclaré (−0,61 contre −0,18). Avec la santé en contrôle, le chômage reste à −0,62 et le CDD tombe à −0,11
  (limite de significativité).
- **La cicatrice du chômage long** : des salariés ayant retrouvé un emploi gardent un écart de −0,36, la moitié de
  l'effet du chômage actuel. Ils déclarent aussi davantage d'humeur dépressive (+0,14 sur une échelle de 1 à 4).
- **L'autonomie compte** : entre « aucune influence » et « contrôle total » sur l'organisation de son travail,
  l'écart est d'environ +0,6, presque l'équivalent du chômage. Plus d'autonomie va avec moins d'humeur dépressive.
  Cela rejoint Theorell et al. 2015.
- **Le revenu étant contrôlé**, ces écarts mesurent la part non monétaire : statut, lien social, estime de soi.

### H3 : la protection de l'emploi atténue-t-elle ces écarts ? Non détecté.

Interaction avec l'indice OCDE de protection contre le licenciement (25 pays, de 1,61 en Suisse à 3,03 en Tchéquie ;
France 2,68) : aucun effet significatif. Écart du CDD : +0,12 par point d'indice (p = 0,33) ; écart du chômage :
+0,04 (p = 0,88).

Lecture : dans les pays où le licenciement est plus encadré, les chômeurs et les salariés en CDD ne s'en portent pas
visiblement mieux. La puissance statistique est faible (25 pays) : c'est une absence de preuve, pas la preuve d'une
absence. Sverke et al. 2019 parlaient de **protection sociale** (allocations, accompagnement), que nous n'avons pas testée ;
la **protection contre le licenciement** n'est pas la même chose.

### France seule (1 840 personnes dans le modèle)

| Situation | Écart | Intervalle à 95 % |
|---|---|---|
| CDD | +0,14 | −0,22 à +0,49 |
| Chômeur | −0,40 | −0,82 à +0,03 |

Effectifs trop faibles pour conclure (172 chômeurs, 190 CDD). Les ordres de grandeur ne contredisent pas le résultat européen.

## Ce que ça vaut en euros

Guide britannique d'évaluation par le bien-être (`etudes/methodes-evaluation/hm-treasury-...`, p. 33) : un point de
satisfaction pendant un an (un WELLBY) vaut 13 000 £ (fourchette de 10 000 à 16 000 £, prix 2019), soit environ
**18 000 €** en 2025 (14 000 à 22 000 €). Valeur britannique transposée, à prendre comme ordre de grandeur.

- **Un chômeur de moins pendant un an ≈ 0,74 WELLBY ≈ 13 000 €** de bien-être non monétaire, en plus du revenu,
  des cotisations et des allocations économisées.
- **10 000 chômeurs de moins ≈ 130 M€ par an** de bien-être seul.
- Pour comparer : les réformes « gagnant partout » de l'étape 3 rapportent de l'ordre de quelques centaines de M€ par an
  en charge administrative.

## Conséquences pour le projet

1. **Le chômage domine la fonction objectif.** Une réforme qui réduit durablement le chômage de quelques dizaines de
   milliers de personnes pèse plus que toutes les simplifications administratives réunies. Inversement, une réforme
   qui l'augmente annule vite ces gains.
2. **Un CDD vaut beaucoup mieux que le chômage pour le bien-être** (écart cinq fois plus petit). Une flexibilité qui
   **remplace du chômage par de l'emploi, même temporaire**, est probablement positive pour le bien-être. Mais
   l'Espagne montre que modifier les contrats ne crée pas forcément d'emploi : le gain dépend de l'effet réel sur le chômage.
3. **Le chômage long laisse des traces.** La priorité est de **raccourcir les épisodes de chômage**. Cela rejoint
   Card, Kluve et Weber (accompagnement efficace après 2 à 3 ans, surtout pour les chômeurs de longue durée) et
   Kreiner et Svarer (accompagnement actif obligatoire au Danemark).
4. **La protection contre le licenciement ne semble pas « acheter » de bien-être** pour les plus exposés (H3 non
   détecté). L'argument « garder une forte protection pour protéger le bien-être » n'est pas soutenu par ces données.
   L'argument « sécuriser les transitions » (allocations, accompagnement) reste, lui, soutenu par la littérature.
5. **L'autonomie au travail** est un levier de bien-être aussi fort que l'emploi lui-même : un argument pour laisser
   plus de place à l'organisation négociée dans l'entreprise plutôt qu'à des règles uniformes.

## Limites

- **Associations, pas causalité.** Des personnes déjà moins heureuses peuvent être plus souvent au chômage ou en CDD.
  La littérature sur données longitudinales (Clark et Oswald ; Sullivan et von Wachter) trouve cependant des effets
  causaux du chômage du même ordre.
- Pas de mesure de l'insécurité ressentie : le CDD est un indicateur imparfait.
- H3 testé sur 25 pays seulement, avec un seul indicateur.
- Valeur du WELLBY britannique, non calibrée pour la France.
