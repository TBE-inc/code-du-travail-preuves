import { mount, PageHead } from "../components/Layout";
import { Methode, Sources } from "../sections/Fin";

const toc: [string, string][] = [
  ["methode", "Comment nous avons travaillé"],
  ["glossaire", "Les mots du droit du travail"],
  ["sources", "Les 35 sources"],
  ["fichiers", "Refaire nos calculs"],
];

mount(
  "methode",
  <>
    <PageHead
      title="Méthode et sources"
      lede="Comment nous avons lu le Code, ce que nous avons corrigé en route, ce que nous ne savons pas. Et les 35 sources derrière chaque chiffre."
    />
    <div className="doc">
      <nav className="toc" aria-label="Sommaire">
        <p className="foot-h">Sommaire</p>
        <ol>{toc.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ol>
      </nav>
      <div className="doc-body">
        <Methode />
        <Sources />
      </div>
    </div>
  </>,
);
