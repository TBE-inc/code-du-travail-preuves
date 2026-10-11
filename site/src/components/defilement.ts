import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Défilement doux de toute la page (molette, pavé tactile) et des ancres. Gardé même si le système demande
// moins d'animations, en plus bref (choix validé avec le propriétaire du site). Le toucher reste natif.
const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis: Lenis | null = null;

export function defilerVers(cible: HTMLElement, hash: string) {
  const marge = parseFloat(getComputedStyle(cible).scrollMarginTop) || 0;
  const depart = window.scrollY;
  const arrivee = cible.getBoundingClientRect().top + depart - marge;
  const duree = reduit ? 0.25 : Math.min(0.9, 0.35 + Math.abs(arrivee - depart) / 6000);
  lenis?.scrollTo(arrivee, { duration: duree, easing: (t) => 1 - Math.pow(1 - t, 4) });
  history.pushState(null, "", hash);
}

/** Lance le défilement doux et intercepte les clics sur les liens internes à la page. */
export function activerDefilementDoux() {
  lenis = new Lenis({ lerp: reduit ? 0.14 : 0.1, autoRaf: true, allowNestedScroll: true, respectReducedMotion: false });
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
