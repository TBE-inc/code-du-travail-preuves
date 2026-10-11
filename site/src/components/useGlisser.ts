import { useEffect, type RefObject } from "react";
import { animate } from "framer-motion";

/**
 * Glisser pour défiler une rangée horizontale à la souris, avec inertie au lâcher.
 * Le toucher garde le défilement natif. Un glissement de plus de 4 px annule le clic sur le lien.
 * La molette verticale fait défiler la rangée tant qu'elle n'est pas en butée.
 */
export function useGlisser(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let depart = 0, scrollDepart = 0, glisse = false, actif = false;
    let echantillons: { x: number; t: number }[] = [];
    let inertie: ReturnType<typeof animate> | null = null;
    const deborde = () => el.scrollWidth > el.clientWidth + 1;

    const majBords = () => {
      el.classList.toggle("bord-g", el.scrollLeft > 2);
      el.classList.toggle("bord-d", el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
      el.classList.toggle("glissable", deborde());
    };

    const bas = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || !deborde()) return;
      inertie?.stop();
      actif = true; glisse = false; depart = e.clientX; scrollDepart = el.scrollLeft;
      echantillons = [{ x: e.clientX, t: e.timeStamp }];
    };
    const bouge = (e: PointerEvent) => {
      if (!actif) return;
      const dx = e.clientX - depart;
      if (!glisse && Math.abs(dx) > 4) { glisse = true; el.setPointerCapture(e.pointerId); el.classList.add("en-glisse"); }
      if (!glisse) return;
      el.scrollLeft = scrollDepart - dx;
      echantillons.push({ x: e.clientX, t: e.timeStamp });
      if (echantillons.length > 5) echantillons.shift();
    };
    const haut = (e: PointerEvent) => {
      if (!actif) return;
      actif = false;
      el.classList.remove("en-glisse");
      if (!glisse) return;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      const a = echantillons[0], b = echantillons[echantillons.length - 1];
      const v = a && b && b.t > a.t ? ((a.x - b.x) / (b.t - a.t)) * 1000 : 0;
      if (Math.abs(v) > 50 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const max = el.scrollWidth - el.clientWidth;
        inertie = animate(el.scrollLeft, el.scrollLeft, { type: "inertia", velocity: v, power: 0.35, timeConstant: 240, min: 0, max, bounceStiffness: 400, bounceDamping: 40, onUpdate: (x) => { el.scrollLeft = x; } });
      }
    };
    // Après un glissement, le clic qui suit ne doit pas suivre le lien.
    const clic = (e: MouseEvent) => {
      if (glisse) { e.preventDefault(); e.stopPropagation(); glisse = false; }
    };
    const molette = (e: WheelEvent) => {
      if (!deborde() || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max)) return;
      e.preventDefault();
      inertie?.stop();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("pointerdown", bas);
    el.addEventListener("pointermove", bouge);
    el.addEventListener("pointerup", haut);
    el.addEventListener("pointercancel", haut);
    el.addEventListener("click", clic, true);
    el.addEventListener("wheel", molette, { passive: false });
    el.addEventListener("scroll", majBords, { passive: true });
    const ro = new ResizeObserver(majBords); ro.observe(el);
    majBords();
    return () => {
      inertie?.stop(); ro.disconnect();
      el.removeEventListener("pointerdown", bas); el.removeEventListener("pointermove", bouge);
      el.removeEventListener("pointerup", haut); el.removeEventListener("pointercancel", haut);
      el.removeEventListener("click", clic, true); el.removeEventListener("wheel", molette);
      el.removeEventListener("scroll", majBords);
    };
  }, [ref]);
}
