import { Fn } from "../components/ui";

const folioRows: [string, number, number, number, boolean?][] = [
  ["11 à 24", 1, 10, 10],
  ["25 à 49", 2, 10, 20],
  ["50 à 74", 4, 18, 72, true],
  ["75 à 99", 5, 19, 95],
];

export const constats: { id: string; titre: string }[] = [
  { id: "chomage", titre: "Le chômage pèse cinq fois plus qu'un CDD sur le bien-être" },
  { id: "paperasse", titre: "La paperasse coûte 1 à 7 milliards par an, mais pas là où on le croit" },
  { id: "seuil", titre: "Le seuil de 50 salariés freine les entreprises : il faut le lisser" },
  { id: "licenciement", titre: "Faciliter le licenciement ne crée pas d'emplois en soi" },
  { id: "assurance", titre: "Les vrais leviers sur le chômage sont hors du Code du travail" },
];

export function Hero() {
  return (
    <header className="hero">
      <h1>Le Code du travail, annoté par les preuves</h1>
      <p className="lede">On a lu ses 11 572 articles, chiffré ce qu'ils coûtent et confronté chaque idée de réforme aux études. Voici ce qui tient.</p>

      <figure style={{ marginTop: 16 }}>
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
        <figcaption>
          Au 50<sup>e</sup> salarié, le temps payé aux élus passe d'un coup de 20 à 72 heures par mois. Mesuré sur toutes les entreprises françaises, ce seuil agit comme une taxe d'environ 1,3 % sur le travail, payée surtout par les salariés.<Fn id="garicano" />
        </figcaption>
      </figure>

      <nav aria-label="Les cinq constats" style={{ marginTop: 16 }}>
        <ol className="summary">
          {constats.map((c) => (
            <li key={c.id}><a href={`#${c.id}`}>{c.titre}</a></li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
