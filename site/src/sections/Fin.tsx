import { Fn, Row } from "../components/ui";
import { sources } from "../data/sources";

const glossary: [string, string][] = [
  ["CDI, CDD", "Contrat sans date de fin, ou avec. 84 % des embauches se font en CDD, souvent de moins d'un mois."],
  ["CSE", "Les représentants élus des salariés, obligatoires dès 11 salariés, avec plus de pouvoirs dès 50."],
  ["Heures de délégation", "Temps de travail payé que les élus consacrent à leur mandat."],
  ["Document unique", "Document où l'employeur inscrit l'évaluation des risques pour la santé de ses salariés."],
  ["Rupture conventionnelle", "Fin de CDI d'un commun accord, qui ouvre droit aux allocations chômage."],
  ["Requalification", "Le juge transforme un CDD irrégulier en CDI."],
  ["Intervalle de confiance", "Fourchette où se trouve probablement la vraie valeur."],
  ["Méta-analyse", "Étude qui rassemble les résultats de dizaines d'autres."],
  ["Transposer, surtransposer", "Inscrire une règle européenne dans le droit national ; aller au-delà de ce qu'elle exige."],
  ["Articles L, R, D", "L : votés par le Parlement. R et D : décrets du gouvernement."],
];

const base = import.meta.env.BASE_URL;
const files: [string, string][] = [
  [`${base}donnees/scm-hypotheses.csv`, "Hypothèses du modèle de coût"],
  [`${base}donnees/scm-resultats.csv`, "Résultats du modèle de coût"],
  [`${base}donnees/ess-resultats-bruts.md`, "Résultats complets de l'analyse ESS"],
  [`${base}donnees/obligations.csv`, "Les 2 847 obligations extraites (1,4 Mo)"],
  ["https://github.com/TBE-inc/code-du-travail-preuves", "Code et analyses sur GitHub"],
];

const outils: [string, string, string][] = [
  ["obligations/", "Les 2 847 obligations", "Cherchez un mot ou un article, filtrez par thème ou par seuil d'effectif."],
  ["mon-entreprise/", "Ce que le Code coûte à mon entreprise", "Saisissez votre effectif : obligations, heures et coût annuel estimé, et le prix du prochain seuil."],
  ["pays/", "La France face à ses voisins", "Chômage, emploi, règles du licenciement, bien-être : 12 pays et la moyenne de l'Union."],
];

export function Explorer() {
  return (
    <section id="explorer" aria-labelledby="h-explorer">
      <Row>
        <h2 id="h-explorer">Vérifier par vous-même</h2>
        <ul className="brief">
          {outils.map(([href, titre, desc]) => (
            <li key={href}>
              <a href={`${base}${href}`}>
                <strong>{titre}</strong>
                <span className="go">{desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </Row>
    </section>
  );
}

export function Methode() {
  return (
    <section id="methode" aria-labelledby="h-methode">
      <Row>
        <h2 id="h-methode">Méthode et limites</h2>
        <p>Le point de départ est le Code du travail du 8 octobre 2026 : 3 507 pages, 11 572 articles.<Fn id="code" /> Les objectifs (emploi, croissance, pouvoir d'achat, bien-être) et les garde-fous (santé mentale, accidents, inégalités, finances sociales) ont été fixés avant de regarder les preuves. Un programme a repéré 2 847 obligations ; une vérification à la main de 150 articles tirés au sort montre qu'il se trompe environ une fois sur quatre. On a lu 51 études et rapports, y compris ceux qui critiquent la flexibilisation.</p>
        <p><strong>Ce qu'on a corrigé en route :</strong> on voulait réduire la conservation du document de risques, retiré parce qu'elle protège les malades de l'amiante ; la simplification de la forme du licenciement était déjà faite ; la rupture conventionnelle a été rétrogradée à cause de son coût ; un chiffre tiré d'un résumé en ligne a été remplacé par celui de l'étude elle-même.</p>
        <p><strong>Ce qu'on ne sait pas :</strong> le temps réel de plusieurs démarches ; l'effet causal en France, faute de données françaises suffisantes ; les effets de la loi « plein emploi » de 2023. Les études ont été lues de façon ciblée. <strong>Ce n'est pas un avis juridique</strong> : les textes proposés doivent être relus par un juriste.</p>
      </Row>
      <Row>
        <h3>Petit glossaire</h3>
        <dl className="gloss">
          {glossary.map(([t, d]) => (
            <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
          ))}
        </dl>
      </Row>
    </section>
  );
}

export function Sources() {
  return (
    <section id="sources" aria-labelledby="h-sources">
      <Row>
        <h2 id="h-sources">Sources</h2>
        <ol className="src">
          {sources.map((s, i) => (
            <li key={s.id} id={`s${i + 1}`}>
              {s.text} {s.url && <a href={s.url} rel="noopener">{s.label}</a>}
            </li>
          ))}
        </ol>
        <h3>Refaire les calculs</h3>
        <div className="files">
          {files.map(([href, label]) => (
            <a key={href} href={href} rel={href.startsWith("http") ? "noopener" : undefined}>{label}</a>
          ))}
        </div>
      </Row>
    </section>
  );
}
