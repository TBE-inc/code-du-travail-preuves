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
          <p>Chacun est rédigé comme un vrai article, à partir du texte en vigueur. Chaque fiche met côte à côte le texte actuel et le texte proposé, et dit qui y perd.</p>
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
          <p>Les syndicats et le patronat négocient les règles d'indemnisation, hors du Code. C'est pourtant là que se trouvent les leviers les plus efficaces contre le chômage.</p>
        </div>
        <div className="tbl" style={{ marginTop: 16 }}>
          <table className="plain">
            <thead><tr><th>Mesure</th><th>Verdict</th></tr></thead>
            <tbody>
              <tr><td>Évaluer les réformes de 2021 à 2026. Puis tester chaque nouvelle règle sur des chômeurs tirés au sort avant de la généraliser, comme au Danemark<Fn id="dk" /></td><td className="v-good">Gagnant partout</td></tr>
              <tr><td>Accompagner de près les chômeurs de longue durée, avec de la formation<Fn id="ckw" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Aligner les exigences de mobilité sur celles des pays voisins, avec cet accompagnement</td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Faire payer à celui qui licencie le coût qu'il fait porter à l'assurance chômage, au-delà des 7 secteurs actuels. En échange, le juge contrôle moins le motif (<Art>L5422-12</Art>)<Fn id="bt" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Baisser encore les allocations</td><td className="v-no">Non retenu</td></tr>
            </tbody>
          </table>
        </div>
        <dl className="legend">
          <div><dt className="v-good">Gagnant partout</dt><dd>Améliore au moins un objectif et ne dégrade aucun garde-fou.</dd></div>
          <div><dt className="v-cond">Sous condition</dt><dd>Gain probable, à condition d'y ajouter une mesure d'accompagnement.</dd></div>
          <div><dt className="v-no">Non retenu</dt><dd>Les preuves ne le soutiennent pas, ou c'est déjà fait.</dd></div>
        </dl>
      </section>
    </>
  );
}
