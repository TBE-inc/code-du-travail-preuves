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
  [`${base}donnees/ess-resultats-bruts.md`, "Résultats complets de l'analyse ESS"],
  [`${base}donnees/obligations.csv`, "Les 2 847 obligations extraites (1,4 Mo)"],
  ["https://github.com/TBE-inc/code-du-travail-preuves", "Code et analyses sur GitHub"],
];

const outils: [string, string, string][] = [
  ["obligations/", "Les 2 847 obligations", "Cherchez un mot ou un article, filtrez par thème ou par seuil d'effectif."],
  ["mon-entreprise/", "Ce que le Code coûte à mon entreprise", "Saisissez votre effectif : obligations, heures et coût annuel estimé, et le prix du prochain seuil."],
  ["pays/", "La France face à ses voisins", "Chômage, emploi, règles du licenciement, bien-être : 12 pays et la moyenne de l'Union."],
];

/** Bandeau 6 : ce qu'on propose. */
export function Propositions() {
  return (
    <section id="propositions" className="band sunk" aria-labelledby="h-prop">
      <div className="band-head">
        <BlockHead n={constats.length + 1} q="Que changer dans le Code ?" />
        <h2 id="h-prop">Cinq amendements, chacun avec ses perdants et ses garde-fous</h2>
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
            <li>Le chômage fait bien plus de mal que la précarité. Une réforme se juge d'abord à l'emploi.</li>
            <li>La paperasse coûte cher, surtout la paie et les seuils. Une partie peut baisser sans toucher aux protections.</li>
            <li>Faciliter le licenciement n'est utile qu'avec une vraie sécurité de transition.</li>
            <li>Les leviers les plus forts sont hors du Code : l'accompagnement des chômeurs.</li>
          </ol>
        </div>
        <div className="limits">
          <h3>Ce qu'on ne sait pas</h3>
          <ul className="plainlist">
            <li>Le temps réel passé sur plusieurs démarches : il est estimé.</li>
            <li>L'effet causal en France : les données françaises manquent.</li>
            <li>La valeur juridique des textes proposés : ils doivent être relus par un juriste.</li>
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
        <li><a href={`${base}methode/`}><strong>Méthode et 29 sources</strong><span className="meta-line">Comment on a travaillé, ce qu'on a corrigé en route.</span></a></li>
      </ul>
    </section>
  );
}

export function Methode() {
  return (
    <section id="methode" aria-labelledby="h-methode">
      <Row>
        <h2 id="h-methode">Comment on a travaillé</h2>
        <p>Le point de départ est le Code du travail du 8 octobre 2026 : 3 507 pages, 11 572 articles.<Fn id="code" /> Les objectifs (emploi, croissance, pouvoir d'achat, bien-être) et les garde-fous (santé mentale, accidents, inégalités, finances sociales) ont été fixés avant de regarder les preuves. Un programme a repéré 2 847 obligations ; une vérification à la main de 150 articles tirés au sort montre qu'il se trompe environ une fois sur quatre. On a lu 51 études et rapports, y compris ceux qui critiquent la flexibilisation.</p>
        <p><strong>Ce qu'on a corrigé en route :</strong> on voulait réduire la conservation du document de risques, retiré parce qu'elle protège les malades de l'amiante ; la simplification de la forme du licenciement était déjà faite ; la rupture conventionnelle a été rétrogradée à cause de son coût ; un chiffre tiré d'un résumé en ligne a été remplacé par celui de l'étude elle-même.</p>
        <p><strong>Ce qu'on ne sait pas :</strong> le temps réel de plusieurs démarches ; l'effet causal en France, faute de données françaises suffisantes ; les effets de la loi « plein emploi » de 2023. Les études ont été lues de façon ciblée. <strong>Ce n'est pas un avis juridique</strong> : les textes proposés doivent être relus par un juriste.</p>
      </Row>
      <Row>
        <h2 id="glossaire">Petit glossaire</h2>
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
        <h2 id="fichiers">Refaire les calculs</h2>
        <div className="files">
          {files.map(([href, label]) => (
            <a key={href} href={href} rel={href.startsWith("http") ? "noopener" : undefined}>{label}</a>
          ))}
        </div>
      </Row>
    </section>
  );
}
