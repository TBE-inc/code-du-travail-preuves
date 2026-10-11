const folioRows: [string, number, number, number, boolean?][] = [
  ["11 à 24", 1, 10, 10],
  ["25 à 49", 2, 10, 20],
  ["50 à 74", 4, 18, 72, true],
  ["75 à 99", 5, 19, 95],
];

export function Hero() {
  return (
    <header className="hero">
      <h1>Le Code du travail, annoté par les preuves</h1>
      <p className="lede">On a lu ses 11 572 articles et confronté chaque idée de réforme aux études. Cinq constats, trois minutes.</p>

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
          Au 50<sup>e</sup> salarié, les heures payées aux élus passent d'un coup de 20 à 72 par mois.
        </figcaption>
      </figure>

    </header>
  );
}
