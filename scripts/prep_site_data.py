"""Prépare les données du site à partir des fichiers du projet.

Sorties (site/public/data/) :
- obligations.json : les obligations extraites, en format compact
- pays.json : indicateurs par pays (Eurostat, OCDE), dernière année disponible

Usage : python scripts/prep_site_data.py <racine du projet>
"""
import csv
import json
import os
import sys

ROOT = sys.argv[1]
OUT = os.path.join(ROOT, "site", "public", "data")
os.makedirs(OUT, exist_ok=True)

# ---------- obligations ----------
CATEGORIES = {
    "declaration_admin": "Déclaration à l'administration",
    "autorisation": "Autorisation administrative",
    "consultation_cse": "Consultation du CSE",
    "information_cse": "Information du CSE",
    "negociation": "Négociation",
    "affichage": "Affichage",
    "registre_document": "Registre ou document",
    "information_salarie": "Information du salarié",
    "entretien_salarie": "Entretien avec le salarié",
    "formalisme_procedure": "Forme et procédure",
    "preuve_justification": "Preuve ou justification",
    "versement": "Versement",
    "sante_securite": "Santé et sécurité",
    "formation": "Formation",
    "organisation_travail": "Organisation du travail",
    "interdiction": "Interdiction",
    "autre": "Non classée",
}
PARTIES = {
    "Première": "Relations individuelles",
    "Deuxième": "Relations collectives",
    "Troisième": "Durée du travail, salaire",
    "Quatrième": "Santé et sécurité",
    "Cinquième": "Emploi",
    "Sixième": "Formation professionnelle",
    "Septième": "Professions particulières",
    "Huitième": "Contrôle",
}
rows = []
with open(os.path.join(ROOT, "02-extractions", "obligations.csv"), encoding="utf-8") as f:
    for r in csv.DictReader(f):
        partie = next((v for k, v in PARTIES.items() if r["partie"].startswith(k)), "Autre")
        texte = r["texte"].strip()
        rows.append([
            r["article"],
            partie,
            CATEGORIES.get(r["categorie"], "Non classée"),
            int(r["seuil_effectif"]) if r["seuil_effectif"] else 0,
            texte if len(texte) <= 420 else texte[:417].rsplit(" ", 1)[0] + " […]",
        ])
with open(os.path.join(OUT, "obligations.json"), "w", encoding="utf-8") as f:
    json.dump({"colonnes": ["article", "partie", "categorie", "seuil", "texte"], "lignes": rows}, f, ensure_ascii=False, separators=(",", ":"))
print("obligations :", len(rows))

# ---------- pays ----------
PAYS = {"FR": "France", "DE": "Allemagne", "DK": "Danemark", "IT": "Italie", "ES": "Espagne", "NL": "Pays-Bas",
        "SE": "Suède", "BE": "Belgique", "AT": "Autriche", "FI": "Finlande", "PT": "Portugal", "PL": "Pologne",
        "IE": "Irlande", "EU27_2020": "Union européenne"}
ISO3 = {"FR": "FRA", "DE": "DEU", "DK": "DNK", "IT": "ITA", "ES": "ESP", "NL": "NLD", "SE": "SWE", "BE": "BEL",
        "AT": "AUT", "FI": "FIN", "PT": "PRT", "PL": "POL", "IE": "IRL"}
EUROSTAT = os.path.join(ROOT, "01-sources", "donnees", "eurostat")
OCDE = os.path.join(ROOT, "01-sources", "donnees", "ocde")


