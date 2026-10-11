import { Terme } from "../components/Terme";
import { Fil } from "./Insights";

const base = import.meta.env.BASE_URL;

const chiffres: [string, string][] = [
  ["11 572", "articles du Code, lus du premier au dernier"],
  ["1,1 million", "de mots dans ces articles"],
  ["56", "études pour juger chaque idée de réforme"],
  ["40 000", "Européens interrogés sur leur satisfaction de vie"],
];

// Grille de lecture : 03-analyses/preuves-par-levier.md.
const niveaux: [string, string, string][] = [
  ["forte", "Forte", "plusieurs études causales concordantes, ou une méta-analyse"],
  ["moyenne", "Moyenne", "une étude causale solide, ou plusieurs études de qualité inégale"],
  ["faible", "Faible", "corrélations, témoignages, ou résultats contradictoires"],
];

/** Le prologue : ce que nous avons lu, selon quels critères, comment lire la suite, et qui parle. */
export function Contexte() {
  return (
    <section id="prologue" className="band alt" aria-labelledby="h-prologue">
      <div className="prol-tete">
        <p className="chap-sur">Prologue</p>
        <h2 id="h-prologue">Nous avons lu le Code en entier, puis confronté chaque idée aux études</h2>
        <p className="lede-ink">Le Code du travail fixe les règles entre employeurs et salariés : embauche, contrats (<Terme id="cdi">CDI</Terme>, <Terme id="cdd">CDD</Terme>), temps de travail, licenciement, représentants du personnel.</p>
      </div>
      <dl className="prol-chiffres">
        {chiffres.map(([n, d]) => <div key={n}><dt>{n}</dt><dd>{d}</dd></div>)}
      </dl>
      <div className="prol-cols">
        <div className="prol-col">
          <h3>Nos critères, fixés avant les preuves</h3>
          <p><strong className="crit-up">Améliorer :</strong> l'emploi, surtout des jeunes, des seniors et des chômeurs de longue durée. Et aussi le pouvoir d'achat, le dynamisme des entreprises, la qualité de vie au travail.</p>
          <p><strong className="crit-down">Sans dégrader :</strong> la santé mentale, la sécurité au travail, les inégalités, les finances de l'assurance chômage.</p>
        </div>
        <div className="prol-col">
          <h3>Comment lire chaque chapitre</h3>
          <p>La question ouvre le chapitre, la réponse est le titre. Sous le graphique, la solidité de la preuve :</p>
          <dl className="prol-niveaux">
            {niveaux.map(([k, t, d]) => <div key={k}><dt className={`lvl ${k}`}>{t}</dt><dd>{d}</dd></div>)}
          </dl>
          <p>Les mots soulignés en pointillé, comme <Terme id="cdi">CDI</Terme>, sont définis au survol ou au toucher.</p>
        </div>
        <aside className="prol-qui" aria-labelledby="h-qui">
          <h3 id="h-qui">Qui parle</h3>
          <p>Un exercice indépendant, mené avec l'aide d'une intelligence artificielle (Claude).</p>
          <p>Ce n'est ni un avis juridique, ni une étude relue par des pairs. Chaque chiffre renvoie à sa source.</p>
          <a href={`${base}methode/`}>Voir la méthode</a>
        </aside>
      </div>
      <Fil texte="Nous commençons par ce qui pèse le plus sur la vie des gens : l'emploi." vers="#chomage" suite="Chapitre 1 : L'emploi d'abord" />
    </section>
  );
}
