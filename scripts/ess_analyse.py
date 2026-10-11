"""Analyse ESS : chômage, contrat précaire, chômage passé, autonomie et bien-être.

Suit 03-analyses/ess-plan-analyse.md. Usage :
  ess_analyse.py ESS10.sav ESS11.sav protection-emploi-epl.csv sortie.md
"""
import sys

import numpy as np
import pandas as pd
import pyreadstat
import statsmodels.formula.api as smf

ESS10, ESS11, EPL, OUT = sys.argv[1:5]
VARS = ['cntry', 'essround', 'anweight', 'stflife', 'happy', 'mnactic', 'emplrel', 'wrkctra',
        'uemp3m', 'uemp12m', 'wkdcorga', 'agea', 'gndr', 'eduyrs', 'hinctnta', 'health']


def charge(f, extra=()):
    df, _ = pyreadstat.read_sav(f, usecols=VARS + list(extra))
    return df


d = pd.concat([charge(ESS10), charge(ESS11, ['fltdpr'])], ignore_index=True)

# codes de non-réponse ESS -> manquant
for v, maxi in {'stflife': 10, 'happy': 10, 'wkdcorga': 10, 'hinctnta': 10, 'mnactic': 9, 'emplrel': 3,
                'wrkctra': 3, 'uemp3m': 2, 'uemp12m': 2, 'gndr': 2, 'health': 5, 'fltdpr': 4}.items():
    d.loc[d[v] > maxi, v] = np.nan
d.loc[d['eduyrs'] > 40, 'eduyrs'] = np.nan
d.loc[d['agea'] > 120, 'agea'] = np.nan

# statut
d['statut'] = pd.Series([None] * len(d), dtype='object')
emp = (d.mnactic == 1) & (d.emplrel == 1)
d.loc[emp & (d.wrkctra == 1), 'statut'] = 'cdi'
d.loc[emp & (d.wrkctra == 2), 'statut'] = 'cdd'
d.loc[emp & (d.wrkctra == 3), 'statut'] = 'sans_contrat'
d.loc[d.mnactic.isin([3, 4]), 'statut'] = 'chomeur'
d = d[d.statut.notna() & d.agea.between(18, 64)].copy()

d['femme'] = (d.gndr == 2).astype(float)
d['revenu'] = d.hinctnta.fillna(0).astype(int).astype(str)  # 0 = revenu non déclaré
d['pays_vague'] = d.cntry + '_' + d.essround.astype(int).astype(str)
d['age2'] = d.agea ** 2 / 100

CTRL = "agea + age2 + femme + eduyrs + C(revenu) + C(pays_vague)"
STATUT = "C(statut, Treatment('cdi'))"


def ols(formula, data, y):
    data = data.dropna(subset=[y, 'agea', 'eduyrs', 'femme', 'anweight'])
    data = data[data.anweight > 0]
    m = smf.wls(formula, data=data, weights=data.anweight).fit(
        cov_type='cluster', cov_kwds={'groups': pd.factorize(data.cntry)[0]})
    return m, len(data), data.cntry.nunique()


def lignes(m, prefixes):
    out = []
    for k in m.params.index:
        if any(p in k for p in prefixes):
            lo, hi = m.conf_int().loc[k]
            out.append(f"| {k} | {m.params[k]:+.2f} | [{lo:+.2f} ; {hi:+.2f}] | {m.pvalues[k]:.3f} |")
    return out


rapport = ["# Résultats ESS (générés par scripts/ess_analyse.py)", ""]
TETE = ["| Variable | Coefficient | Intervalle de confiance à 95 % | p |", "|---|---|---|---|"]


def bloc(titre, m, n, k, prefixes):
    rapport.extend([f"## {titre}", f"N = {n} ; pays = {k}", ""] + TETE + lignes(m, prefixes) + [""])


# 1. Modèle principal, tous pays
for y in ('stflife', 'happy'):
    m, n, k = ols(f"{y} ~ {STATUT} + {CTRL}", d, y)
    bloc(f"1. {y} selon le statut, tous pays (référence : CDI)", m, n, k, ['statut'])

