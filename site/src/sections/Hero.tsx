import { Fn, Row } from "../components/ui";

const folioRows: [string, number, number, number, boolean?][] = [
  ["11 à 24", 1, 10, 10],
  ["25 à 49", 2, 10, 20],
  ["50 à 74", 4, 18, 72, true],
  ["75 à 99", 5, 19, 95],
];

const brief: { href: string; before: string; mark: string; after: string; tag: string }[] = [
  { href: "#chomage", before: "Le chômage pèse ", mark: "cinq fois plus", after: " qu'un CDD sur le bien-être, à revenu égal.", tag: "Données européennes" },
  { href: "#paperasse", before: "La paperasse du Code coûte ", mark: "1 à 7 milliards d'euros par an", after: ", surtout la paie, les risques, le licenciement et le CSE.", tag: "Modèle de coût" },
  { href: "#seuil", before: "Le seuil de 50 salariés freine les entreprises : il faut le ", mark: "lisser, pas le relever", after: ".", tag: "Simulateur" },
  { href: "#licenciement", before: "Faciliter le licenciement ", mark: "ne crée pas d'emplois en soi", after: ", mais rend l'économie plus productive.", tag: "Revue des études" },
  { href: "#assurance", before: "Les leviers les plus puissants sur le chômage sont ", mark: "hors du Code du travail", after: ".", tag: "Assurance chômage" },
];

export function Hero() {
  return (
    <header className="hero">
      <Row wide>
        <h1>Le Code du travail, annoté par les preuves</h1>
        <p className="lede">On a lu ses 11 572 articles, chiffré ce qu'ils coûtent et confronté chaque idée de réforme aux études et aux données. Voici ce qui tient.</p>
        <p className="byline">Exercice indépendant, octobre 2026. Chaque chiffre renvoie à sa source.</p>
      </Row>

      <Row
        style={{ marginTop: 40 }}
        note={
          <>
            <p><strong>Le 50<sup>e</sup> salarié coûte cher.</strong> Le temps de délégation des élus passe d'un coup de 20 à 72 heures par mois, en plus de nouvelles obligations.</p>
            <p>Des économistes ont mesuré l'effet de ce seuil sur toutes les entreprises françaises : il agit comme une <strong>taxe d'environ 1,3 %</strong> sur le travail, et <strong>les salariés en sont les premiers perdants</strong>.<Fn id="garicano" /></p>
          </>
        }
      >
        <div className="folio" aria-label="Extrait de l'article R2314-1 du Code du travail">
          <div className="runhead"><span>Code du travail</span><span>Partie réglementaire</span></div>
          <div className="arttitle">Article R2314-1</div>
          <p>« Le temps mensuel nécessaire à l'exercice de leurs fonctions par les représentants […] est fixé dans les limites d'une durée définie dans le tableau ci-après. »</p>
          <table>
            <thead>
              <tr><th>Effectif</th><th className="r hide-s">Titulaires</th><th className="r hide-s">Heures par titulaire</th><th className="r">Total mensuel</th></tr>
            </thead>
            <tbody>
              {folioRows.map(([eff, tit, h, tot, jump]) => (
                <tr key={eff} className={jump ? "jump" : undefined}>
                  <td>{jump ? <mark className="sweep">{eff}</mark> : eff}</td>
                  <td className="r hide-s">{tit}</td>
                  <td className="r hide-s">{h}</td>
                  <td className="r">{jump ? <mark className="sweep">{tot}</mark> : tot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>

      <Row style={{ marginTop: 56 }}>
        <h2>En bref</h2>
        <ul className="brief">
          {brief.map((b) => (
            <li key={b.href}>
              <a href={b.href}>
                {b.before}<mark>{b.mark}</mark>{b.after}
                <span className="go">{b.tag}</span>
              </a>
            </li>
          ))}
        </ul>
      </Row>
    </header>
  );
}
