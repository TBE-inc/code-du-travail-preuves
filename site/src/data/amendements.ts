// Fiches détaillées des amendements. Contenu repris de 04-propositions/P1 à P5.
// Le texte proposé est découpé en segments : texte inchangé, retiré (del) ou ajouté (ins).

export type Segment = string | { del: string } | { ins: string } | { br: true };
export type Verdict = "good" | "cond";

export type Amendement = {
  slug: string;
  titre: string;
  article: string;
  verdict: Verdict;
  gain: string;
  resume: string;
  actuel: string;
  propose: Segment[];
  inchange: string[];
  pourquoi: { texte: string; sources: string[] }[];
  quiPerd: string;
  vues: { liberal: string; syndical: string; juridique: string };
  suivi: string;
  fichier: string;
};

export const amendements: Amendement[] = [
  {
    slug: "document-unique",
    titre: "Évaluer les risques sans paperasse inutile",
    article: "Article R4121-2, 1° et nouvel article R4121-2-1",
    verdict: "good",
    gain: "Environ 140 M€ par an (60 à 330 M€)",
    resume: "On garde l'obligation d'évaluer les risques. On supprime la mise à jour annuelle systématique sous 50 salariés et on donne aux petites entreprises un outil officiel présumé conforme.",
    actuel: "« La mise à jour du document unique d'évaluation des risques professionnels est réalisée : 1° Au moins chaque année dans les entreprises d'au moins onze salariés ; 2° Lors de toute décision d'aménagement important modifiant les conditions de santé et de sécurité ou les conditions de travail ; 3° Lorsqu'une information supplémentaire intéressant l'évaluation d'un risque est portée à la connaissance de l'employeur. »",
    propose: [
      "« 1° Au moins chaque année dans les entreprises d'au moins ", { del: "onze" }, " ", { ins: "cinquante" }, " salariés ; »", { br: true },
      { ins: "Article R4121-2-1 : « Dans les entreprises de moins de cinquante salariés, le document unique établi et mis à jour au moyen de l'outil numérique mis à disposition gratuitement par l'organisme gestionnaire du portail prévu au B du V de l'article L. 4121-3-1 est présumé satisfaire aux obligations de forme prévues aux articles R. 4121-1 et R. 4121-1-1. Cette présomption ne dispense pas l'employeur des mesures de prévention qu'appelle l'évaluation. »" },
    ],
    inchange: [
      "L'obligation d'évaluer les risques (L4121-3).",
      "La mise à jour à chaque changement important et à chaque information nouvelle (R4121-2, 2° et 3°).",
      "La consultation du CSE.",
      "La conservation pendant au moins 40 ans (L4121-3-1, V), assurée par le dépôt sur le portail numérique déjà prévu par la loi. Elle sert à prouver une exposition pour des maladies qui apparaissent des décennies plus tard, comme celles liées à l'amiante.",
    ],
    pourquoi: [
      { texte: "La directive européenne exige seulement que l'employeur « dispose » d'une évaluation, et autorise les États à adapter les obligations documentaires à la taille des entreprises (article 9.2). La mise à jour annuelle est un choix français.", sources: ["dir89"] },
      { texte: "La mesure européenne des charges administratives estime que des outils numériques et des modèles réduisent la charge d'environ 31 %, surtout en évitant le recours à des consultants (46 % du coût).", sources: ["hlg"] },
      { texte: "Une méta-analyse de 59 études montre que les conditions de travail influencent la dépression : on garde donc l'évaluation elle-même.", sources: [] },
    ],
    quiPerd: "Personne directement. Risque : une évaluation moins fréquente dans des entreprises de 11 à 49 salariés dont les risques évoluent sans « aménagement important ».",
    vues: {
      liberal: "Pourquoi ne pas aller jusqu'à 250 salariés ? Au-delà de 50, l'entreprise a un CSE complet et un programme annuel de prévention : la mise à jour annuelle y est cohérente.",
      syndical: "La mise à jour annuelle force l'employeur à se reposer la question. Réponse : la mise à jour reste obligatoire à chaque changement et à chaque information nouvelle, et le CSE peut la demander.",
      juridique: "Compatible avec la directive (article 9.2). La présomption porte sur la forme ; l'obligation de sécurité de l'employeur reste entière.",
    },
    suivi: "Suivre pendant trois ans les accidents du travail dans les entreprises de 11 à 49 salariés (données de l'Assurance maladie).",
    fichier: "04-propositions/P1-document-unique.md",
  },
  {
    slug: "transparence-salariale",
    titre: "Transposer la règle européenne sur l'égalité salariale, sans en rajouter",
    article: "Articles L1142-8 et L1142-9",
    verdict: "good",
    gain: "5 à 25 M€ par an, et une obligation de moins au seuil de 50",
    resume: "La France doit de toute façon transposer la directive de 2023 sur la transparence des rémunérations. On reprend ses seuils au lieu d'aller au-delà, et on calcule les indicateurs à partir des déclarations sociales déjà transmises.",
    actuel: "« Dans les entreprises d'au moins cinquante salariés, l'employeur publie chaque année l'ensemble des indicateurs relatifs aux écarts de rémunération entre les femmes et les hommes et aux actions mises en œuvre pour les supprimer […] »",
    propose: [
      "« Dans les entreprises d'au moins ", { del: "cinquante" }, " ", { ins: "cent" }, " salariés, l'employeur publie ", { del: "chaque année" }, " ", { ins: "selon la périodicité prévue à l'article 9 de la directive (UE) 2023/970" }, " l'ensemble des indicateurs relatifs aux écarts de rémunération […] ", { ins: "Ces indicateurs sont calculés à partir des données transmises dans la déclaration sociale nominative ; l'employeur les vérifie et les complète." }, " »", { br: true },
      "Article L1142-9 : « ", { del: "cinquante" }, " ", { ins: "cent" }, " »",
    ],
    inchange: [
      "L'obligation d'égalité de rémunération pour un même travail ou un travail de valeur égale (L3221-2).",
      "La négociation sur l'égalité professionnelle là où elle existe (L2242-1).",
      "La possibilité pour toute entreprise de publier volontairement.",
    ],
    pourquoi: [
      { texte: "La directive impose le rapport chaque année dès 250 salariés, tous les trois ans de 150 à 249, tous les trois ans de 100 à 149 à partir de 2031. En dessous de 100, c'est facultatif. Le droit français l'exige chaque année dès 50.", sources: ["dir970"] },
      { texte: "La date limite de transposition était le 7 juin 2026 ; le Code du 8 octobre 2026 ne la contient pas encore. Il faut légiférer de toute façon.", sources: ["code"] },
      { texte: "La directive donne aussi à tous les salariés, quelle que soit la taille de l'entreprise, le droit de demander par écrit leur rémunération et les moyennes par sexe pour un travail de même valeur (article 7).", sources: ["dir970"] },
    ],
    quiPerd: "Les salariées des entreprises de 50 à 99 salariés perdent un indicateur public. Aucune étude ne mesure l'effet de l'index sur les écarts dans ces entreprises : on ne sait pas exactement ce qu'on perd.",
    vues: {
      liberal: "Pourquoi pas le minimum strict ? C'est exactement la proposition.",
      syndical: "Recul de l'égalité. Réponse partielle : le droit individuel à l'information prévu par la directive couvre aussi les 50 à 99 salariés.",
      juridique: "Conforme à la directive. Le calcul à partir de la DSN suppose un décret technique et des catégories de postes compatibles.",
    },
    suivi: "Mesurer en 2030 l'écart de salaire dans les entreprises de 50 à 99 salariés (données DSN) et rétablir l'obligation s'il s'y creuse.",
    fichier: "04-propositions/P2-transparence-salariale-sans-surtransposition.md",
  },
  {
    slug: "cdd",
    titre: "CDD : une erreur de forme ne fait plus un CDI",
    article: "Article L1245-1 et nouvel article L1242-12-1",
    verdict: "good",
    gain: "Sécurité juridique ; 4 à 54 M€ par an via le contrat-type",
    resume: "Si le motif du CDD est réel et précis, oublier une mention secondaire donne droit à une indemnité plafonnée au lieu de transformer le contrat en CDI. Un contrat-type officiel est présumé conforme.",
    actuel: "« Est réputé à durée indéterminée tout contrat de travail conclu en méconnaissance des dispositions des articles […] L. 1242-12, alinéa premier […] »",
    propose: [
      { ins: "Article L1245-1, alinéa ajouté : « L'omission ou l'inexactitude d'une des mentions prévues aux 2° à 8° de l'article L. 1242-12 ne saurait, à elle seule, entraîner la requalification du contrat en contrat à durée indéterminée lorsque le motif du recours est précisément défini et réel. Elle ouvre droit, pour le salarié, à une indemnité à la charge de l'employeur qui ne peut être supérieure à un mois de salaire. »" }, { br: true },
      { ins: "Article L1242-12-1 : « Un arrêté du ministre chargé du travail fixe un modèle de contrat de travail à durée déterminée. Le contrat établi conformément à ce modèle est présumé comporter les mentions prévues à l'article L. 1242-12. »" },
    ],
    inchange: [
      "L'écrit obligatoire.",
      "Le motif précis et réel : sa fausseté ou son absence entraîne toujours la requalification.",
      "Les cas de recours, la durée maximale, le délai de carence.",
    ],
    pourquoi: [
      { texte: "Il se signe 21,9 millions de CDD par an, dont 84 % durent moins d'un mois.", sources: ["dares"] },
      { texte: "Même logique que la réforme de 2017, qui a remplacé la requalification par une indemnité d'un mois pour un retard de transmission du contrat.", sources: ["code"] },
      { texte: "On a abandonné l'idée d'un contrat unique pour des missions répétées : il aurait rendu plus facile l'enchaînement de contrats très courts, que l'assurance chômage finance déjà largement.", sources: ["cae24"] },
    ],
    quiPerd: "Le salarié perd un moyen de pression quand une mention secondaire manque, mais garde une indemnité et la requalification en cas de motif faux.",
    vues: {
      liberal: "Pourquoi garder l'écrit ? Le motif écrit est ce qui distingue le CDD du CDI ; sans lui, le contrôle du recours abusif devient impossible.",
      syndical: "La requalification dissuade les abus. Réponse : elle reste entière pour un motif absent, imprécis ou faux.",
      juridique: "Il faut préciser quelles mentions relèvent du motif ; la jurisprudence rattache par exemple le nom de la personne remplacée au motif (à vérifier sur Judilibre). Compatible avec la directive 1999/70.",
    },
    suivi: "Suivre le nombre de demandes de requalification devant les prud'hommes.",
    fichier: "04-propositions/P4-cdd-formalisme.md",
  },
  {
    slug: "heures-de-delegation",
    titre: "Adoucir la marche des 50 salariés",
    article: "Article R2314-1, tableau",
    verdict: "cond",
    gain: "25 à 150 M€ par an ; la marche passe de +52 à +24 heures par mois",
    resume: "Au passage de 49 à 50 salariés, le temps de délégation des élus passe d'un coup de 20 à 72 heures par mois. On rend la progression plus douce entre 25 et 99 salariés, sans toucher au-delà.",
    actuel: "Tableau de l'article R2314-1 : 11 à 24 salariés, 10 heures par mois au total ; 25 à 49, 20 heures ; 50 à 74, 72 heures (4 titulaires × 18 h) ; 75 à 99, 95 heures (5 × 19 h).",
    propose: [
      "25 à 49 salariés : ", { del: "2 × 10 = 20 h" }, " ", { ins: "2 × 12 = 24 h" }, " par mois", { br: true },
      "50 à 74 salariés : ", { del: "4 × 18 = 72 h" }, " ", { ins: "3 × 16 = 48 h" }, " par mois", { br: true },
      "75 à 99 salariés : ", { del: "5 × 19 = 95 h" }, " ", { ins: "4 × 19 = 76 h" }, " par mois", { br: true },
      "100 salariés et plus : inchangé",
    ],
    inchange: [
      "Le plancher légal de 16 heures par titulaire au-delà de 50 salariés (L2315-7).",
      "La possibilité pour un accord d'entreprise de prévoir davantage (L2314-7).",
      "Le barème au-delà de 100 salariés.",
    ],
    pourquoi: [
      { texte: "Le seuil de 50 agit comme une taxe implicite d'environ 1,3 % sur le travail, et les salariés en sont les premiers perdants.", sources: ["garicano"] },
      { texte: "Au-delà de 100 salariés, le barème est à peu près proportionnel à l'effectif. Le seul saut brutal est à 50.", sources: ["code"] },
      { texte: "Seules 41 % des entreprises de 10 salariés et plus ont une instance représentative : beaucoup ne portent pas ce coût en pratique.", sources: ["fs"] },
    ],
    quiPerd: "Les élus et les salariés des entreprises de 50 à 99 salariés : un titulaire de moins, 19 à 24 heures de représentation de moins par mois. Les élus des entreprises de 25 à 49 salariés gagnent 4 heures.",
    vues: {
      liberal: "Le gain est modeste ; le vrai coût du seuil inclut aussi la participation et le budget du CSE. Exact : cette mesure ne traite que la marche en temps.",
      syndical: "Moins de moyens au moment où le CSE reçoit ses attributions économiques. Condition : réserver une part des heures à la santé et à la sécurité.",
      juridique: "Relève d'un décret en Conseil d'État ; respecte les planchers de L2315-7. Le nombre de membres de la délégation est aussi encadré par L2314-1.",
    },
    suivi: "Mesurer après un cycle électoral (4 ans) le bien-être et les accidents du travail dans les entreprises de 50 à 99 salariés.",
    fichier: "04-propositions/P3-heures-delegation-lissage.md",
  },
  {
    slug: "rupture-conventionnelle",
    titre: "Rupture conventionnelle : validation immédiate des dossiers conformes",
    article: "Article L1237-14",
    verdict: "cond",
    gain: "Quinze jours ouvrables de moins par rupture",
    resume: "Quand le contrôle automatique au dépôt confirme le délai de rétractation et l'indemnité minimale, la rupture est validée tout de suite. Les autres dossiers restent examinés par l'administration.",
    actuel: "« L'autorité administrative dispose d'un délai d'instruction de quinze jours ouvrables, à compter de la réception de la demande, pour s'assurer du respect des conditions prévues à la présente section et de la liberté de consentement des parties. A défaut de notification dans ce délai, l'homologation est réputée acquise […] »",
    propose: [
      { ins: "« La demande est déposée par voie dématérialisée. Lorsque le contrôle automatisé réalisé lors du dépôt établit que le délai de rétractation a été respecté et que le montant de l'indemnité n'est pas inférieur à celui prévu à l'article L. 1234-9, l'homologation est acquise dès le dépôt. Dans les autres cas, " }, "l'autorité administrative dispose d'un délai d'instruction de quinze jours ouvrables ; à défaut de notification dans ce délai, l'homologation est réputée acquise. »",
    ],
    inchange: [
      "L'autorisation de l'inspecteur du travail pour les salariés protégés (L1237-15).",
      "Le délai de rétractation de quinze jours calendaires.",
      "Le recours devant les prud'hommes pendant douze mois.",
    ],
    pourquoi: [
      { texte: "518 000 ruptures conventionnelles en 2025 ; l'homologation est déjà réputée acquise sans réponse en quinze jours.", sources: ["dares", "code"] },
      { texte: "Mais ces ruptures représentent 19 % des nouveaux allocataires et 26 % des dépenses d'allocation, soit 9,4 milliards d'euros.", sources: ["senat"] },
    ],
    quiPerd: "L'assurance chômage, si une procédure plus rapide augmente le nombre de ruptures. C'est pourquoi la mesure est sous condition.",
    vues: {
      liberal: "La rupture conventionnelle est la voie de sortie la plus sûre juridiquement ; l'accélérer est cohérent. Mais son coût est porté par l'assurance chômage, pas par les parties.",
      syndical: "L'homologation protège contre les ruptures imposées. Réponse : le contrôle humain reste pour tout dossier non conforme, et le recours aux prud'hommes reste ouvert.",
      juridique: "Un contrôle automatisé ne vérifie pas la liberté du consentement ; aujourd'hui, ce contrôle est déjà largement théorique. À documenter avec les données de refus d'homologation.",
    },
    suivi: "N'adopter qu'avec des règles d'indemnisation ajustées (déjà en cours en 2026) et suivre le nombre de ruptures pendant deux ans.",
    fichier: "04-propositions/P5-rupture-conventionnelle.md",
  },
];

export const amendementBySlug = (slug: string) => amendements.find((a) => a.slug === slug);
