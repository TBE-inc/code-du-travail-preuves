import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const base = import.meta.env.BASE_URL;

export type PageId = "accueil" | "propositions" | "outils" | "methode";

const nav: { id: PageId; href: string; label: string }[] = [
  { id: "propositions", href: `${base}propositions/`, label: "Propositions" },
  { id: "outils", href: `${base}#outils`, label: "Outils" },
  { id: "methode", href: `${base}methode/`, label: "Méthode" },
];

export function Layout({ page, children }: { page: PageId; children: ReactNode }) {
  return (
    <>
      <nav className="nav" aria-label="Pages du site">
        <div className="nav-inner">
          <a className="nav-brand" href={base}>Le Code du travail, annoté</a>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={n.id === page ? "page" : undefined}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="page">
        <main>{children}</main>
        <footer>
          <nav aria-label="Toutes les pages">
            <a href={base}>Le constat</a>
            <a href={`${base}propositions/`}>Propositions</a>
            <a href={`${base}obligations/`}>Les 2 847 obligations</a>
            <a href={`${base}mon-entreprise/`}>Mon entreprise</a>
            <a href={`${base}pays/`}>La France et ses voisins</a>
            <a href={`${base}methode/`}>Méthode et sources</a>
          </nav>
          <p>Exercice de pensée indépendant, octobre 2026, réalisé avec l'assistance d'une intelligence artificielle (Claude) à partir de sources publiques vérifiables. Ni avis juridique, ni étude relue par des pairs. Contestations bienvenues sur <a href="https://github.com/TBE-inc/code-du-travail-preuves" rel="noopener">GitHub</a>.</p>
        </footer>
      </div>
    </>
  );
}

/** Monte une page dans #root. */
export function mount(page: PageId, content: ReactNode) {
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