def eurostat(fichier, filtres):
    """Dernière valeur disponible par pays pour une série filtrée."""
    best = {}
    with open(os.path.join(EUROSTAT, fichier), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["geo"] not in PAYS or not r["OBS_VALUE"]:
                continue
            if any(r.get(k) != v for k, v in filtres.items()):
                continue
            y = r["TIME_PERIOD"]
            if r["geo"] not in best or y > best[r["geo"]][0]:
                best[r["geo"]] = (y, float(r["OBS_VALUE"]))
    return best


def ocde(fichier, mesure, extra=None):
    best = {}
    with open(os.path.join(OCDE, fichier), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if r["Measure"] != mesure or not r["OBS_VALUE"]:
                continue
            if extra and not extra(r):
                continue
            geo = next((k for k, v in ISO3.items() if v == r["REF_AREA"]), None)
            if not geo:
                continue
            y = r["TIME_PERIOD"]
            if geo not in best or y > best[geo][0]:
                best[geo] = (y, float(r["OBS_VALUE"]))
    return best


indicateurs = [
    ("chomage", "Taux de chômage", "% des actifs", "bas", "Eurostat une_rt_a, 15-74 ans",
     eurostat("une_rt_a.csv", {"age": "Y15-74", "sex": "T", "unit": "PC_ACT"})),
    ("chomage_jeunes", "Chômage des 15-24 ans", "% des actifs", "bas", "Eurostat une_rt_a",
     eurostat("une_rt_a.csv", {"age": "Y15-24", "sex": "T", "unit": "PC_ACT"})),
    ("chomage_long", "Chômage de longue durée (plus d'un an)", "% des actifs", "bas", "Eurostat une_ltu_a",
     eurostat("une_ltu_a.csv", {"indic_em": "LTU", "age": "Y15-74", "sex": "T", "unit": "PC_ACT"})),
    ("emploi", "Taux d'emploi des 15-64 ans", "% de la population", "haut", "Eurostat lfsa_ergan",
     eurostat("lfsa_ergan.csv", {"age": "Y15-64", "sex": "T", "citizen": "TOTAL", "unit": "PC"})),
    ("emploi_seniors", "Taux d'emploi des 55-64 ans", "% de la population", "haut", "Eurostat lfsa_ergan",
     eurostat("lfsa_ergan.csv", {"age": "Y55-64", "sex": "T", "citizen": "TOTAL", "unit": "PC"})),
    ("neet", "Jeunes de 15-29 ans sans emploi ni formation", "% des 15-29 ans", "bas", "Eurostat edat_lfse_20",
     eurostat("edat_lfse_20.csv", {"age": "Y15-29", "sex": "T", "wstatus": "NEMP", "unit": "PC"})),
    ("satisfaction", "Satisfaction de vie moyenne", "sur 10", "haut", "Eurostat ilc_pw01, 16 ans et plus",
     eurostat("ilc_pw01.csv", {"age": "Y_GE16", "sex": "T", "isced11": "TOTAL", "statinfo": "AVG"})),
    ("sante", "Années de vie en bonne santé à la naissance", "années", "haut", "Eurostat hlth_hlye",
     eurostat("hlth_hlye.csv", {"hlth_hle": "HLY_Y0", "sex": "T", "unit": "YR"})),
    ("epl", "Protection contre le licenciement (CDI)", "indice 0 à 6", None, "OCDE, version 4",
     ocde("protection-emploi-epl.csv", "Individual and collective dismissals (regular contracts)",
          lambda r: r.get("Version", "").startswith("Version 4"))),
    ("activation", "Exigences envers les chômeurs", "indice 1 à 5", None, "OCDE, assurance chômage",
     ocde("conditions-activation-chomeurs.csv", "Strictness of activation requirements overall score",
          lambda r: "insurance" in r.get("Benefit tier", "").lower())),
]
pays_json = {
    "pays": PAYS,
    "indicateurs": [
        {"id": i, "nom": n, "unite": u, "mieux": m, "source": s,
         "valeurs": {g: {"annee": y, "valeur": round(v, 2)} for g, (y, v) in d.items()}}
        for i, n, u, m, s, d in indicateurs
    ],
}
with open(os.path.join(OUT, "pays.json"), "w", encoding="utf-8") as f:
    json.dump(pays_json, f, ensure_ascii=False, indent=1)
for ind in pays_json["indicateurs"]:
    fr = ind["valeurs"].get("FR")
    print(f"{ind['id']:<16} pays={len(ind['valeurs']):>2}  France={fr}")

# ---------- coûts unitaires pour le simulateur « mon entreprise » ----------
# Coût par occurrence (par embauche, par fin de contrat, par entreprise et par an…), après déduction
# de ce que l'entreprise ferait de toute façon. Bas : temps et coûts bas, part « de toute façon » haute.
HORAIRE = 44.3
unit = {}
with open(os.path.join(ROOT, "03-analyses", "scm-hypotheses.csv"), encoding="utf-8") as f:
    for r in csv.DictReader(f):
        lo = (float(r["temps_bas_h"]) * HORAIRE + float(r["externe_bas_eur"])) * (1 - float(r["bau_haut"]))
        hi = (float(r["temps_haut_h"]) * HORAIRE + float(r["externe_haut_eur"])) * (1 - float(r["bau_bas"]))
        hlo = float(r["temps_bas_h"]) * (1 - float(r["bau_haut"]))
        hhi = float(r["temps_haut_h"]) * (1 - float(r["bau_bas"]))
        unit[r["id"]] = {"nom": r["processus"], "article": r["base_legale"], "bas": round(lo, 2), "haut": round(hi, 2),
                         "heuresBas": round(hlo, 3), "heuresHaut": round(hhi, 3)}
ts = ("// Fichier généré par scripts/prep_site_data.py à partir de 03-analyses/scm-hypotheses.csv. Ne pas modifier à la main.\n"
      "export type CoutUnitaire = { nom: string; article: string; bas: number; haut: number; heuresBas: number; heuresHaut: number };\n"
      f"export const coutHoraire = {HORAIRE};\n"
      "export const coutsUnitaires: Record<string, CoutUnitaire> = " + json.dumps(unit, ensure_ascii=False, indent=2) + ";\n")
with open(os.path.join(ROOT, "site", "src", "data", "couts-unitaires.ts"), "w", encoding="utf-8") as f:
    f.write(ts)
print("coûts unitaires :", len(unit))
