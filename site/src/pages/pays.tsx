import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn, Proof, Ticks, fr, pct } from "../components/ui";
import "../tools.css";

type Valeur = { annee: string; valeur: number };
type Indicateur = { id: string; nom: string; unite: string; mieux: "bas" | "haut" | null; source: string; valeurs: Record<string, Valeur> };
type Donnees = { pays: Record<string, string>; indicateurs: Indicateur[] };

const base = import.meta.env.BASE_URL;
const SOURCE_FN: Record<string, string> = { epl: "oecdepl", activation: "oecdact" };

function niceMax(v: number) {
  const step = v > 50 ? 20 : v > 20 ? 10 : v > 8 ? 2 : 1;
  return { max: Math.ceil((v * 1.05) / step) * step, step };
}

const val = (v: number, d = 1) => v.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: d });

/** Indique si un conteneur défilant a encore du contenu à droite (pour le dégradé). */
function useOverflowRight<T extends HTMLElement>(dep: unknown) {
  const ref = useRef<T>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", check); ro.disconnect(); };
  }, [dep]);
  return [ref, more] as const;
}

function Comparateur() {
  const [d, setD] = useState<Donnees | null>(null);
  const [error, setError] = useState(false);
  const [sel, setSel] = useState("chomage");
  const listRef = useRef<HTMLDivElement>(null);
  const [mxRef, mxMore] = useOverflowRight<HTMLDivElement>(d);
  useEffect(() => {
    fetch(`${base}data/pays.json`).then((r) => (r.ok ? r.json() : Promise.reject())).then(setD).catch(() => setError(true));
  }, []);

  const ind = d?.indicateurs.find((i) => i.id === sel);
  const rows = useMemo(() => {
    if (!d || !ind) return [];
    const r = Object.entries(ind.valeurs).map(([g, v]) => ({ g, nom: d.pays[g], ...v }));
    return r.sort((a, b) => (ind.mieux === "bas" ? a.valeur - b.valeur : b.valeur - a.valeur));
  }, [d, ind]);

  if (error) return <p>Les données n'ont pas pu être chargées. Rechargez la page.</p>;
  if (!d || !ind) return <p className="muted-note">Chargement…</p>;

  const ids = d.indicateurs.map((i) => i.id);
  // Groupe de boutons radio : les flèches changent d'indicateur, comme le veut le motif ARIA.
  const clavier = (e: KeyboardEvent<HTMLDivElement>) => {
    const pas = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!pas) return;
    e.preventDefault();
    const next = ids[(ids.indexOf(sel) + pas + ids.length) % ids.length];
    setSel(next);
    listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${next}"]`)?.focus();
  };

  const { max, step } = niceMax(Math.max(...rows.map((r) => r.valeur)));
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  const pays = rows.filter((r) => r.g !== "EU27_2020");
  const rangFr = pays.findIndex((r) => r.g === "FR") + 1;
  const vFr = ind.valeurs.FR?.valeur;
  const vUe = ind.valeurs.EU27_2020?.valeur;
  const annees = [...new Set(rows.map((r) => r.annee))].sort().join(", ");

  return (
    <>
      <div className="tool cmp">
        <div className="tool-side">
          <label className="ind-pick">
            <span>Indicateur</span>
            <select className="ind-select" value={sel} onChange={(e) => setSel(e.target.value)}>
              {d.indicateurs.map((i) => <option key={i.id} value={i.id}>{i.nom}</option>)}
            </select>
          </label>
          <div className="ind-list" role="radiogroup" aria-label="Indicateur" ref={listRef} onKeyDown={clavier}>
            {d.indicateurs.map((i) => (
              <button
                key={i.id}
                data-id={i.id}
                type="button"
                role="radio"
                aria-checked={i.id === sel}
                tabIndex={i.id === sel ? 0 : -1}
                onClick={() => setSel(i.id)}
              >
                {i.nom}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-main">
          <div className="rank" aria-live="polite">
            {ind.mieux ? (
              <p className="rank-fig">France : {rangFr}<sup>{rangFr === 1 ? "er" : "e"}</sup> sur {pays.length}</p>
            ) : (
              <p className="rank-fig">France : {vFr !== undefined ? val(vFr, 2) : "n. d."}</p>
            )}
            <p className="rank-sub">
              {ind.nom}{vFr !== undefined && ind.mieux ? <>, {val(vFr, 2)}</> : null} ({ind.unite}).{" "}
              {ind.mieux
                ? `Classement ${ind.mieux === "bas" ? "du plus bas au plus haut" : "du plus haut au plus bas"}, le 1er étant le mieux placé.`
                : "Ni haut ni bas n'est « mieux » en soi : c'est un choix de règles."}
              {vUe !== undefined ? ` Moyenne de l'Union : ${val(vUe, 2)}.` : ""}
            </p>
          </div>

          <figure>
            <div className="chart">
              {rows.map((r) => (
                <div className={`crow${r.g === "FR" ? " fr" : ""}${r.g === "EU27_2020" ? " eu" : ""}`} key={r.g}>
                  <span className="lab">{r.nom}</span>
                  <div className="trk"><span className="bar" style={{ left: 0, width: `${pct(r.valeur, 0, max)}%` }} /></div>
                  <span className="val">{val(r.valeur, 2)}</span>
                </div>
              ))}
            </div>
            <Ticks values={ticks} min={0} max={max} />
            <figcaption>
              Source : {ind.source}{SOURCE_FN[ind.id] ? <Fn id={SOURCE_FN[ind.id]} /> : null}. Année : {annees}. {fr(pays.length)} pays et la moyenne de l'Union.
            </figcaption>
          </figure>
        </div>
      </div>

      <h2 className="mx-h">Tous les indicateurs</h2>
      <div className={`mx-wrap${mxMore ? " scrolls" : ""}`}>
        <div className="tbl" ref={mxRef} tabIndex={0} role="region" aria-label="Tableau de tous les indicateurs, défilable">
          <table className="plain matrix">
            <thead>
              <tr>
                <th>Pays</th>
                {d.indicateurs.map((i) => <th key={i.id} className="r" title={`${i.nom} (${i.unite})`}>{i.nom}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(d.pays).map(([g, nom]) => (
                <tr key={g} className={g === "FR" ? "fr" : g === "EU27_2020" ? "eu" : undefined}>
                  <td>{nom}</td>
                  {d.indicateurs.map((i) => <td key={i.id} className="r">{i.valeurs[g] ? val(i.valeurs[g].valeur) : "n. d."}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

mount(
  "outils",
  <>
    <PageHead
      title="La France face à ses voisins"
      lede="Chômage, emploi des jeunes et des seniors, règles du licenciement, exigences envers les chômeurs, bien-être : la France comparée à 12 pays européens et à la moyenne de l'Union, avec les dernières données disponibles."
    >
      <Proof label="Comparer n'est pas expliquer">
        <p>Un pays peut avoir peu de chômage pour mille raisons qui n'ont rien à voir avec son droit du travail. Pour les effets propres des règles, voir <a href={`${base}#licenciement`}>le constat 4</a>.</p>
        <p>Données Eurostat et OCDE, téléchargées et filtrées par nos scripts.<Fn id="eurostat" /> Fichier : <a href={`${base}data/pays.json`}>pays.json</a>.</p>
      </Proof>
    </PageHead>
    <section aria-label="Comparateur" className="tools">
      <Comparateur />
    </section>
  </>,
);
