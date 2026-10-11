// Les cinq constats : titre-conclusion et phrase courte, partagés par l'accueil et les pages de détail.
export type ConstatId = "chomage" | "paperasse" | "seuil" | "licenciement" | "assurance";

export const constats: { id: ConstatId; question: string; titre: string; phrase: string }[] = [
  { id: "chomage", question: "Pourquoi juger une réforme d'abord à l'emploi ?", titre: "Perdre son emploi pèse cinq fois plus qu'un CDD sur le bonheur", phrase: "À revenu égal. Une réforme se juge donc d'abord à son effet sur l'emploi." },
  { id: "paperasse", question: "Combien coûte la paperasse du Code ?", titre: "La paperasse du Code coûte 1 à 7 milliards par an, surtout la paie", phrase: "Les cibles habituelles des discours de simplification pèsent presque rien." },
  { id: "seuil", question: "Pourquoi des entreprises s'arrêtent-elles à 49 salariés ?", titre: "À 50 salariés, tout bascule d'un coup : il faut lisser ce seuil", phrase: "Des entreprises restent à 49 pour l'éviter. Mesuré sur toutes les entreprises, l'effet équivaut à une taxe de 1,3 % sur le travail." },
  { id: "licenciement", question: "Faut-il faciliter le licenciement ?", titre: "Faciliter le licenciement ne crée pas d'emplois, mais aide la productivité", phrase: "Les études des deux bords s'accordent. On peut assouplir si on sécurise la transition." },
  { id: "assurance", question: "Où sont les vrais leviers contre le chômage ?", titre: "Les vrais leviers contre le chômage sont hors du Code du travail", phrase: "L'accompagnement des chômeurs de longue durée marche. Les baisses d'allocations, peu." },
];
