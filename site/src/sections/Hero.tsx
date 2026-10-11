const base = import.meta.env.BASE_URL;

/** Sur une même échelle (milliards d'euros par an) : la facture mesurée, le seuil de 50, nos amendements. */
const MAX = 150;
const lignes: { lab: string; sous: string; bas: number; haut: number; val: string; ton: string }[] = [
  { lab: "La paperasse du Code", sous: "facture mesurée sur 23 démarches", bas: 1.2, haut: 7.3, val: "1,2 à 7,3 Md€", ton: "encre" },
  { lab: "Le seuil de 50 salariés", sous: "estimé, si les salaires ne baissent pas", bas: 120, haut: 150, val: "120 à 150 Md€", ton: "rouge" },
  { lab: "Nos 5 amendements", sous: "économies directes, estimées", bas: 0.1, haut: 0.55, val: "0,1 à 0,55 Md€", ton: "vert" },
];

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-tete">
        <h1>La paperasse du Code du travail coûte 1 à 7 milliards d'euros par an. Le seuil de 50 salariés coûte bien plus.</h1>
        <p className="lede">Nous avons lu ses 11 572 articles et 56 études pour chiffrer ce qui pèse vraiment, et ce qu'on peut changer sans nuire à l'emploi.</p>
      </div>
      <figure className="echelle">
        <figcaption>Par an, en milliards d'euros, sur la même échelle</figcaption>
        {lignes.map((l) => (
          <div key={l.lab} className={`ech-row ${l.ton}`}>
            <p className="ech-lab"><strong>{l.lab}</strong><span>{l.sous}</span></p>
            <span className="ech-trk" aria-hidden="true">
              <span className="ech-bas" style={{ width: `${(l.bas / MAX) * 100}%` }} />
              <span className="ech-haut" style={{ left: `${(l.bas / MAX) * 100}%`, width: `${((l.haut - l.bas) / MAX) * 100}%` }} />
            </span>
            <p className="ech-val">{l.val.replace(/ (?=Md€)/, " ")}</p>
          </div>
        ))}
      </figure>
      <p className="hero-liens">
        <a href="#chomage">Commencer par la question 1</a>
        <a href={`${base}constats/paperasse/#h-audela`}>Voir le calcul complet</a>
      </p>
    </header>
  );
}
