import { useMemo, useState } from "react";
import { costs, delegationSteps, epl, ess, obligations, wellby } from "../data/chiffres";
import { Art, Fn, Ticks, fr, pct } from "./ui";

/** Écart de satisfaction de vie, point et intervalle de confiance. */
export function EssChart() {
  const min = -1, max = 0.8;
  return (
    <figure>
      <div className="fig-title">Écart de satisfaction de vie par rapport à un salarié en CDI, sur 10</div>
      <div className="chart">
        {ess.map((d) => (
          <div className="crow" key={d.label}>
            <span className="lab">{d.label}</span>
            <div className="trk">
              <span className="zero" style={{ left: `${pct(0, min, max)}%` }} />
              <span className="ci" style={{ left: `${pct(d.low, min, max)}%`, width: `${pct(d.high, min, max) - pct(d.low, min, max)}%` }} />
              <span className={`dot ${d.value < 0 ? "neg" : "pos"}`} style={{ left: `${pct(d.value, min, max)}%` }} />
            </div>
            <span className="val">{(d.value > 0 ? "+" : "−") + fr(Math.abs(d.value), 2)}</span>
          </div>
        ))}
      </div>
      <Ticks values={[-1, -0.5, 0, 0.5]} min={min} max={max} />
      <figcaption>Point : estimation. Trait : intervalle de confiance à 95 %, la zone où se trouve probablement la vraie valeur. Moyenne de l'échantillon : 7,1 sur 10.</figcaption>
    </figure>
  );
}

/** « Si N personnes de moins étaient au chômage… » */
export function WellbyCalculator() {
  const [n, setN] = useState(10000);
  const m = (e: number, v: number) => fr((n * e * v) / 1e6);
  return (
    <div className="calc">
      <p>
        Si{" "}
        <input type="number" min={1000} max={500000} step={1000} value={n} aria-label="Nombre de chômeurs en moins" onChange={(e) => setN(Math.max(0, Math.round(+e.target.value || 0)))} />{" "}
        personnes de moins étaient au chômage pendant un an, le gain de bien-être vaudrait environ <output>{m(wellby.effect, wellby.value)} millions d'euros</output>.
      </p>
      <input type="range" min={1000} max={300000} step={1000} value={n} aria-label="Ajuster le nombre de chômeurs en moins" onChange={(e) => setN(+e.target.value)} />
      <p className="formula">
        Calcul : {fr(n)} × 0,74 point × 18 000 € par point et par an. Fourchette {m(wellby.effectLow, wellby.valueLow)} à {m(wellby.effectHigh, wellby.valueHigh)} millions d'euros.
      </p>
    </div>
  );
}

const SCENARIOS = { low: "bas", mid: "central", high: "haut" } as const;
type Scenario = keyof typeof SCENARIOS;

