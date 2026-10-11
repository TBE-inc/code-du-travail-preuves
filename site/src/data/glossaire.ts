// Définitions courtes, partagées par le glossaire de la page Méthode et les définitions au survol.
export type Terme = { id: string; terme: string; definition: string };

export const glossaire: Terme[] = [
  { id: "cdi", terme: "CDI", definition: "Contrat de travail sans date de fin." },
  { id: "cdd", terme: "CDD", definition: "Contrat de travail avec une date de fin. Plus de 8 embauches sur 10 se font en CDD, souvent pour moins d'un mois." },
  { id: "cse", terme: "CSE", definition: "Comité social et économique : les représentants élus des salariés. Obligatoire dès 11 salariés, avec plus de pouvoirs dès 50." },
  { id: "delegation", terme: "Heures de délégation", definition: "Temps de travail payé que les élus du personnel consacrent à leur mandat." },
  { id: "document-unique", terme: "Document unique", definition: "Document où l'employeur note les risques pour la santé et la sécurité de ses salariés, et comment il les prévient." },
  { id: "rupture", terme: "Rupture conventionnelle", definition: "Fin d'un CDI d'un commun accord entre l'employeur et le salarié. Elle ouvre droit aux allocations chômage." },
  { id: "requalification", terme: "Requalification", definition: "Décision du juge qui transforme un CDD irrégulier en CDI." },
  { id: "seuil", terme: "Seuil d'effectif", definition: "Nombre de salariés à partir duquel de nouvelles obligations commencent : 11, 20, 50, par exemple." },
  { id: "ic", terme: "Intervalle de confiance", definition: "Fourchette dans laquelle se trouve probablement la vraie valeur." },
  { id: "meta", terme: "Méta-analyse", definition: "Étude qui rassemble et compare les résultats de dizaines d'autres études." },
  { id: "transposer", terme: "Transposer, surtransposer", definition: "Transposer : inscrire une règle européenne dans le droit français. Surtransposer : aller plus loin que ce qu'elle exige." },
  { id: "articles", terme: "Articles L, R, D", definition: "Les articles L sont votés par le Parlement. Les articles R et D sont des décrets du gouvernement." },
];

export const termeParId = Object.fromEntries(glossaire.map((t) => [t.id, t]));
