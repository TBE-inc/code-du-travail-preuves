import type { ReactNode } from "react";
import { sourceNumber } from "../data/sources";

export const fr = (n: number, digits = 0) => n.toLocaleString("fr-FR", { maximumFractionDigits: digits });
export const pct = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;

/** Appel de note renvoyant à la liste des sources. */
export function Fn({ id }: { id: string }) {
  const n = sourceNumber(id);
  return (
    <sup className="fn">
      <a href={`${import.meta.env.BASE_URL}methode/#s${n}`} aria-label={`Source ${n}`}>{n}</a>
    </sup>
  );
}

/** Détail replié : preuves, sources et limites, ouvertes d'un geste. */
export function Proof({ label = "Preuves et limites", level, children }: { label?: string; level?: "forte" | "moyenne" | "faible"; children: ReactNode }) {
  return (
    <details className="proof">
      <summary>
        {label}
        {level && <span className={`lvl ${level}`}>Preuve {level}</span>}
      </summary>
      <div className="proof-body">{children}</div>
    </details>
  );
}

/** Bloc de lecture ; la note éventuelle est repliée sous le texte. */
export function Row({ children, note, label }: { children: ReactNode; note?: ReactNode; label?: string }) {
  return (
    <div className="stack">
      {children}
      {note && <Proof label={label}>{note}</Proof>}
    </div>
  );
}

export function Level({ kind }: { kind: "forte" | "moyenne" | "faible" }) {
  return <span className={`lvl ${kind}`}>Preuve {kind}</span>;
}

export function Art({ children }: { children: ReactNode }) {
  return <span className="art">{children}</span>;
}

export function Law({ cite, children }: { cite: string; children: ReactNode }) {
  return (
    <blockquote className="law">
      <cite>{cite}</cite>
      <p>{children}</p>
    </blockquote>
  );
}

/** Graduations d'un axe horizontal. */
export function Ticks({ values, min, max }: { values: number[]; min: number; max: number }) {
  return (
    <div className="axisrow">
      <span />
      <div className="ticks">
        {values.map((t) => {
          const p = pct(t, min, max);
          const tr = p <= 0 ? "translateX(0)" : p >= 100 ? "translateX(-100%)" : "translateX(-50%)";
          return (
            <span key={t} style={{ left: `${p}%`, transform: tr }}>
              {fr(t, 1)}
            </span>
          );
        })}
      </div>
      <span />
    </div>
  );
}
