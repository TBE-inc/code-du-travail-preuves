import { mount, PageHead } from "../components/Layout";
import { Methode, Sources } from "../sections/Fin";

const toc: [string, string][] = [
  ["methode", "Comment on a travaillé"],
  ["glossaire", "Petit glossaire"],
  ["sources", "Les 29 sources"],
  ["fichiers", "Refaire les calculs"],
];

mount(
  "methode",
  <>
    <PageHead
      title="Méthode et sources"
      lede="Comment on a lu le Code, ce qu'on a corrigé en route, ce qu'on ne sait pas, et les 29 sources derrière chaque chiffre."
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
