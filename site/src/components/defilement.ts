import { animate } from "framer-motion";

// Défilement doux vers les ancres de la page. Glissement normal par défaut ; si le système demande
// moins d'animations, un glissement bref plutôt qu'un saut (choix validé avec le propriétaire du site).
let enCours: ReturnType<typeof animate> | null = null;

export function defilerVers(cible: HTMLElement, hash: string) {
  const marge = parseFloat(getComputedStyle(cible).scrollMarginTop) || 0;
  const depart = window.scrollY;
  const arrivee = Math.max(0, Math.min(cible.getBoundingClientRect().top + depart - marge, document.documentElement.scrollHeight - innerHeight));
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const distance = Math.abs(arrivee - depart);
  const duree = reduit ? 0.25 : Math.min(0.9, 0.35 + distance / 6000);
  enCours?.stop();
  enCours = animate(depart, arrivee, { duration: duree, ease: [0.22, 1, 0.36, 1], onUpdate: (y) => window.scrollTo(0, y) });
  history.pushState(null, "", hash);
  const stop = () => { enCours?.stop(); window.removeEventListener("wheel", stop); window.removeEventListener("touchstart", stop); };
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });
}

/** Intercepte les clics sur les liens internes à la page (#section ou /chemin/#section de la page courante). */
export function activerDefilementDoux() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const cible = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!cible) return;
    e.preventDefault();
    defilerVers(cible, url.hash);
  });
}
