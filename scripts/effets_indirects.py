"""Effets indirects de la friction administrative : au-delà de la facture directe du Standard Cost Model.

Quatre couches, chacune en fourchette basse / centrale (moyenne géométrique) / haute :
1. Temps libéré valorisé à la production : une heure de paperasse en moins, c'est une heure qui peut produire
   la valeur ajoutée moyenne d'une heure de travail en France (65,1 EUR), et non seulement son coût (44,30 EUR).
2. Incertitude juridique : coût, pour les employeurs, de la défense devant les prud'hommes (frais et temps).
3. Effet d'entraînement sur le PIB : multiplicateur tiré des modèles d'équilibre général de la Commission
   européenne (WorldScan, QUEST) pour une baisse des charges administratives mesurées par la même méthode.
4. Seuils d'effectif : ordre de grandeur de la perte de PIB due au seuil de 50 salariés (Garicano et al.).

Usage : effets_indirects.py <racine du projet>
Sorties : 03-analyses/effets-indirects-resultats.csv et un résumé à l'écran.
"""
import csv
import os
import sys

ROOT = sys.argv[1]

# ---------- paramètres sourcés ----------
COUT_HORAIRE = 44.3          # coût horaire du travail, Eurostat lc_lci_lev, FR, 2025 (hypothèse déjà utilisée par le modèle de coût)
PIB_2025 = 2_991_055.9e6     # PIB France 2025, prix courants, Eurostat nama_10_gdp
EMPLOI_2025 = 30_638_000     # emploi total, personnes, Eurostat nama_10_pe
HEURES_PAR_EMPLOI = 1499.9   # heures travaillées par personne en emploi, Eurostat nama_10_lp_ulc (HW_EMP), 2025
VA_HORAIRE = PIB_2025 / (EMPLOI_2025 * HEURES_PAR_EMPLOI)  # 65,1 EUR

# Commission européenne, SEC(2007) 85 : une baisse de 25 % des charges administratives porterait le niveau du PIB
# de +1,4 % (Gelauff et Lejour 2006, WorldScan) à +1,8 % (QUEST). Charges administratives de l'UE-25 : 3,5 % du PIB
# (Kox 2005, CPB, cité par la Commission ; 1,5 % à 6,8 % selon les pays).
CHARGE_UE_PIB = 0.035
MULT_BAS = 0.014 / (0.25 * CHARGE_UE_PIB)    # 1,6 EUR de PIB par EUR de charge supprimée
MULT_HAUT = 0.018 / (0.25 * CHARGE_UE_PIB)   # 2,06

# Prud'hommes, Références statistiques Justice 2026, tableau 8.1 : 129 816 demandes en 2025, dont 122 833 de salariés
# ordinaires, 3 416 dans des procédures collectives et 236 de salariés protégés (demandes visant un employeur).
DEMANDES_CONTRE_EMPLOYEUR = 122_833 + 3_416 + 236
# Hypothèses (pas de source publique trouvée) : frais d'avocat et temps de l'employeur par demande.
FRAIS_DEFENSE = (1_500, 6_000)      # EUR par demande
TEMPS_DEFENSE_H = (10, 40)           # heures de dirigeant ou de RH par demande

# Propositions du projet (04-propositions/00-sommaire.md) : gain direct de 100 à 550 M EUR par an.
GAIN_PROPOSITIONS = (100e6, 550e6)
# Scénario de référence : retirer un quart de la charge administrative du Code (objectif européen de 2007-2012).
PART_RETIREE = 0.25

# Garicano, Lelarge et Van Reenen (AER 2016, NBER 18841, p. 1 et 5) : l'ensemble des obligations déclenchées à
# 50 salariés coûte moins de 1 % du PIB si les salaires s'ajustent, et réduit le PIB de 4 à 5 % s'ils sont rigides
# à la baisse, surtout par plus de chômage. Deux scénarios distincts, pas une fourchette.
SEUIL_FLEXIBLE_MAX = 0.01
SEUIL_RIGIDE = (0.04, 0.05)


def geo(a, b):
    return (a * b) ** 0.5


