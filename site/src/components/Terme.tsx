import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { termeParId } from "../data/glossaire";

/** Mot du jargon : définition au survol ou au focus (ordinateur), au tap (mobile). */
export function Terme({ id, children }: { id: string; children: ReactNode }) {
  const t = termeParId[id];
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const bulle = useId();
  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: Event) => {
      if (e.type === "keydown" ? (e as KeyboardEvent).key === "Escape" : !ref.current?.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener("click", fermer);
    document.addEventListener("keydown", fermer);
    return () => { document.removeEventListener("click", fermer); document.removeEventListener("keydown", fermer); };
  }, [ouvert]);
  if (!t) return <>{children}</>;
  return (
    <span className={`terme${ouvert ? " ouvert" : ""}`} ref={ref}>
      <button type="button" aria-describedby={bulle} onClick={() => setOuvert(!ouvert)}>{children}</button>
      <span role="tooltip" id={bulle} className="terme-bulle">
        <strong>{t.terme}</strong> {t.definition}
      </span>
    </span>
  );
}

/** Texte de données avec des termes balisés : « les élus du [[cse|CSE]] ». */
export function AvecTermes({ texte }: { texte: string }) {
  const morceaux = texte.split(/\[\[([^\]]+)\]\]/);
  return (
    <>
      {morceaux.map((m, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{m}</Fragment>;
        const [id, mot] = m.split("|");
        return <Terme key={i} id={id}>{mot ?? id}</Terme>;
      })}
    </>
  );
}
