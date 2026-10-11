import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const base = import.meta.env.BASE_URL;

export type PageId = "accueil" | "amendements" | "obligations" | "entreprise" | "pays";

const nav: { id: PageId; href: string; label: string }[] = [
  { id: "accueil", href: base, label: "Le constat" },
  { id: "amendements", href: `${base}#amendements`, label: "Les amendements" },
  { id: "obligations", href: `${base}obligations/`, label: "Les 2 847 obligations" },
  { id: "entreprise", href: `${base}mon-entreprise/`, label: "Mon entreprise" },
  { id: "pays", href: `${base}pays/`, label: "La France et ses voisins" },
  { id: "accueil", href: `${base}#sources`, label: "Sources" },
];

export function Layout({ page, children }: { page: PageId; children: ReactNode }) {
  return (
    <>
      <nav className="toc" aria-label="Pages du site">
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} aria-current={n.id === page && !n.href.includes("#") ? "page" : undefined}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="page">
        <main>{children}</main>
        <footer>
          <p>Le Code du travail, annoté par les preuves. Exercice de pensée indépendant, octobre 2026, réalisé avec l'assistance d'une intelligence artificielle (Claude) à partir de sources publiques vérifiables.</p>
          <p>Ni avis juridique, ni étude relue par des pairs. Les contestations sont bienvenues sur <a href="https://github.com/TBE-inc/code-du-travail-preuves" rel="noopener">GitHub</a>.</p>
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
export function PageHead({ title, lede, children }: { title: string; lede: ReactNode; children?: ReactNode }) {
  return (
    <header className="hero">
      <div className="row">
        <div className="main wide">
          <p className="byline"><a href={base}>Le Code du travail, annoté par les preuves</a></p>
          <h1 className="h1-sub">{title}</h1>
          <p className="lede">{lede}</p>
          {children}
        </div>
      </div>
    </header>
  );
}
