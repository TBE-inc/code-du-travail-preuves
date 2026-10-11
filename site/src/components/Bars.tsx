import { fr } from "./ui";

export type Bar = { label: string; value: number; strong?: boolean; faint?: boolean };

/** Graphique minimal : quelques barres, valeur au bout, une seule mise en avant. */
export function Bars({ title, rows, unit, digits = 0 }: { title: string; rows: Bar[]; unit: string; digits?: number }) {
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));
  return (
    <figure className="bars">
      <figcaption className="fig-title">{title}</figcaption>
      {rows.map((r) => (
        <div key={r.label} className={`b-row${r.strong ? " strong" : ""}${r.faint ? " faint" : ""}`}>
          <span className="b-lab">{r.label}</span>
          <span className="b-trk"><span className="b-bar" style={{ width: `${(Math.abs(r.value) / max) * 100}%` }} /></span>
          <span className="b-val">{(r.value < 0 ? "−" : "") + fr(Math.abs(r.value), digits)}{unit}</span>
        </div>
      ))}
    </figure>
  );
}
