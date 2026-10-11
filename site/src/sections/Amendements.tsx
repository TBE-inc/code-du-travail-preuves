import { Art, Fn } from "../components/ui";
import { amendements } from "../data/amendements";

const base = import.meta.env.BASE_URL;
const verdictLabel = { good: "Gagnant partout", cond: "Sous condition" } as const;

/** Page Propositions : les cinq amendements en cartes, puis les pistes hors du Code. */
export function Amendements() {
  return (
    <>
      <section id="amendements" aria-labelledby="h-amend">
        <div className="stack">
          <h2 id="h-amend">Cinq amendements au Code</h2>
          <p>Chacun est écrit comme un vrai article, après relecture du texte en vigueur. La fiche compare le texte actuel et le texte proposé, et dit qui perd.</p>
        </div>
        <ul className="cards two" style={{ marginTop: 24 }}>
          {amendements.map((a, i) => (
            <li key={a.slug}>
              <a href={`${base}amendements/${a.slug}/`}>
                <span className="meta">Amendement {i + 1}, <Art>{a.article.split(/[ ,]/).find((w) => /^[LRD]\d/.test(w)) ?? ""}</Art></span>
                <strong>{a.titre}</strong>
                <span className="meta-line"><span className={`v-${a.verdict}`}>{verdictLabel[a.verdict]}.</span> {a.gain}.</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="hors-code" aria-labelledby="h-hors">
        <div className="stack">
          <h2 id="h-hors">Hors du Code : l'assurance chômage</h2>
          <p>Les règles d'indemnisation sont négociées par les syndicats et le patronat. Ce sont pourtant les leviers les plus puissants sur le chômage.</p>
        </div>
        <div className="tbl" style={{ marginTop: 16 }}>
          <table className="plain">
            <thead><tr><th>Mesure</th><th>Verdict</th></tr></thead>
            <tbody>
              <tr><td>Tester chaque nouvelle règle sur une partie des chômeurs tirée au sort avant de la généraliser, comme au Danemark,<Fn id="dk" /> et évaluer d'abord les réformes 2021-2026</td><td className="v-good">Gagnant partout</td></tr>
              <tr><td>Accompagnement intensif des chômeurs de longue durée, avec formation<Fn id="ckw" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Exigences de mobilité alignées sur les pays voisins, couplées à cet accompagnement</td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Celui qui licencie paie : bonus-malus étendu au-delà de 7 secteurs, contre moins de contrôle par le juge (<Art>L5422-12</Art>)<Fn id="bt" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Baisser encore les allocations</td><td className="v-no">Non retenu</td></tr>
            </tbody>
          </table>
        </div>
        <dl className="legend">
          <div><dt className="v-good">Gagnant partout</dt><dd>Améliore un objectif sans rien dégrader.</dd></div>
          <div><dt className="v-cond">Sous condition</dt><dd>Gain probable, seulement avec une mesure d'accompagnement.</dd></div>
          <div><dt className="v-no">Non retenu</dt><dd>Non soutenu par les preuves, ou déjà fait.</dd></div>
        </dl>
      </section>
    </>
  );
}
