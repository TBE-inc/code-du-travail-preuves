const base = import.meta.env.BASE_URL;

const lignes: [string, string, string][] = [
  ["jusqu'à 9,2 Md€", "de production perdue chaque année, si l'on compte ce que ce temps aurait produit", ""],
  ["4 à 5 % du PIB", "perdus à cause du seuil de 50 salariés, si les salaires ne baissent pas", "down"],
  ["100 à 550 M€", "d'économies par an avec nos 5 amendements, et 0,16 à 1,1 Md€ de PIB en plus à terme", "up"],
];

/** Les chiffres qui comptent : la facture mesurée, puis ce qu'elle empêche et ce qu'on peut récupérer. */
function Chiffres() {
  return (
    <div className="chiffres">
      <p className="chiffres-intro">Chaque année, la paperasse imposée par le Code du travail coûte aux entreprises</p>
      <p className="chiffres-total"><span>1,2 à 7,3&nbsp;milliards&nbsp;€</span></p>
      <p className="meta">Mesuré sur 23 démarches, selon la méthode de l'OCDE et de l'Union européenne.</p>
      <dl className="chiffres-lignes">
        {lignes.map(([v, d, ton]) => (
          <div key={v}><dt className={ton}>{v}</dt><dd>{d}</dd></div>
        ))}
      </dl>
      <a className="more-link" href={`${base}constats/paperasse/#h-audela`}>Voir le calcul complet</a>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <header className="hero">
        <div className="stack">
          <h1>Le Code du travail, annoté par les preuves</h1>
          <p className="lede">Peut-on alléger le Code du travail sans nuire à l'emploi ni au bien-être ? Nous avons lu ses 11 572 articles et 56 études pour répondre.</p>
          <p className="hero-meta">Cinq questions, une réponse sourcée pour chacune, puis nos propositions.</p>
        </div>
        <Chiffres />
      </header>
    </>
  );
}
