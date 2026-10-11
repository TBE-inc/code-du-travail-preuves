// Définitions courtes, partagées par le glossaire de la page Méthode et les définitions au survol.
export type Terme = { id: string; terme: string; definition: string };

export const glossaire: Terme[] = [
  { id: "cdi", terme: "CDI", definition: "Contrat de travail sans date de fin." },
  { id: "cdd", terme: "CDD", definition: "Contrat de travail avec une date de fin. 84 % des embauches se font en CDD, souvent de moins d'un mois." },
  { id: "cse", terme: "CSE", definition: "Les représentants élus des salariés, obligatoires dès 11 salariés, avec plus de pouvoirs dès 50." },
  { id: "delegation", terme: "Heures de délégation", definition: "Temps de travail payé que les élus du CSE consacrent à leur mandat." },
  { id: "document-unique", terme: "Document unique", definition: "Document où l'employeur inscrit l'évaluation des risques pour la santé de ses salariés." },
  { id: "rupture", terme: "Rupture conventionnelle", definition: "Fin de CDI d'un commun accord, qui ouvre droit aux allocations chômage." },
  { id: "requalification", terme: "Requalification", definition: "Le juge transforme un CDD irrégulier en CDI." },
  { id: "seuil", terme: "Seuil d'effectif", definition: "Nombre de salariés à partir duquel de nouvelles obligations s'appliquent (11, 20, 50…)." },
  { id: "ic", terme: "Intervalle de confiance", definition: "Fourchette où se trouve probablement la vraie valeur." },
  { id: "meta", terme: "Méta-analyse", definition: "Étude qui rassemble les résultats de dizaines d'autres." },
  { id: "transposer", terme: "Transposer, surtransposer", definition: "Inscrire une règle européenne dans le droit national ; aller au-delà de ce qu'elle exige." },
  { id: "articles", terme: "Articles L, R, D", definition: "L : votés par le Parlement. R et D : décrets du gouvernement." },
];

export const termeParId = Object.fromEntries(glossaire.map((t) => [t.id, t]));
