"""Coût administratif des obligations du Code du travail, méthode Standard Cost Model.

coût = volume x (temps x coût horaire + coût externe) x (1 - part « business as usual »)
Fourchette basse : temps, coût externe bas et BAU haut. Fourchette haute : l'inverse.

Usage : cout_scm.py scm-hypotheses.csv sortie.csv [coût_horaire]
"""
import csv
import sys

SRC, OUT = sys.argv[1], sys.argv[2]
COUT_HORAIRE = float(sys.argv[3]) if len(sys.argv) > 3 else 44.3  # Eurostat lc_lci_lev, FR, 2025

rows = list(csv.DictReader(open(SRC, encoding='utf-8')))
for r in rows:
    v = float(r['volume_annuel'])
    unit_bas = float(r['temps_bas_h']) * COUT_HORAIRE + float(r['externe_bas_eur'])
    unit_haut = float(r['temps_haut_h']) * COUT_HORAIRE + float(r['externe_haut_eur'])
    r['cout_bas_meur'] = round(v * unit_bas * (1 - float(r['bau_haut'])) / 1e6, 1)
    r['cout_haut_meur'] = round(v * unit_haut * (1 - float(r['bau_bas'])) / 1e6, 1)
    r['cout_central_meur'] = round((r['cout_bas_meur'] * r['cout_haut_meur']) ** 0.5, 1)  # moyenne géométrique
    r['heures_bas_m'] = round(v * float(r['temps_bas_h']) * (1 - float(r['bau_haut'])) / 1e6, 2)
    r['heures_haut_m'] = round(v * float(r['temps_haut_h']) * (1 - float(r['bau_bas'])) / 1e6, 2)

rows.sort(key=lambda r: -r['cout_central_meur'])
cols = ['rang', 'id', 'processus', 'base_legale', 'seuil', 'volume_annuel', 'unite',
        'cout_bas_meur', 'cout_central_meur', 'cout_haut_meur', 'heures_bas_m', 'heures_haut_m', 'note']
with open(OUT, 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=cols, extrasaction='ignore')
    w.writeheader()
    for i, r in enumerate(rows, 1):
        r['rang'] = i
        w.writerow(r)

tb = sum(r['cout_bas_meur'] for r in rows)
th = sum(r['cout_haut_meur'] for r in rows)
print(f"Coût horaire : {COUT_HORAIRE} EUR")
for r in rows:
    print(f"{r['rang']:>2} {r['id']:<26} {r['cout_bas_meur']:>8.0f} {r['cout_central_meur']:>8.0f} {r['cout_haut_meur']:>8.0f} M EUR")
print(f"TOTAL {tb/1000:.1f} à {th/1000:.1f} Md EUR par an")
