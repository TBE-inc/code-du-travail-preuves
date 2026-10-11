import { useEffect, useMemo, useState } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn, Row, fr, pct } from "../components/ui";

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

function Explorer() {
  const { data, error } = useObligations();
  const [q, setQ] = useState("");
  const [partie, setPartie] = useState("");
  const [categorie, setCategorie] = useState("");
  const [seuil, setSeuil] = useState("");
  const [shown, setShown] = useState(PAGE);

  const options = useMemo(() => {
    const parties = [...new Set((data ?? []).map((o) => o.partie))].sort();
    const categories = [...new Set((data ?? []).map((o) => o.categorie))].sort((a, b) => (a === "Non classée" ? 1 : b === "Non classée" ? -1 : a.localeCompare(b, "fr")));
    const seuils = [...new Set((data ?? []).map((o) => o.seuil).filter(Boolean))].sort((a, b) => a - b);
    return { parties, categories, seuils };
  }, [data]);

  const filtered = useMemo(() => {
    const nq = normalise(q.trim());
    return (data ?? []).filter((o) =>
      (!partie || o.partie === partie) &&
      (!categorie || o.categorie === categorie) &&
      (!seuil || (seuil === "aucun" ? o.seuil === 0 : o.seuil === +seuil)) &&
      (!nq || normalise(o.article + " " + o.texte).includes(nq)),
    );
  }, [data, q, partie, categorie, seuil]);

  const parCategorie = useMemo(() => {
    const c = new Map<string, number>();
    filtered.forEach((o) => c.set(o.categorie, (c.get(o.categorie) ?? 0) + 1));
    return [...c.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  useEffect(() => setShown(PAGE), [q, partie, categorie, seuil]);

  if (error) return <p>Les données n'ont pas pu être chargées. Rechargez la page, ou téléchargez directement <a href={`${base}donnees/obligations.csv`}>le fichier des obligations</a>.</p>;
  if (!data) return <p className="muted-note">Chargement des 2 847 obligations…</p>;

  const max = parCategorie.length ? parCategorie[0][1] : 1;
  const reset = () => { setQ(""); setPartie(""); setCategorie(""); setSeuil(""); };

  return (
    <>
      <div className="filters">
        <label className="f-search">
          <span>Rechercher un mot ou un article</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="registre, affichage, L1242-12…" />
        </label>
        <label>
          <span>Partie du Code</span>
          <select value={partie} onChange={(e) => setPartie(e.target.value)}>
            <option value="">Toutes</option>
            {options.parties.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label>
          <span>Type d'obligation</span>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="">Tous</option>
            {options.categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span>Seuil d'effectif</span>
          <select value={seuil} onChange={(e) => setSeuil(e.target.value)}>
            <option value="">Tous</option>
            <option value="aucun">Sans seuil</option>
            {options.seuils.map((s) => <option key={s} value={s}>Dès {s} salariés</option>)}
          </select>
        </label>
      </div>

      <p className="count">
        <strong>{fr(filtered.length)}</strong> obligation{filtered.length > 1 ? "s" : ""} sur {fr(data.length)}
. {(q || partie || categorie || seuil) && <button type="button" className="linklike" onClick={reset}>Tout afficher</button>}
      </p>

      {parCategorie.length > 1 && (
        <figure>
          <div className="fig-title">Par type d'obligation (cliquez pour filtrer)</div>
          <div className="chart">
            {parCategorie.map(([c, n]) => (
              <button type="button" className="crow crow-btn" key={c} onClick={() => setCategorie(c)} aria-label={`Filtrer : ${c}, ${n} obligations`}>
                <span className="lab">{c}</span>
                <span className="trk"><span className="bar" style={{ left: 0, width: `${pct(n, 0, max)}%` }} /></span>
                <span className="val">{fr(n)}</span>
              </button>
            ))}
          </div>
        </figure>
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
          Afficher {Math.min(PAGE, filtered.length - shown)} obligations de plus
        </button>
      )}
      {filtered.length === 0 && <p>Aucune obligation ne correspond. Essayez un autre mot, ou <button type="button" className="linklike" onClick={reset}>effacez les filtres</button>.</p>}
    </>
  );
}

mount(
  "outils",
  <>
    <PageHead
      title="Les 2 847 obligations du Code du travail"
      lede="Chaque phrase du Code qui impose quelque chose à l'employeur, repérée dans les 11 572 articles. Cherchez un mot, filtrez par thème ou par seuil d'effectif, et voyez l'empilement par vous-même."
    />
    <section aria-label="Explorateur">
      <Row
        label="Comment c'est fait, et ses limites"
        note={
          <>
            <p> Un programme a parcouru le Code du 8 octobre 2026<Fn id="code" /> et relevé chaque phrase qui oblige l'employeur. Vérification à la main sur 150 articles tirés au sort : environ <strong>trois sur quatre</strong> sont bien repérés et bien classés.</p>
            <p>Les normes techniques de sécurité (machines, échafaudages) sont moins bien repérées. Un tiers des obligations n'ont pas de type.</p>
            <p><a href={`${base}donnees/obligations.csv`}>Télécharger le fichier complet</a></p>
          </>
        }
      >
        <Explorer />
      </Row>
    </section>
  </>,
);
