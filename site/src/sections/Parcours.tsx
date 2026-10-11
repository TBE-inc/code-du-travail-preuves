import { useEffect, useRef, useState } from "react";
import { constats } from "../data/constats";

const etapes: { id: string; n: string; label: string }[] = [
  ...constats.map((c, i) => ({ id: c.id, n: String(i + 1), label: c.court })),
  { id: "propositions", n: String(constats.length + 1), label: "Que changer" },
  { id: "resume", n: "✓", label: "En résumé" },
];

/** Capsule flottante du parcours : reste en haut au défilement, met en avant l'étape en cours. */
export function Parcours() {
  const [actif, setActif] = useState<string | null>(null);
  const capsule = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sections = etapes.map((e) => document.getElementById(e.id)).filter((x): x is HTMLElement => !!x);
    const obs = new IntersectionObserver(
      (entries) => {
        const visibles = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibles[0]) setActif(visibles[0].target.id);
        else if (window.scrollY < (sections[0]?.offsetTop ?? 0) - 200) setActif(null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Sur mobile, garde l'étape active visible dans la capsule, sans faire bouger la page.
  useEffect(() => {
    const ol = capsule.current;
    const li = ol?.querySelector<HTMLElement>("a[aria-current]");
    if (!ol || !li) return;
    ol.scrollTo({ left: li.offsetLeft - (ol.clientWidth - li.offsetWidth) / 2, behavior: "smooth" });
  }, [actif]);

  return (
    <nav className="parcours" aria-label="Le parcours">
      <ol ref={capsule}>
        {etapes.map((e) => (
          <li key={e.id} className={e.n === "✓" ? "end" : undefined}>
            <a href={`#${e.id}`} aria-current={actif === e.id ? "step" : undefined}>
              <span className="rn">{e.n}</span>
              {e.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
