import { Terme } from "../components/Terme";

const avant: [string, React.ReactNode][] = [
  ["Le Code du travail", <>Il fixe les règles entre employeurs et salariés : embauche, contrats (<Terme id="cdi">CDI</Terme>, <Terme id="cdd">CDD</Terme>), temps de travail, licenciement, représentants du personnel. Il compte 11 572 articles et environ 1,1 million de mots.</>],
  ["Ce que nous avons fait", <>Nous l'avons lu en entier et nous avons chiffré ce que ses démarches coûtent. Puis nous avons confronté chaque idée de réforme à 56 études et aux réponses de 40 000 Européens.</>],
  ["Qui parle", <>Un exercice indépendant, mené avec l'aide d'une intelligence artificielle (Claude). Ce n'est ni un avis juridique, ni une étude relue par des pairs.</>],
  ["Comment lire", <>Chaque bloc pose une question et donne la réponse en titre. Dessous : la preuve, et son degré de solidité. Les mots soulignés en pointillé sont définis au survol ou au toucher.</>],
];

const objectifs: [string, string][] = [
  ["Emploi", "surtout des jeunes, des seniors et des chômeurs de longue durée"],
  ["Pouvoir d'achat", "le revenu du ménage typique"],
  ["Dynamisme des entreprises", "création, croissance, passage des seuils"],
  ["Qualité de vie au travail", "autonomie, sécurité ressentie"],
];
const gardeFous = ["Santé mentale et bien-être", "Sécurité au travail", "Inégalités", "Finances de l'assurance chômage"];

/** Le contexte avant la première question : de quoi on parle, qui parle, selon quels critères. */
export function Contexte() {
  return (
    <>
      <section id="avant" className="band alt" aria-labelledby="h-avant">
        <div className="ctx">
          <div className="stack">
            <h2 id="h-avant">Avant de lire</h2>
            <p className="muted-note">D'où viennent les réponses, en quatre points.</p>
          </div>
          <dl className="ctx-list">
            {avant.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>
      <section id="criteres" className="band sunk" aria-labelledby="h-criteres">
        <div className="stack">
          <h2 id="h-criteres">Nos critères</h2>
          <p className="lede-ink">Une réforme est bonne si elle rend le pays plus prospère et plus heureux, durablement. Nous avons fixé ces critères avant de regarder les preuves.</p>
        </div>
        <div className="crit-grid">
          <div className="crit-box">
            <h3 className="crit-up">Ce qu'on veut améliorer</h3>
            <ul>{objectifs.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}</ul>
          </div>
          <div className="crit-box">
            <h3 className="crit-down">Ce qu'on ne doit pas dégrader</h3>
            <ul>{gardeFous.map((t) => <li key={t}><strong>{t}</strong></li>)}</ul>
          </div>
        </div>
        <p className="crit-rule"><strong>Règle :</strong> une mesure est retenue si elle améliore au moins un objectif sans dégrader aucun garde-fou.</p>
      </section>
    </>
  );
}