/** Coût administratif par démarche, avec choix du scénario. */
export function CostChart() {
  const [k, setK] = useState<Scenario>("mid");
  const [all, setAll] = useState(false);
  const { rows, max, ticks, total } = useMemo(() => {
    const top = Math.max(...costs.map((d) => d[k]));
    const step = top > 900 ? 400 : top > 450 ? 200 : 100;
    const max = Math.ceil((top * 1.04) / step) * step;
    const ticks: number[] = [];
    for (let v = 0; v <= max; v += step) ticks.push(v);
    return { rows: [...costs].sort((a, b) => b[k] - a[k]), max, ticks, total: costs.reduce((s, d) => s + d[k], 0) };
  }, [k]);
  return (
    <figure>
      <div className="figtop">
        <div className="fig-title">Coût administratif annuel, en millions d'euros</div>
        <div className="toggle" role="group" aria-label="Scénario">
          {(Object.keys(SCENARIOS) as Scenario[]).map((s) => (
            <button key={s} type="button" aria-pressed={k === s} onClick={() => setK(s)}>
              {SCENARIOS[s][0].toUpperCase() + SCENARIOS[s].slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="chart">
        {rows.filter((d, i) => all || i < 8 || d.target).map((d) => (
          <div className={`crow${d.target ? " target" : ""}`} key={d.label}>
            <span className="lab"><span>{d.label}</span></span>
            <div className="trk"><span className="bar" style={{ left: 0, width: `${pct(d[k], 0, max)}%` }} /></div>
            <span className="val">{fr(d[k])}</span>
          </div>
        ))}
      </div>
      <Ticks values={ticks} min={0} max={max} />
      <button type="button" className="linklike" style={{ justifySelf: "start", fontSize: 14.5 }} onClick={() => setAll(!all)} aria-expanded={all}>
        {all ? "Ne montrer que les 8 plus coûteuses" : `Afficher les ${rows.length} démarches`}
      </button>
      <figcaption>Total du scénario {SCENARIOS[k]} : {fr(total / 1000, 1)} milliards d'euros par an pour les 23 démarches.</figcaption>
    </figure>
  );
}

const W = 640, H = 260, L = 44, R = 16, T = 18, B = 34;
const X = (n: number) => L + (n / 100) * (W - L - R);
const Y = (h: number) => H - B - (h / 130) * (H - T - B);
const hoursAt = (n: number) => delegationSteps.reduce((h, [from, v]) => (n >= from ? v : h), 0);
const stairPath = delegationSteps.slice(1).reduce((d, [n, h]) => `${d} H${X(n)} V${Y(h)}`, `M${X(0)},${Y(0)}`) + ` H${X(100)}`;

/** Escalier des heures de délégation, avec curseur d'effectif. */
export function Stairs() {
  const [n, setN] = useState(49);
  const h = hoursAt(n);
  const right = n > 80;
  return (
    <figure className="stairs">
      <div className="fig-title">Heures de délégation des élus du CSE selon l'effectif, par mois</div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Escalier des heures de délégation : 0 heure sous 11 salariés, 10 heures de 11 à 24, 20 heures de 25 à 49, 72 heures de 50 à 74, 95 heures de 75 à 99">
        {[0, 40, 80, 120].map((v) => (
          <g key={v}>
            <line className="g-rule" x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} />
            <text x={L - 8} y={Y(v) + 4} textAnchor="end">{v} h</text>
          </g>
        ))}
        {[0, 11, 25, 50, 75, 100].map((v) => (
          <text key={v} x={X(v)} y={H - B + 18} textAnchor="middle">{v}</text>
        ))}
        <path className="g-step" d={stairPath} />
        <line className="g-jump" x1={X(50)} x2={X(50)} y1={Y(20)} y2={Y(72)} />
        <text className="t-red" x={X(50) - 8} y={Y(46) + 4} textAnchor="end">+52 h</text>
        <text x={W - R} y={H - 2} textAnchor="end">salariés</text>
        <line className="g-cur" x1={X(n)} x2={X(n)} y1={T} y2={H - B} />
        <circle className="g-dot" r={5} cx={X(n)} cy={Y(h)} />
        <text className="t-strong" x={X(n) + (right ? -8 : 8)} y={Y(h) - 10} textAnchor={right ? "end" : "start"}>{h} h</text>
      </svg>
      <label className="simline" htmlFor="sim">
        Faites grandir l'entreprise : <strong>{n} salariés, {h} heures de délégation par mois</strong>
      </label>
      <input type="range" id="sim" min={5} max={99} step={1} value={n} onChange={(e) => setN(+e.target.value)} />
      <ul className="oblig">
        {obligations.map((o) => (
          <li key={o.label} className={`${n >= o.from ? "on" : ""}${n === o.from ? " new" : ""}`}>
            <span className="at">dès {o.from}</span>
            <span>{o.label} <Art>{o.article}</Art></span>
          </li>
        ))}
      </ul>
      <figcaption>
        Barème légal (<Art>R2314-1</Art>), maximum autorisé. Il ne s'applique que si un CSE a été élu, ce qui est le cas dans 41 % des entreprises de 10 salariés et plus.<Fn id="fs" /> Certaines obligations ne s'appliquent qu'après douze mois au-dessus du seuil.
      </figcaption>
    </figure>
  );
}

/** Indice OCDE de protection contre le licenciement. */
export function EplChart() {
  const max = 3.5;
  return (
    <figure>
      <div className="fig-title">Protection contre le licenciement en CDI, indice OCDE 2025 (0 à 6)</div>
      <div className="chart">
        {epl.map(([c, v]) => (
          <div className={`crow${c === "France" ? " fr" : ""}`} key={c}>
            <span className="lab">{c}</span>
            <div className="trk"><span className="bar" style={{ left: 0, width: `${pct(v, 0, max)}%` }} /></div>
            <span className="val">{v.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
      <Ticks values={[0, 1, 2, 3]} min={0} max={max} />
      <figcaption>Plus l'indice est haut, plus licencier est encadré. Version 4 de l'indice.<Fn id="oecdepl" /></figcaption>
    </figure>
  );
}
