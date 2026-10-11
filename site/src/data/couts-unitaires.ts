// Fichier généré par scripts/prep_site_data.py à partir de 03-analyses/scm-hypotheses.csv. Ne pas modifier à la main.
export type CoutUnitaire = { nom: string; article: string; bas: number; haut: number; heuresBas: number; heuresHaut: number };
export const coutHoraire = 44.3;
export const coutsUnitaires: Record<string, CoutUnitaire> = {
  "dpae": {
    "nom": "Déclaration préalable à l'embauche",
    "article": "L1221-10",
    "bas": 1.06,
    "haut": 4.43,
    "heuresBas": 0.024,
    "heuresHaut": 0.1
  },
  "cdd_contrat": {
    "nom": "Contrat CDD écrit (mentions obligatoires + transmission sous 2 jours)",
    "article": "L1242-12 L1242-13 L1245-1",
    "bas": 1.77,
    "haut": 12.4,
    "heuresBas": 0.04,
    "heuresHaut": 0.28
  },
  "cdi_information": {
    "nom": "Document d'information sur la relation de travail (CDI)",
    "article": "L1221-5-1 R1221-34",
    "bas": 0.89,
    "haut": 6.64,
    "heuresBas": 0.02,
    "heuresHaut": 0.15
  },
  "registre_personnel": {
    "nom": "Registre unique du personnel",
    "article": "L1221-13",
    "bas": 0.22,
    "haut": 1.77,
    "heuresBas": 0.005,
    "heuresHaut": 0.04
  },
  "visite_info_prevention": {
    "nom": "Organisation de la visite d'information et de prévention",
    "article": "R4624-10",
    "bas": 9.97,
    "haut": 33.22,
    "heuresBas": 0.225,
    "heuresHaut": 0.75
  },
  "fin_contrat_documents": {
    "nom": "Documents de fin de contrat (certificat de travail ; reçu pour solde ; attestation France Travail)",
    "article": "L1234-19 L1234-20 R1234-9",
    "bas": 3.1,
    "haut": 11.96,
    "heuresBas": 0.07,
    "heuresHaut": 0.27
  },
  "licenciement_personnel": {
    "nom": "Procédure de licenciement pour motif personnel (convocation ; entretien ; lettre motivée)",
    "article": "L1232-2 à L1232-6",
    "bas": 93.03,
    "haut": 768.96,
    "heuresBas": 2.1,
    "heuresHaut": 7.2
  },
  "licenciement_economique": {
    "nom": "Procédure de licenciement économique hors PSE",
    "article": "L1233-3 et suivants",
    "bas": 523.52,
    "haut": 2796.75,
    "heuresBas": 6.4,
    "heuresHaut": 22.5
  },
  "rupture_conventionnelle": {
    "nom": "Rupture conventionnelle (entretien(s) ; convention ; délai de rétractation ; homologation)",
    "article": "L1237-11 à L1237-16",
    "bas": 53.16,
    "haut": 417.2,
    "heuresBas": 1.2,
    "heuresHaut": 4.0
  },
  "duerp_moins_11": {
    "nom": "Document unique d'évaluation des risques (moins de 11 salariés)",
    "article": "L4121-3 R4121-1 R4121-2",
    "bas": 97.02,
    "haut": 509.22,
    "heuresBas": 1.4,
    "heuresHaut": 5.4
  },
  "duerp_11_plus": {
    "nom": "Document unique d'évaluation des risques : mise à jour annuelle (11 salariés et plus)",
    "article": "R4121-2",
    "bas": 388.08,
    "haut": 2306.88,
    "heuresBas": 5.6,
    "heuresHaut": 21.6
  },
  "affichages": {
    "nom": "Affichages et informations obligatoires",
    "article": "L3171-1 et autres",
    "bas": 19.93,
    "haut": 88.6,
    "heuresBas": 0.45,
    "heuresHaut": 2.0
  },
  "entretien_parcours": {
    "nom": "Entretien de parcours professionnel (tous les 4 ans + première année)",
    "article": "L6315-1",
    "bas": 9.97,
    "haut": 53.16,
    "heuresBas": 0.225,
    "heuresHaut": 1.2
  },
  "cse_11_49": {
    "nom": "CSE de 11 à 49 salariés (réunions mensuelles ; élections tous les 4 ans)",
    "article": "L2311-2 L2315-21",
    "bas": 449.64,
    "haut": 2184.35,
    "heuresBas": 10.15,
    "heuresHaut": 39.15
  },
  "cse_50_299": {
    "nom": "CSE de 50 à 299 salariés (6 réunions ; 3 consultations récurrentes ; BDESE ; élections)",
    "article": "L2312-17 L2312-18 L2315-28",
    "bas": 2139.69,
    "haut": 12069.45,
    "heuresBas": 48.3,
    "heuresHaut": 211.5
  },
  "cse_300_plus": {
    "nom": "CSE de 300 salariés et plus (12 réunions ; consultations ; BDESE ; élections)",
    "article": "L2312-17 L2312-18 L2315-28",
    "bas": 5023.62,
    "haut": 30131.1,
    "heuresBas": 113.4,
    "heuresHaut": 477.0
  },
  "index_egalite": {
    "nom": "Index et indicateurs d'égalité professionnelle",
    "article": "L1142-8 D1142-2",
    "bas": 141.76,
    "haut": 1208.8,
    "heuresBas": 3.2,
    "heuresHaut": 16.0
  },
  "reglement_interieur": {
    "nom": "Règlement intérieur (tenue à jour ; avis CSE ; dépôt)",
    "article": "L1311-2 L1321-4",
    "bas": 22.15,
    "haut": 452.64,
    "heuresBas": 0.5,
    "heuresHaut": 4.8
  },
  "negociations_obligatoires": {
    "nom": "Négociations obligatoires (rémunération ; égalité ; QVCT)",
    "article": "L2242-1",
    "bas": 310.1,
    "haut": 3292.2,
    "heuresBas": 7.0,
    "heuresHaut": 54.0
  },
  "oeth": {
    "nom": "Obligation d'emploi des travailleurs handicapés (calcul et déclaration)",
    "article": "L5212-2 et suivants",
    "bas": 79.74,
    "haut": 354.4,
    "heuresBas": 1.8,
    "heuresHaut": 8.0
  },
  "bulletin_paie_tpe": {
    "nom": "Bulletin de paie : entreprises de 1 à 9 salariés",
    "article": "L3243-2 R3243-1",
    "bas": 4.0,
    "haut": 18.61,
    "heuresBas": 0.0,
    "heuresHaut": 0.025
  },
  "bulletin_paie_10_plus": {
    "nom": "Bulletin de paie : entreprises de 10 salariés et plus",
    "article": "L3243-2 R3243-1",
    "bas": 0.8,
    "haut": 7.11,
    "heuresBas": 0.0,
    "heuresHaut": 0.025
  },
  "decompte_temps": {
    "nom": "Décompte et documents de durée du travail",
    "article": "L3171-2 D3171-8",
    "bas": 35.44,
    "haut": 465.15,
    "heuresBas": 0.8,
    "heuresHaut": 10.5
  }
};
