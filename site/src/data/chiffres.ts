// Données des graphiques. Chaque bloc indique le fichier du projet dont il provient.

// 03-analyses/ess-resultats.md : écart de satisfaction de vie (0-10) par rapport à un salarié en CDI
export type EssRow = { label: string; value: number; low: number; high: number };
export const ess: EssRow[] = [
  { label: "Chômeur", value: -0.74, low: -0.95, high: -0.52 },
  { label: "Salarié sans contrat écrit", value: -0.43, low: -0.7, high: -0.16 },
  { label: "Ancien chômeur de longue durée, de nouveau en emploi", value: -0.36, low: -0.52, high: -0.19 },
  { label: "Salarié en CDD", value: -0.15, low: -0.27, high: -0.03 },
  { label: "Autonomie au travail totale, comparée à nulle", value: 0.6, low: 0.4, high: 0.7 },
];

// Calculateur : 0,74 point (0,52 à 0,95) ; WELLBY ≈ 18 000 € (14 000 à 22 000 €), Green Book 2021
export const wellby = { effect: 0.74, effectLow: 0.52, effectHigh: 0.95, value: 18000, valueLow: 14000, valueHigh: 22000 };

// 03-analyses/scm-resultats.csv : coût administratif annuel en M€ (bas, central, haut)
// target = cible habituelle des discours de simplification
export type CostRow = { label: string; low: number; mid: number; high: number; target?: boolean };
export const costs: CostRow[] = [
  { label: "Bulletin de paie, 10 salariés et plus", low: 149, mid: 443, high: 1322 },
  { label: "Bulletin de paie, moins de 10 salariés", low: 147, mid: 316, high: 682 },
  { label: "Document de risques, moins de 11 salariés", low: 122, mid: 280, high: 641 },
  { label: "Licenciement pour motif personnel", low: 84, mid: 240, high: 690 },
  { label: "Décompte de la durée du travail", low: 51, mid: 186, high: 673 },
  { label: "Document de risques, 11 salariés et plus", low: 73, mid: 178, high: 435 },
  { label: "Documents de fin de contrat", low: 81, mid: 158, high: 311 },
  { label: "CSE, 11 à 49 salariés", low: 71, mid: 156, high: 343 },
  { label: "Visite médicale d'embauche", low: 72, mid: 132, high: 241 },
  { label: "CSE, 50 à 299 salariés", low: 54, mid: 128, high: 305 },
  { label: "Entretien professionnel", low: 55, mid: 127, high: 292 },
  { label: "Contrat CDD écrit", low: 39, mid: 103, high: 272 },
  { label: "Licenciement économique", low: 40, mid: 92, high: 213 },
  { label: "Rupture conventionnelle", low: 28, mid: 77, high: 216 },
  { label: "CSE, 300 salariés et plus", low: 31, mid: 76, high: 185 },
  { label: "Affichages obligatoires", low: 29, mid: 61, high: 128 },
  { label: "Déclaration préalable à l'embauche", low: 28, mid: 56, high: 115 },
  { label: "Négociations obligatoires", low: 10, mid: 32, high: 103 },
  { label: "Registre du personnel", low: 6, mid: 16, high: 46, target: true },
  { label: "Emploi des travailleurs handicapés", low: 7, mid: 14, high: 30 },
  { label: "Index égalité", low: 5, mid: 13, high: 38, target: true },
  { label: "Document d'information du CDI", low: 4, mid: 10, high: 27 },
  { label: "Règlement intérieur", low: 1, mid: 3, high: 14, target: true },
];

// Code du travail, R2314-1 : total mensuel d'heures de délégation selon l'effectif
export const delegationSteps: [number, number][] = [[0, 0], [11, 10], [25, 20], [50, 72], [75, 95], [100, 126]];

export type Obligation = { from: number; label: string; article: string };
export const obligations: Obligation[] = [
  { from: 11, label: "CSE élu, réunion mensuelle avec les élus", article: "L2311-2" },
  { from: 11, label: "Mise à jour annuelle du document de risques", article: "R4121-2" },
  { from: 20, label: "Déclaration d'emploi des travailleurs handicapés", article: "L5212-2" },
  { from: 50, label: "Consultations annuelles du CSE et base de données économiques", article: "L2312-17" },
  { from: 50, label: "Règlement intérieur", article: "L1311-2" },
  { from: 50, label: "Index égalité salariale publié chaque année", article: "L1142-8" },
  { from: 50, label: "Participation des salariés aux résultats", article: "L3322-2" },
  { from: 50, label: "Budget de fonctionnement du CSE, 0,20 % de la masse salariale", article: "L2315-61" },
  { from: 50, label: "Programme annuel de prévention des risques", article: "L4121-3-1" },
  { from: 50, label: "Plan de sauvegarde de l'emploi dès 10 licenciements économiques", article: "L1233-61" },
];

// 01-sources/donnees/ocde/protection-emploi-epl.csv : indice OCDE 2025, version 4
export const epl: [string, number][] = [
  ["Pays-Bas", 2.88], ["Italie", 2.86], ["France", 2.68], ["Suède", 2.51], ["Espagne", 2.43],
  ["Allemagne", 2.33], ["Moyenne de l'OCDE", 2.21], ["Danemark", 1.94], ["Royaume-Uni", 1.9], ["États-Unis", 0.77],
];
