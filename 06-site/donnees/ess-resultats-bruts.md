# Résultats ESS (générés par scripts/ess_analyse.py)

## 1. stflife selon le statut, tous pays (référence : CDI)
N = 39777 ; pays = 32

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | -0.15 | [-0.27 ; -0.03] | 0.013 |
| C(statut, Treatment('cdi'))[T.chomeur] | -0.74 | [-0.95 ; -0.52] | 0.000 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | -0.43 | [-0.70 ; -0.16] | 0.002 |

## 1. happy selon le statut, tous pays (référence : CDI)
N = 39943 ; pays = 32

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | -0.18 | [-0.29 ; -0.06] | 0.003 |
| C(statut, Treatment('cdi'))[T.chomeur] | -0.61 | [-0.72 ; -0.50] | 0.000 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | -0.23 | [-0.44 ; -0.02] | 0.032 |

## 2. stflife selon le statut, France seule
N = 1840 ; pays = 1

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | +0.14 | [-0.22 ; +0.49] | 0.451 |
| C(statut, Treatment('cdi'))[T.chomeur] | -0.40 | [-0.82 ; +0.03] | 0.070 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | -0.58 | [-1.43 ; +0.28] | 0.186 |

Effectifs France : {'cdi': 1491, 'cdd': 190, 'chomeur': 172, 'sans_contrat': 23}

## 3. Interaction statut × protection de l'emploi (indice centré)
N = 31995 ; pays = 25

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | -0.14 | [-0.25 ; -0.04] | 0.006 |
| C(statut, Treatment('cdi'))[T.chomeur] | -0.77 | [-1.01 ; -0.53] | 0.000 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | -0.30 | [-0.46 ; -0.15] | 0.000 |
| C(statut, Treatment('cdi'))[T.cdd]:epl_c | +0.12 | [-0.12 ; +0.35] | 0.329 |
| C(statut, Treatment('cdi'))[T.chomeur]:epl_c | +0.04 | [-0.43 ; +0.50] | 0.882 |
| C(statut, Treatment('cdi'))[T.sans_contrat]:epl_c | +0.07 | [-0.28 ; +0.43] | 0.688 |

Indice OCDE par pays : CH 1.61, LT 1.85, HU 1.89, GB 1.90, EE 1.93, AT 1.94, IE 2.17, IS 2.20, GR 2.32, SI 2.32, SK 2.33, DE 2.33, NO 2.37, PL 2.42, ES 2.43, FI 2.48, SE 2.51, BE 2.59, FR 2.68, LV 2.71, IL 2.83, IT 2.86, NL 2.88, PT 2.96, CZ 3.03

## 4. Salariés : chômage passé de 12 mois ou plus et autonomie (wkdcorga, 0-10)
N = 35234 ; pays = 32

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| chomage_passe_12m | -0.36 | [-0.52 ; -0.19] | 0.000 |
| wkdcorga | +0.06 | [+0.04 ; +0.07] | 0.000 |

## 4b. Salariés, vague 11 : humeur dépressive (fltdpr, 1 = jamais à 4 = presque tout le temps)
N = 20199 ; pays = 30

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | +0.03 | [-0.01 ; +0.07] | 0.141 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | +0.10 | [+0.04 ; +0.16] | 0.002 |
| chomage_passe_12m | +0.14 | [+0.04 ; +0.23] | 0.006 |
| wkdcorga | -0.01 | [-0.01 ; -0.00] | 0.003 |

## 5. Robustesse : stflife avec santé déclarée en contrôle
N = 39751 ; pays = 32

| Variable | Coefficient | Intervalle de confiance à 95 % | p |
|---|---|---|---|
| C(statut, Treatment('cdi'))[T.cdd] | -0.11 | [-0.23 ; +0.00] | 0.052 |
| C(statut, Treatment('cdi'))[T.chomeur] | -0.62 | [-0.81 ; -0.43] | 0.000 |
| C(statut, Treatment('cdi'))[T.sans_contrat] | -0.40 | [-0.68 ; -0.12] | 0.005 |

Moyenne de stflife dans l'échantillon : 7.09 (écart-type 2.05)