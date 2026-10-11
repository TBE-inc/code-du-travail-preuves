import { StrictMode, useEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";
import { Navigation } from "./Navigation";
import { activerDefilementDoux, aimanterBandes } from "./defilement";

const base = import.meta.env.BASE_URL;

export type PageId = "accueil" | "constat" | "propositions" | "outils" | "methode";

const outils: [string, string][] = [
  [`${base}obligations/`, "Les 2 847 obligations"],
  [`${base}mon-entreprise/`, "Ce que coûte le Code à mon entreprise"],
  [`${base}pays/`, "La France et ses voisins"],
];

export function Layout({ page, children }: { page: PageId; children: ReactNode }) {
  useEffect(() => (page === "accueil" ? aimanterBandes() : undefined), [page]);
  return (
    <>
      <Navigation page={page} />
      <div className={`page ${page}`}>
        <main>{children}</main>
        <footer>
          <div className="foot-cols">
            <nav aria-label="Comprendre">
              <p className="foot-h">Comprendre</p>
              <a href={base}>Les cinq questions</a>
              <a href={`${base}propositions/`}>Les propositions</a>
              <a href={`${base}methode/`}>Méthode et sources</a>
            </nav>
            <nav aria-label="Outils">
              <p className="foot-h">Outils</p>
              {outils.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
            </nav>
            <div>
              <p className="foot-h">À propos</p>
              <p>Un exercice indépendant, mené en octobre 2026 avec l'aide d'une intelligence artificielle (Claude), à partir de sources publiques. Ce n'est ni un avis juridique, ni une étude relue par des pairs. Une erreur, un désaccord ? Dites-le sur <a href="https://github.com/TBE-inc/code-du-travail-preuves" rel="noopener">GitHub</a>.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/** Monte une page dans #root. */
export function mount(page: PageId, content: ReactNode) {
  activerDefilementDoux();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Layout page={page}>{content}</Layout>
    </StrictMode>,
  );
}

/** En-tête commun aux pages secondaires. */
export function PageHead({ title, lede, crumb, children }: { title: string; lede: ReactNode; crumb?: ReactNode; children?: ReactNode }) {
  return (
    <header className="hero">
      {crumb && <p className="crumb">{crumb}</p>}
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      {children}
    </header>
  );
}
