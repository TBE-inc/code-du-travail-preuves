import { useEffect, useMemo, useState } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn, Proof, fr, pct } from "../components/ui";
import "../tools.css";

type Obligation = { article: string; partie: string; categorie: string; seuil: number; texte: string };

const base = import.meta.env.BASE_URL;
const PAGE = 40;

const normalise = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function useObligations() {
  const [data, setData] = useState<Obligation[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`${base}data/obligations.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { lignes: [string, string, string, number, string][] }) =>
        setData(j.lignes.map(([article, partie, categorie, seuil, texte]) => ({ article, partie, categorie, seuil, texte }))),
      )
      .catch(() => setError(true));
  }, []);
  return { data, error };
}

type Filtres = { q: string; partie: string; categorie: string; seuil: string };
type Cle = keyof Filtres;
const VIDE: Filtres = { q: "", partie: "", categorie: "", seuil: "" };

function garde(o: Obligation, f: Filtres, sauf?: Cle) {
  const nq = normalise(f.q.trim());
  return (
    (sauf === "partie" || !f.partie || o.partie === f.partie) &&
    (sauf === "categorie" || !f.categorie || o.categorie === f.categorie) &&
    (sauf === "seuil" || !f.seuil || (f.seuil === "aucun" ? o.seuil === 0 : o.seuil === +f.seuil)) &&
    (sauf === "q" || !nq || normalise(o.article + " " + o.texte).includes(nq))
  );
}

const libelle = (k: Cle, f: Filtres) =>
  k === "q" ? `« ${f.q.trim()} »` : k === "seuil" ? (f.seuil === "aucun" ? "Sans seuil" : `Dès ${f.seuil} salariés`) : f[k];

function Explorer() {
  const { data, error } = useObligations();
  const [f, setF] = useState<Filtres>(VIDE);
  const [shown, setShown] = useState(PAGE);
  const [ouvert, setOuvert] = useState(false);
  const set = (k: Cle, v: string) => setF((x) => ({ ...x, [k]: v }));

  const options = useMemo(() => {
    const parties = [...new Set((data ?? []).map((o) => o.partie))].sort();
    const seuils = [...new Set((data ?? []).map((o) => o.seuil).filter(Boolean))].sort((a, b) => a - b);
    return { parties, seuils };
  }, [data]);

  const filtered = useMemo(() => (data ?? []).filter((o) => garde(o, f)), [data, f]);

  // Le graphique compte selon les autres filtres : il reste entier quand on choisit un type.
  const parCategorie = useMemo(() => {
    const c = new Map<string, number>();
    (data ?? []).forEach((o) => garde(o, f, "categorie") && c.set(o.categorie, (c.get(o.categorie) ?? 0) + 1));
    if (f.categorie && !c.has(f.categorie)) c.set(f.categorie, 0);
    return [...c.entries()].sort((a, b) => (a[0] === "Non classée" ? 1 : b[0] === "Non classée" ? -1 : b[1] - a[1]));
  }, [data, f]);

  const actifs = (Object.keys(f) as Cle[]).filter((k) => f[k].trim() !== "");

  // État vide : combien de résultats si l'on retire chaque filtre.
  const sansChacun = filtered.length || !data ? [] : actifs.map((k) => ({ k, n: data.filter((o) => garde(o, f, k)).length }));

  useEffect(() => setShown(PAGE), [f]);

  if (error) return <p>Les données n'ont pas pu être chargées. Rechargez la page, ou téléchargez directement <a href={`${base}donnees/obligations.csv`}>le fichier des obligations</a>.</p>;
  if (!data) return <p className="muted-note">Chargement des 2 847 obligations…</p>;

  const max = Math.max(1, ...parCategorie.map(([, n]) => n));
  const nFiltres = actifs.filter((k) => k !== "q").length;
  const noms: Record<Cle, string> = { q: "Recherche", partie: "Partie", categorie: "Type", seuil: "Seuil" };

  return (
    <div className="tool obl">
      <div className="tool-side">
        <label className="f-search">
          <span>Rechercher un mot ou un article</span>
          <input type="search" value={f.q} onChange={(e) => set("q", e.target.value)} placeholder="registre, affichage, L1242-12…" />
        </label>

        <button type="button" className="obl-toggle" aria-expanded={ouvert} aria-controls="obl-panel" onClick={() => setOuvert(!ouvert)}>
          Filtres{nFiltres ? ` (${nFiltres})` : ""}
        </button>

        <div id="obl-panel" className={`obl-panel${ouvert ? " open" : ""}`}>
          <label>
            <span>Partie du Code</span>
            <select value={f.partie} onChange={(e) => set("partie", e.target.value)}>
              <option value="">Toutes</option>
              {options.parties.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label>
            <span>Nombre de salariés</span>
            <select value={f.seuil} onChange={(e) => set("seuil", e.target.value)}>
              <option value="">Tous</option>
              <option value="aucun">Sans seuil</option>
              {options.seuils.map((s) => <option key={s} value={s}>Dès {s} salariés</option>)}
            </select>
          </label>
          <div className="cats" role="group" aria-labelledby="cats-t">
            <div className="cats-t" id="cats-t">Type d'obligation</div>
            {parCategorie.map(([c, n]) => (
              <button
                type="button"
                className="cat"
                key={c}
                aria-pressed={f.categorie === c}
                onClick={() => set("categorie", f.categorie === c ? "" : c)}
              >
                <span className="cat-lab">{c}</span>
                <span className="cat-val">{fr(n)}</span>
                <span className="cat-trk" aria-hidden="true"><span style={{ width: `${pct(n, 0, max)}%` }} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="tool-main">
        <p className="count" aria-live="polite">
          <strong>{fr(filtered.length)}</strong> obligation{filtered.length > 1 ? "s" : ""} sur {fr(data.length)}
        </p>

        {actifs.length > 0 && (
          <ul className="chips" aria-label="Filtres actifs">
            {actifs.map((k) => (
              <li key={k}>
                <button type="button" onClick={() => set(k, "")} aria-label={`Retirer le filtre ${noms[k]} : ${libelle(k, f)}`}>
                  {libelle(k, f)} <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
            {actifs.length > 1 && <li><button type="button" className="linklike" onClick={() => setF(VIDE)}>Tout effacer</button></li>}
          </ul>
        )}

        {filtered.length === 0 && (
          <div className="obl-empty">
            <p>{actifs.length === 1 ? `Aucune obligation ne correspond à ${libelle(actifs[0], f)}. Essayez un autre mot ou un autre filtre.` : "Aucune obligation ne réunit tous ces filtres. Retirez celui-ci :"}</p>
            {actifs.length > 1 && <ul>
              {sansChacun.map(({ k, n }) => (
                <li key={k}>
                  <button type="button" className="linklike" onClick={() => set(k, "")}>Retirer {libelle(k, f)}</button>
                  {" "}: {n ? `${fr(n)} résultat${n > 1 ? "s" : ""}` : "toujours aucun résultat"}.
                </li>
              ))}
            </ul>}
          </div>
        )}

        <ol className="oblist">
          {filtered.slice(0, shown).map((o, i) => (
            <li key={`${o.article}-${i}`}>
              <div className="ob-meta">
                <span className="art">{o.article}</span>
                <span>{o.partie}</span>
                <span>{o.categorie}</span>
                {o.seuil > 0 && <span className="ob-seuil">dès {o.seuil} salariés</span>}
              </div>
              <p>{o.texte}</p>
            </li>
          ))}
        </ol>
        {shown < filtered.length && (
          <button type="button" className="more" onClick={() => setShown(shown + PAGE)}>
            Voir {Math.min(PAGE, filtered.length - shown)} obligations de plus
          </button>
        )}
      </div>
    </div>
  );
}

mount(
  "outils",
  <>
    <PageHead
      title="Les 2 847 obligations du Code du travail"
      lede="Chaque phrase du Code qui impose quelque chose à l'employeur, repérée dans les 11 572 articles. Cherchez un mot, ou filtrez par thème et par nombre de salariés."
    >
      <Proof label="Comment c'est fait, et ses limites">
        <p>Un programme a lu le Code du 8 octobre 2026<Fn id="code" /> et relevé chaque phrase qui oblige l'employeur. Nous l'avons vérifié à la main sur 150 articles tirés au sort : environ <strong>3 obligations sur 4</strong> sont bien repérées et bien classées.</p>
        <p>Les normes techniques de sécurité (machines, échafaudages) sont moins bien repérées. Un tiers des obligations n'a pas pu être classé par thème.</p>
        <p><a href={`${base}donnees/obligations.csv`}>Télécharger le fichier complet</a></p>
      </Proof>
    </PageHead>
    <section aria-label="Explorateur" className="tools">
      <Explorer />
    </section>
  </>,
);
