// Liste des sources, dans l'ordre de numérotation des notes.
export type Source = { id: string; text: string; url?: string; label?: string };

export const sources: Source[] = [
  { id: "ess", text: "European Social Survey, vagues 10 et 11 (2020-2024) ; analyse propre, plan écrit avant exécution.", url: "https://ess.sikt.no", label: "ess.sikt.no" },
  { id: "scm", text: "Modèle de coût sur 23 démarches : hypothèses et résultats téléchargeables plus bas." },
  { id: "garicano", text: "Garicano, Lelarge et Van Reenen, « Firm Size Distortions and the Productivity Distribution: Evidence from France », NBER w18841, publié dans l'American Economic Review (2016).", url: "https://www.nber.org/papers/w18841", label: "nber.org" },
  { id: "code", text: "Code du travail, version du 8 octobre 2026.", url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050", label: "legifrance.gouv.fr" },
  { id: "sullivan", text: "Sullivan et von Wachter, « Mortality, Mass-Layoffs, and Career Outcomes », NBER w13626.", url: "https://www.nber.org/papers/w13626", label: "nber.org" },
  { id: "nordt", text: "Nordt et al., « Modelling suicide and unemployment: a longitudinal analysis covering 63 countries, 2000-11 », The Lancet Psychiatry (2015).", url: "https://doi.org/10.1016/S2215-0366(14)00118-7", label: "doi.org" },
  { id: "wellby", text: "HM Treasury, « Wellbeing guidance for appraisal », 2021, p. 33.", url: "https://assets.publishing.service.gov.uk/media/60fa9169d3bf7f0448719daf/Wellbeing_guidance_for_appraisal_-_supplementary_Green_Book_guidance.pdf", label: "gov.uk" },
  { id: "scmmanual", text: "SCM Network, « International Standard Cost Model Manual ».", url: "https://diadikasies.gov.gr/assets/International%20SCM%20Manual%20OECD.pdf", label: "copie publique" },
  { id: "dares", text: "DARES, « Les mouvements de main-d'œuvre », données 2025.", url: "https://dares.travail-emploi.gouv.fr/donnees/les-mouvements-de-main-doeuvre", label: "dares.travail-emploi.gouv.fr" },
  { id: "eurostat", text: "Eurostat, coût horaire du travail (lc_lci_lev), France 2025.", url: "https://ec.europa.eu/eurostat/databrowser/view/lc_lci_lev/default/table", label: "ec.europa.eu" },
  { id: "hlg", text: "Commission européenne, groupe de haut niveau sur les charges administratives, avis « Working environment / Employment relations » (2009).", url: "https://bollettinoadapt.it/old/site/home/bollettino-adapt/ordinario/22-giugno-2009-n-18/1064EU_WORK_ENVIR_28.pdf", label: "copie publique" },
  { id: "fs", text: "France Stratégie, « Évaluation des ordonnances du 22 septembre 2017 », rapport 2021, p. 14 et 16.", url: "https://www.strategie.gouv.fr", label: "strategie.gouv.fr" },
  { id: "cp", text: "Cahuc et Palladino, « Employment Protection Legislation and Job Reallocation », IZA DP 16747 (2024).", url: "https://docs.iza.org/dp16747.pdf", label: "iza.org" },
  { id: "avdagic", text: "Avdagic, « Is Deregulation Necessary? », CELSI DP 17 (2013).", url: "https://celsi.sk/sk/publikacie/diskusny-clanok/detail/29/is-deregulation-necessary-the-effects-of-employment-protection-on-unemployment/", label: "celsi.sk" },
  { id: "howell", text: "Howell, Baker, Glyn et Schmitt, « Are Protective Labor Market Institutions Really at the Root of Unemployment? » (2006).", url: "https://cepr.net/publications/are-protective-labor-market-institutions-really-at-the-root-of-unemployment-a-critical-perspective/", label: "cepr.net" },
  { id: "bassanini", text: "Bassanini, Nunziata et Venn, « Job Protection Legislation and Productivity Growth in OECD Countries », IZA DP 3555.", url: "https://docs.iza.org/dp3555.pdf", label: "iza.org" },
  { id: "vergeer", text: "Vergeer et Kleinknecht, « Do labour market reforms reduce labour productivity growth? », International Labour Review (2014).", url: "https://static.uni-graz.at/fileadmin/sowi-zentren/Schumpeter-Centre/Download/GSSC/I_L_R_Vergeer_-_Kleinknecht.pdf", label: "copie publique" },
  { id: "boeri", text: "Boeri et Garibaldi, « A Tale of Comprehensive Labor Market Reforms: Evidence from the Italian Jobs Act », CEP DP 1613 (2019).", url: "https://cep.lse.ac.uk/pubs/download/dp1613.pdf", label: "lse.ac.uk" },
  { id: "hartz", text: "Bradley et Kügler, « Labor market reforms: An evaluation of the Hartz policies in Germany », European Economic Review (2019).", url: "https://discovery.ucl.ac.uk/id/eprint/10069841/", label: "ucl.ac.uk" },
  { id: "dk", text: "Kreiner et Svarer, « Danish Flexicurity: Rights and Duties », CEBI WP 16/22 (2022).", url: "https://www.econ.ku.dk/cebi/publikationer/working-papers/CEBI_WP_16-22.pdf", label: "ku.dk" },
  { id: "oecdepl", text: "OCDE, indicateurs de protection de l'emploi, version 4 (2025).", url: "https://data-explorer.oecd.org", label: "data-explorer.oecd.org" },
  { id: "bt", text: "Blanchard et Tirole, « Protection de l'emploi et procédures de licenciement », rapport du CAE n° 44 (2003).", url: "https://cae-eco.fr/static/pdf/044.pdf", label: "cae-eco.fr" },
  { id: "unedic", text: "Unédic, circulaire n° 2025-03 et présentation de la convention du 15 novembre 2024.", url: "https://www.unedic.org", label: "unedic.org" },
  { id: "senat", text: "Sénat, rapport n° 488 (2025-2026).", url: "https://www.senat.fr/rap/l25-488/l25-4881.pdf", label: "senat.fr" },
  { id: "ckw", text: "Card, Kluve et Weber, « What Works? A Meta Analysis of Recent Active Labor Market Program Evaluations », NBER w21431.", url: "https://www.nber.org/papers/w21431", label: "nber.org" },
  { id: "oecdact", text: "OCDE, « Strictness of activation requirements for benefit recipients » (2024).", url: "https://data-explorer.oecd.org", label: "data-explorer.oecd.org" },
  { id: "dir89", text: "Directive 89/391/CEE, article 9.", url: "https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:31989L0391", label: "eur-lex.europa.eu" },
  { id: "dir970", text: "Directive (UE) 2023/970, articles 7 et 9.", url: "https://eur-lex.europa.eu/legal-content/FR/ALL/?uri=CELEX:32023L0970", label: "eur-lex.europa.eu" },
  { id: "cae24", text: "Cahuc et Prost, « Améliorer l'assurance chômage pour limiter l'instabilité de l'emploi », note du CAE n° 24 (2015).", url: "https://cae-eco.fr/static/pdf/cae-note024.pdf", label: "cae-eco.fr" },
];

export type SourceId = (typeof sources)[number]["id"];

export const sourceNumber = (id: string): number => {
  const i = sources.findIndex((s) => s.id === id);
  if (i < 0) throw new Error(`Source inconnue : ${id}`);
  return i + 1;
};
