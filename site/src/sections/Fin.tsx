import { Fn, Row } from "../components/ui";
import { sources } from "../data/sources";
import { glossaire } from "../data/glossaire";
import { amendements } from "../data/amendements";
import { constats } from "../data/constats";
import { BlockHead } from "./Insights";


const base = import.meta.env.BASE_URL;
const files: [string, string][] = [
  [`${base}donnees/scm-hypotheses.csv`, "Hypothèses du modèle de coût"],
  [`${base}donnees/scm-resultats.csv`, "Résultats du modèle de coût"],
  [`${base}donnees/effets-indirects-resultats.csv`, "Effets indirects : production immobilisée, contentieux, PIB, seuils"],
  [`${base}donnees/ess-resultats-bruts.md`, "Résultats complets de l'analyse ESS"],
  [`${base}donnees/obligations.csv`, "Les 2 847 obligations extraites (1,4 Mo)"],
  ["https://github.com/TBE-inc/code-du-travail-preuves", "Code et analyses sur GitHub"],
];

const outils: [string, string, string][] = [
  ["obligations/", "Les 2 847 obligations", "Cherchez un mot ou un article. Filtrez par thème ou par nombre de salariés."],
  ["mon-entreprise/", "Ce que le Code coûte à mon entreprise", "Indiquez votre nombre de salariés : heures et coût par an, et ce que coûtera le prochain seuil."],
  ["pays/", "La France face à ses voisins", "Chômage, emploi, règles de licenciement, bien-être : la France comparée à 12 pays européens."],
];

/** Bandeau 6 : ce qu'on propose. */
export function Propositions() {
  return (
    <section id="propositions" className="band sunk" aria-labelledby="h-prop">
      <div className="band-head">
        <BlockHead n={constats.length + 1} q="Que changer dans le Code ?" />
        <h2 id="h-prop">Cinq amendements, avec pour chacun ce qu'il rapporte et qui y perd</h2>
      </div>
      <ul className="cards">
        {amendements.map((a) => (
          <li key={a.slug}>
            <a href={`${base}amendements/${a.slug}/`}>
              <span className={`v-${a.verdict}`}>{a.verdict === "good" ? "Gagnant partout" : "Sous condition"}</span>
              <strong>{a.titre}</strong>
              <span className="meta-line">{a.gain}.</span>
            </a>
          </li>
        ))}
        <li className="go"><a href={`${base}propositions/`}>Comparer les cinq, et les pistes hors du Code</a></li>
      </ul>
    </section>
  );
}

/** Fin du parcours : la conclusion, les limites, et où vérifier. */
export function Resume() {
  return (
    <section id="resume" className="band alt end" aria-labelledby="h-resume">
      <div className="fin-grid">
        <div className="stack">
          <h2 id="h-resume">En résumé</h2>
          <ol className="resume-list">
            <li>Perdre son emploi pèse cinq fois plus sur le bonheur qu'un contrat précaire. Une réforme se juge d'abord à l'emploi.</li>
            <li>La paperasse du Code coûte 1 à 7 milliards d'euros par an. Le seuil de 50 salariés peut coûter bien plus : jusqu'à 4 à 5 % du PIB.</li>
            <li>Faciliter le licenciement rend les entreprises plus productives, sans créer d'emplois. Cela ne vaut qu'avec une aide réelle à ceux qui perdent leur poste.</li>
            <li>Le levier le plus efficace contre le chômage est hors du Code : accompagner les chômeurs de longue durée.</li>
          </ol>
        </div>
        <div className="limits">
          <h3>Ce que nous ne savons pas</h3>
          <ul className="plainlist">
            <li>Le temps réellement passé sur plusieurs démarches : il est estimé.</li>
            <li>L'effet propre de chaque règle en France : les données françaises manquent.</li>
            <li>La solidité juridique de nos textes : un juriste doit les relire.</li>
          </ul>
        </div>
      </div>
      <h3 id="outils" className="band-sub">Vérifier par vous-même</h3>
      <ul className="cards four">
        {outils.map(([href, titre, desc]) => (
          <li key={href}>
            <a href={`${base}${href}`}>
              <strong>{titre}</strong>
              <span className="meta-line">{desc}</span>
            </a>
          </li>
        ))}
        <li><a href={`${base}methode/`}><strong>Méthode et 35 sources</strong><span className="meta-line">Comment nous avons travaillé, et ce que nous avons corrigé en route.</span></a></li>
      </ul>
    </section>
  );
}

export function Methode() {
  return (
    <section id="methode" aria-labelledby="h-methode">
      <Row>
        <h2 id="h-methode">Comment nous avons travaillé</h2>
        <p>Le point de départ est le Code du travail du 8 octobre 2026 : 3 507 pages, 11 572 articles.<Fn id="code" /> Nous avons fixé les objectifs et les garde-fous avant de regarder les preuves.</p>
        <p>Un programme a repéré 2 847 obligations faites aux employeurs. Nous l'avons vérifié à la main sur 150 articles tirés au sort : il se trompe environ une fois sur quatre.</p>
        <p>Nous avons lu 56 études et rapports, y compris ceux qui critiquent la flexibilité du travail.</p>
        <p><strong>Ce que nous avons corrigé en route.</strong> Nous voulions raccourcir la conservation du document de risques : nous y avons renoncé, car elle protège les malades de l'amiante. La forme du licenciement avait déjà été simplifiée en 2017. La rupture conventionnelle est passée de « gagnant partout » à « sous condition », à cause de son coût pour l'assurance chômage. Un chiffre tiré d'un résumé en ligne a été remplacé par celui de l'étude elle-même.</p>
        <p><strong>Ce que nous ne savons pas.</strong> Le temps réellement passé sur plusieurs démarches. L'effet propre de chaque règle en France, faute de données françaises suffisantes. Les effets de la loi « plein emploi » de 2023. Les études ont été lues de façon ciblée, pas intégralement.</p>
        <p><strong>Ce n'est pas un avis juridique.</strong> Un juriste en droit du travail doit relire les textes proposés.</p>
      </Row>
      <Row>
        <h2 id="glossaire">Les mots du droit du travail</h2>
        <dl className="gloss">
          {glossaire.map(({ terme: t, definition: d }) => (
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
        <h2 id="fichiers">Refaire nos calculs</h2>
        <div className="files">
          {files.map(([href, label]) => (
            <a key={href} href={href} rel={href.startsWith("http") ? "noopener" : undefined}>{label}</a>
          ))}
        </div>
      </Row>
    </section>
  );
}