# ---------- couche 1 : temps libéré ----------
rows = list(csv.DictReader(open(os.path.join(ROOT, "03-analyses", "scm-hypotheses.csv"), encoding="utf-8")))
h_bas = h_haut = ext_bas = ext_haut = 0.0
for r in rows:
    v = float(r["volume_annuel"])
    h_bas += v * float(r["temps_bas_h"]) * (1 - float(r["bau_haut"]))
    h_haut += v * float(r["temps_haut_h"]) * (1 - float(r["bau_bas"]))
    ext_bas += v * float(r["externe_bas_eur"]) * (1 - float(r["bau_haut"]))
    ext_haut += v * float(r["externe_haut_eur"]) * (1 - float(r["bau_bas"]))
direct = (h_bas * COUT_HORAIRE + ext_bas, h_haut * COUT_HORAIRE + ext_haut)
production = (h_bas * VA_HORAIRE + ext_bas, h_haut * VA_HORAIRE + ext_haut)

# ---------- couche 2 : contentieux ----------
contentieux = tuple(DEMANDES_CONTRE_EMPLOYEUR * (f + t * COUT_HORAIRE) for f, t in zip(FRAIS_DEFENSE, TEMPS_DEFENSE_H))

# ---------- couche 3 : effet d'entraînement ----------
pib_propositions = (GAIN_PROPOSITIONS[0] * MULT_BAS, GAIN_PROPOSITIONS[1] * MULT_HAUT)
retrait = (direct[0] * PART_RETIREE, direct[1] * PART_RETIREE)
pib_retrait = (retrait[0] * MULT_BAS, retrait[1] * MULT_HAUT)

# ---------- couche 4 : seuils ----------
seuil_flex = (0.0, PIB_2025 * SEUIL_FLEXIBLE_MAX)
seuil_rigide = (PIB_2025 * SEUIL_RIGIDE[0], PIB_2025 * SEUIL_RIGIDE[1])

lignes = [
    ("heures", "Heures de paperasse par an", h_bas, h_haut, "heures", "Modèle de coût (scm-hypotheses.csv)"),
    ("direct", "Coût direct (facture)", *direct, "EUR par an", "Standard Cost Model, 44,30 EUR de l'heure"),
    ("production", "Production immobilisée (heures valorisées à la valeur ajoutée)", *production, "EUR par an", f"Valeur ajoutée par heure : {VA_HORAIRE:.1f} EUR (Eurostat)"),
    ("contentieux", "Défense des employeurs aux prud'hommes", *contentieux, "EUR par an", "130 000 demandes (Justice 2026) ; frais et temps : hypothèses"),
    ("pib_propositions", "PIB à long terme : nos propositions", *pib_propositions, "EUR par an", f"Multiplicateur {MULT_BAS:.2f} à {MULT_HAUT:.2f} (Commission européenne 2007)"),
    ("pib_retrait_25", "PIB à long terme : un quart de la paperasse du Code en moins", *pib_retrait, "EUR par an", "Même multiplicateur, scénario de l'objectif européen"),
    ("seuil_50_flexible", "PIB perdu au seuil de 50, salaires flexibles (plafond)", *seuil_flex, "EUR par an", "Garicano, Lelarge et Van Reenen 2016 : moins de 1 % du PIB"),
    ("seuil_50_rigide", "PIB perdu au seuil de 50, salaires rigides", *seuil_rigide, "EUR par an", "Garicano, Lelarge et Van Reenen 2016 : 4 à 5 % du PIB"),
]
out = os.path.join(ROOT, "03-analyses", "effets-indirects-resultats.csv")
with open(out, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["id", "grandeur", "bas", "central", "haut", "unite", "source"])
    for i, nom, b, h, u, s in lignes:
        w.writerow([i, nom, round(b), round(geo(b, h)) if b > 0 else "", round(h), u, s])

md = lambda x: f"{x / 1e9:.2f} Md EUR" if x >= 1e9 else f"{x / 1e6:.0f} M EUR"
pc = lambda x: f"{100 * x / PIB_2025:.3f} % du PIB"
print(f"Valeur ajoutée par heure travaillée : {VA_HORAIRE:.1f} EUR (coût horaire {COUT_HORAIRE} EUR, rapport {VA_HORAIRE / COUT_HORAIRE:.2f})")
print(f"Multiplicateur PIB / charge supprimée : {MULT_BAS:.2f} à {MULT_HAUT:.2f}")
for i, nom, b, h, u, s in lignes:
    if u == "heures":
        print(f"{nom:<64} {b / 1e6:6.1f} à {h / 1e6:6.1f} M h")
    else:
        print(f"{nom:<64} {md(b):>11} à {md(h):>11}   ({pc(b)} à {pc(h)})")
