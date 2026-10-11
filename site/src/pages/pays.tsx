import { useEffect, useMemo, useState } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn, Row, Ticks, pct } from "../components/ui";

type Valeur = { annee: string; valeur: number };
type Indicateur = { id: string; nom: string; unite: string; mieux: "bas" | "haut" | null; source: string; valeurs: Record<string, Valeur> };
type Donnees = { pays: Record<string, string>; indicateurs: Indicateur[] };

const base = import.meta.env.BASE_URL;
const SOURCE_FN: Record<string, string> = { epl: "oecdepl", activation: "oecdact" };

function niceMax(v: number) {
  const step = v > 50 ? 20 : v > 20 ? 10 : v > 8 ? 2 : 1;
  return { max: Math.ceil((v * 1.05) / step) * step, step };
}

function Comparateur() {
  const [d, setD] = useState<Donnees | null>(null);
  const [error, setError] = useState(false);
  const [sel, setSel] = useState("chomage");
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

  const { max, step } = niceMax(Math.max(...rows.map((r) => r.valeur)));
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  const pays = rows.filter((r) => r.g !== "EU27_2020");
  const rangFr = pays.findIndex((r) => r.g === "FR") + 1;
  const annees = [...new Set(rows.map((r) => r.annee))].sort().join(", ");

  return (
    <>
      <div className="chooser" role="group" aria-label="Indicateur">
        {d.indicateurs.map((i) => (
          <button key={i.id} type="button" aria-pressed={i.id === sel} onClick={() => setSel(i.id)}>{i.nom}</button>
        ))}
      </div>

      <figure>
        <div className="fig-title">{ind.nom}, en {ind.unite}{ind.mieux ? (ind.mieux === "bas" ? ", du plus bas au plus haut" : ", du plus haut au plus bas") : ""}</div>
        <div className="chart">
          {rows.map((r) => (
            <div className={`crow${r.g === "FR" ? " fr" : ""}${r.g === "EU27_2020" ? " eu" : ""}`} key={r.g}>
              <span className="lab">{r.nom}</span>
              <div className="trk"><span className="bar" style={{ left: 0, width: `${pct(r.valeur, 0, max)}%` }} /></div>
              <span className="val">{r.valeur.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
        <Ticks values={ticks} min={0} max={max} />
        <figcaption>
          Source : {ind.source}{SOURCE_FN[ind.id] ? <Fn id={SOURCE_FN[ind.id]} /> : null}. Année : {annees}.
          {ind.mieux ? <> La France est <strong>{rangFr}<sup>e</sup> sur {pays.length}</strong> pays.</> : <> Ni haut ni bas n'est « mieux » en soi : c'est un choix de règles.</>}
        </figcaption>
      </figure>

      <h2>Tous les indicateurs</h2>
      <div className="tbl">
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
                {d.indicateurs.map((i) => <td key={i.id} className="r">{i.valeurs[g] ? i.valeurs[g].valeur.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

mount(
  "pays",
  <>
    <PageHead
      title="La France face à ses voisins"
      lede="Chômage, emploi des jeunes et des seniors, règles du licenciement, exigences envers les chômeurs, bien-être : la France comparée à 12 pays européens et à la moyenne de l'Union, avec les dernières données disponibles."
    />
    <section aria-label="Comparateur">
      <Row
        note={
          <>
            <p><strong>Comparer n'est pas expliquer.</strong> Un pays peut avoir peu de chômage pour mille raisons qui n'ont rien à voir avec son droit du travail. Pour les effets propres des règles, voir <a href={`${base}#licenciement`}>le constat 4</a>.</p>
            <p>Données Eurostat et OCDE, téléchargées et filtrées par nos scripts.<Fn id="eurostat" /> Fichier : <a href={`${base}data/pays.json`}>pays.json</a>.</p>
          </>
        }
      >
        <Comparateur />
      </Row>
    </section>
  </>,
);