# 2. France
fr = d[d.cntry == 'FR']
m = smf.wls(f"stflife ~ {STATUT} + agea + age2 + femme + eduyrs + C(revenu) + C(essround)",
            data=fr.dropna(subset=['stflife', 'eduyrs']), weights=fr.dropna(subset=['stflife', 'eduyrs']).anweight).fit(cov_type='HC1')
bloc("2. stflife selon le statut, France seule", m, int(m.nobs), 1, ['statut'])
rapport.append("Effectifs France : " + str(fr.statut.value_counts().to_dict()) + "\n")

# 3. Interaction avec la protection de l'emploi (indice OCDE 2025, version 4)
epl = pd.read_csv(EPL)
epl = epl[(epl.Measure == 'Individual and collective dismissals (regular contracts)') &
          (epl.Version.str.startswith('Version 4')) & epl.OBS_VALUE.notna()]
epl = epl.sort_values('TIME_PERIOD').groupby('REF_AREA').OBS_VALUE.last()
ISO = {'AT': 'AUT', 'BE': 'BEL', 'CH': 'CHE', 'CZ': 'CZE', 'DE': 'DEU', 'DK': 'DNK', 'EE': 'EST', 'ES': 'ESP',
       'FI': 'FIN', 'FR': 'FRA', 'GB': 'GBR', 'GR': 'GRC', 'HU': 'HUN', 'IE': 'IRL', 'IS': 'ISL', 'IL': 'ISR',
       'IT': 'ITA', 'LT': 'LTU', 'LV': 'LVA', 'NL': 'NLD', 'NO': 'NOR', 'PL': 'POL', 'PT': 'PRT', 'SE': 'SWE',
       'SI': 'SVN', 'SK': 'SVK'}
d['epl'] = d.cntry.map(ISO).map(epl)
de = d[d.epl.notna()].copy()
de['epl_c'] = de.epl - de.epl.mean()
m, n, k = ols(f"stflife ~ {STATUT} * epl_c + {CTRL}", de, 'stflife')
bloc("3. Interaction statut × protection de l'emploi (indice centré)", m, n, k, ['statut'])
rapport.append("Indice OCDE par pays : " + ", ".join(f"{c} {v:.2f}" for c, v in
               sorted(de.groupby('cntry').epl.first().items(), key=lambda x: x[1])) + "\n")

# 4. Salariés : chômage passé et autonomie
sal = d[d.statut.isin(['cdi', 'cdd', 'sans_contrat'])].copy()
# uemp12m n'est posée qu'à ceux qui ont connu 3 mois de chômage (uemp3m = 1) : les autres valent 0
sal['chomage_passe_12m'] = np.where(sal.uemp12m == 1, 1.0, np.where((sal.uemp12m == 2) | (sal.uemp3m == 2), 0.0, np.nan))
sal = sal.dropna(subset=['chomage_passe_12m', 'wkdcorga'])
m, n, k = ols(f"stflife ~ chomage_passe_12m + wkdcorga + {STATUT} + {CTRL}", sal, 'stflife')
bloc("4. Salariés : chômage passé de 12 mois ou plus et autonomie (wkdcorga, 0-10)", m, n, k,
     ['chomage_passe', 'wkdcorga'])
s11 = sal[sal.essround == 11].dropna(subset=['fltdpr'])
m, n, k = ols(f"fltdpr ~ chomage_passe_12m + wkdcorga + {STATUT} + {CTRL}", s11, 'fltdpr')
bloc("4b. Salariés, vague 11 : humeur dépressive (fltdpr, 1 = jamais à 4 = presque tout le temps)", m, n, k,
     ['chomage_passe', 'wkdcorga', 'statut'])

# 5. Robustesse : santé ajoutée
m, n, k = ols(f"stflife ~ {STATUT} + C(health) + {CTRL}", d.dropna(subset=['health']), 'stflife')
bloc("5. Robustesse : stflife avec santé déclarée en contrôle", m, n, k, ['statut'])

rapport.append("Moyenne de stflife dans l'échantillon : %.2f (écart-type %.2f)" % (d.stflife.mean(), d.stflife.std()))
open(OUT, 'w', encoding='utf-8').write('\n'.join(rapport))
print('\n'.join(rapport))
