import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { constats } from "../data/constats";
import type { PageId } from "./Layout";
import { useGlisser } from "./useGlisser";

const base = import.meta.env.BASE_URL;

type Etape = { id: string; n: string; label: string; href: string };

const pages: { href: string; label: string; sous?: boolean }[] = [
  { href: base, label: "Constats" },
  { href: `${base}propositions/`, label: "Propositions" },
  { href: `${base}obligations/`, label: "Les 2 847 obligations", sous: true },
  { href: `${base}mon-entreprise/`, label: "Ce que coûte le Code à mon entreprise", sous: true },
  { href: `${base}pays/`, label: "La France et ses voisins", sous: true },
  { href: `${base}methode/`, label: "Méthode et sources" },
];

function etapes(accueil: boolean): Etape[] {
  return [
    { id: "avant", n: "", label: "Avant de lire", href: `${accueil ? "" : base}#avant` },
    ...constats.map((c, i) => ({ id: c.id, n: String(i + 1), label: c.court, href: accueil ? `#${c.id}` : `${base}constats/${c.id}/` })),
    { id: "propositions", n: String(constats.length + 1), label: "Que changer", href: accueil ? "#propositions" : `${base}propositions/` },
    { id: "resume", n: "✓", label: "En résumé", href: `${accueil ? "" : base}#resume` },
  ];
}

/** Étape active : suivie au défilement sur l'accueil, déduite de la page ailleurs. */
function useEtapeActive(page: PageId, liste: Etape[]) {
  const initiale = page === "constat" ? document.getElementById("root")?.dataset.slug ?? null : page === "propositions" ? "propositions" : null;
  const [actif, setActif] = useState<string | null>(initiale);
  useEffect(() => {
    if (page !== "accueil") return;
    const sections = liste.map((e) => document.getElementById(e.id)).filter((x): x is HTMLElement => !!x);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActif(vis[0].target.id);
        else if (window.scrollY < (sections[0]?.offsetTop ?? 0) - 200) setActif(null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [page, liste]);
  return actif;
}

// Ouverture : ressort court et amorti, contenu en léger décalé. Fermeture : plus rapide, sans rebond.
const panneau: Variants = {
  ferme: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } },
  ouvert: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 520, damping: 38, mass: 0.8, staggerChildren: 0.016, delayChildren: 0.03 } },
};
const element: Variants = {
  ferme: { opacity: 0, y: 4, transition: { duration: 0.08 } },
  ouvert: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 600, damping: 40 } },
};

/** Icône menu : les deux traits extérieurs pivotent en croix, celui du milieu s'efface. */
function IconeMenu({ ouvert }: { ouvert: boolean }) {
  const t = { type: "spring" as const, stiffness: 520, damping: 32 };
  return (
    <span className="ico-menu" aria-hidden="true">
      <motion.span initial={false} animate={ouvert ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span initial={false} animate={{ opacity: ouvert ? 0 : 1, scaleX: ouvert ? 0.2 : 1 }} transition={{ duration: 0.12 }} />
      <motion.span initial={false} animate={ouvert ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </span>
  );
}

/** Navigation unique du site : une capsule flottante avec le menu des pages et les étapes du parcours. */
export function Navigation({ page }: { page: PageId }) {
  const accueil = page === "accueil";
  const [liste] = useState(() => etapes(accueil));
  const actif = useEtapeActive(page, liste);
  const [ouvert, setOuvert] = useState(false);
  const racine = useRef<HTMLDivElement>(null);
  const rangee = useRef<HTMLOListElement>(null);
  useGlisser(rangee);
  const panneauId = useId();
  const chemin = location.pathname;
  const courante = actif ? liste.find((e) => e.id === actif) : undefined;

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: Event) => {
      if (e.type === "keydown" ? (e as KeyboardEvent).key === "Escape" : !racine.current?.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("click", fermer);
    document.addEventListener("keydown", fermer);
    return () => { document.removeEventListener("click", fermer); document.removeEventListener("keydown", fermer); };
  }, [ouvert]);

  // Garde l'étape active visible dans la rangée, sans faire bouger la page.
  useEffect(() => {
    const ol = rangee.current, a = ol?.querySelector<HTMLElement>("a[aria-current]");
    if (ol && a && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.offsetLeft - (ol.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
  }, [actif]);

  const lienEtape = (e: Etape, inPanel = false) => (
    <a href={e.href} aria-current={actif === e.id ? "step" : undefined} onClick={() => inPanel && setOuvert(false)}>
      {e.n && e.n !== "✓" && <span className="rn">{e.n}</span>}
      {e.label}
    </a>
  );

  return (
    <MotionConfig reducedMotion="user">
    <nav className="capsule-wrap" aria-label="Navigation">
      <div className="cap-anchor" ref={racine}>
      <div className="capsule">
        <button type="button" className="cap-menu" aria-expanded={ouvert} aria-controls={panneauId} onClick={() => setOuvert(!ouvert)}>
          <IconeMenu ouvert={ouvert} />
          Menu
        </button>
        <span className="cap-sep" aria-hidden="true" />
        <ol className="cap-steps" ref={rangee} aria-label="Le parcours">
          {liste.map((e) => <li key={e.id}>{lienEtape(e)}</li>)}
        </ol>
        <button type="button" className="cap-current" aria-expanded={ouvert} aria-controls={panneauId} onClick={() => setOuvert(!ouvert)}>
          {courante ? <>{courante.n && courante.n !== "✓" && <span className="rn">{courante.n}</span>}{courante.label}<span className="cap-count">{liste.indexOf(courante) + 1}/{liste.length}</span></> : <>Le parcours<span className="cap-count">{liste.length} étapes</span></>}
        </button>
      </div>
      <AnimatePresence>
        {ouvert && (
          <motion.div className="cap-panel" id={panneauId} variants={panneau} initial="ferme" animate="ouvert" exit="ferme">
            <div className="cap-group cap-group-steps">
              <motion.p className="cap-h" variants={element}>Le parcours</motion.p>
              <ol>{liste.map((e) => <motion.li key={e.id} variants={element}>{lienEtape(e, true)}</motion.li>)}</ol>
            </div>
            <div className="cap-group">
              <motion.p className="cap-h" variants={element}>Le site</motion.p>
              <ul>
                {pages.map((p) => (
                  <motion.li key={p.href} className={p.sous ? "sous" : undefined} variants={element}>
                    <a href={p.href} aria-current={chemin === p.href || (p.href === base && page === "constat") ? "page" : undefined} onClick={() => setOuvert(false)}>{p.label}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
    </MotionConfig>
  );
}
