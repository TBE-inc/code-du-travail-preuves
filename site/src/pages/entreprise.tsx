import { useMemo, useState } from "react";
import { mount, PageHead } from "../components/Layout";
import { Art, Fn, Row, fr } from "../components/ui";
import { coutHoraire, coutsUnitaires } from "../data/couts-unitaires";

// Mouvements moyens par salarié et par an en France en 2025 (DARES, mouvements de main-d'œuvre ; 18,55 M de salariés)
const PAR_SALARIE = { cdi: 0.215, cdd: 1.18, fins: 1.4, licPerso: 0.048, licEco: 0.004, rc: 0.028, entretiens: 0.296 };

// Code du travail, R2314-1 : total mensuel d'heures de délégation à partir de chaque seuil
const DELEGATION: [number, number][] = [[11, 10], [25, 20], [50, 72], [75, 95], [100, 126], [125, 147], [150, 168], [175, 189], [200, 220], [250, 242], [400, 264], [500, 312]];
const heuresDelegation = (n: number) => DELEGATION.reduce((h, [from, v]) => (n >= from ? v : h), 0);
const SEUILS = [11, 20, 25, 50, 75, 100, 300];

type Flux = { cdi: number; cdd: number; fins: number; licPerso: number; licEco: number; rc: number };
type Ligne = { id: string; quantite: number; detail: string };

const moyennes = (n: number): Flux => ({
  cdi: Math.round(PAR_SALARIE.cdi * n),
  cdd: Math.round(PAR_SALARIE.cdd * n),
  fins: Math.round(PAR_SALARIE.fins * n),
  licPerso: Math.round(PAR_SALARIE.licPerso * n),
  licEco: Math.round(PAR_SALARIE.licEco * n),
  rc: Math.round(PAR_SALARIE.rc * n),
});

function lignes(n: number, f: Flux): Ligne[] {
  const embauches = f.cdi + f.cdd;
  const l: Ligne[] = [
    { id: n < 10 ? "bulletin_paie_tpe" : "bulletin_paie_10_plus", quantite: 12 * n, detail: `${fr(12 * n)} bulletins par an` },
    { id: "dpae", quantite: embauches, detail: `${fr(embauches)} embauches` },
    { id: "registre_personnel", quantite: embauches, detail: `${fr(embauches)} inscriptions` },
    { id: "cdd_contrat", quantite: f.cdd, detail: `${fr(f.cdd)} CDD` },
    { id: "cdi_information", quantite: f.cdi, detail: `${fr(f.cdi)} CDI` },
    { id: "visite_info_prevention", quantite: Math.round(f.cdi + 0.15 * f.cdd), detail: "CDI et CDD de plus d'un mois" },
    { id: "fin_contrat_documents", quantite: f.fins, detail: `${fr(f.fins)} fins de contrat` },
    { id: "licenciement_personnel", quantite: f.licPerso, detail: `${fr(f.licPerso)} licenciements` },
    { id: "licenciement_economique", quantite: f.licEco, detail: `${fr(f.licEco)} licenciements` },
    { id: "rupture_conventionnelle", quantite: f.rc, detail: `${fr(f.rc)} ruptures` },
    { id: "entretien_parcours", quantite: Math.round(PAR_SALARIE.entretiens * n), detail: "un tous les quatre ans, plus les nouveaux embauchés" },
    { id: "affichages", quantite: 1, detail: "par an" },
    { id: "decompte_temps", quantite: 1, detail: "par an" },
    { id: n < 11 ? "duerp_moins_11" : "duerp_11_plus", quantite: 1, detail: n < 11 ? "mise à jour en cas de changement" : "mise à jour annuelle" },
  ];
  if (n >= 11 && n < 50) l.push({ id: "cse_11_49", quantite: 1, detail: "réunions mensuelles, élections" });
  if (n >= 50 && n < 300) l.push({ id: "cse_50_299", quantite: 1, detail: "consultations, base de données, élections" });
  if (n >= 300) l.push({ id: "cse_300_plus", quantite: 1, detail: "réunions mensuelles, consultations" });
  if (n >= 20) l.push({ id: "oeth", quantite: 1, detail: "déclaration annuelle" });
  if (n >= 50) {
    l.push({ id: "index_egalite", quantite: 1, detail: "publication annuelle" });
    l.push({ id: "reglement_interieur", quantite: 1, detail: "tenue à jour" });
    l.push({ id: "negociations_obligatoires", quantite: 1, detail: "si des délégués syndicaux sont désignés" });
  }
  return l.filter((x) => x.quantite > 0);
}

function chiffrer(n: number, f: Flux) {
  const detail = lignes(n, f).map((l) => {
    const u = coutsUnitaires[l.id];
    const bas = u.bas * l.quantite, haut = u.haut * l.quantite;
    return { ...l, nom: u.nom, article: u.article, bas, haut, central: Math.sqrt(bas * haut), heures: Math.sqrt(u.heuresBas * u.heuresHaut) * l.quantite };
  }).sort((a, b) => b.central - a.central);
  const somme = (k: "bas" | "haut" | "central" | "heures") => detail.reduce((s, d) => s + d[k], 0);
  const hDeleg = heuresDelegation(n) * 12;
  return { detail, bas: somme("bas"), haut: somme("haut"), central: somme("central"), heures: somme("heures"), hDeleg, coutDeleg: hDeleg * coutHoraire };
}

const arrondi = (v: number) => (v >= 10000 ? Math.round(v / 100) * 100 : Math.round(v / 10) * 10);

function Simulateur() {
  const [n, setN] = useState(30);
  const [flux, setFlux] = useState<Flux>(moyennes(30));
  const [perso, setPerso] = useState(false);

  const changeN = (v: number) => {
    const nn = Math.max(1, Math.min(500, Math.round(v || 1)));
    setN(nn);
    if (!perso) setFlux(moyennes(nn));
  };
  const changeFlux = (k: keyof Flux, v: number) => { setPerso(true); setFlux({ ...flux, [k]: Math.max(0, Math.round(v || 0)) }); };
  const r = useMemo(() => chiffrer(n, flux), [n, flux]);

  const prochain = SEUILS.find((s) => s > n);
  const apres = useMemo(() => {
    if (!prochain) return null;
    const k = prochain / n;
    const f2: Flux = { cdi: Math.round(flux.cdi * k), cdd: Math.round(flux.cdd * k), fins: Math.round(flux.fins * k), licPerso: Math.round(flux.licPerso * k), licEco: Math.round(flux.licEco * k), rc: Math.round(flux.rc * k) };
    const avant = chiffrer(prochain - 1, { cdi: Math.round(flux.cdi * (prochain - 1) / n), cdd: Math.round(flux.cdd * (prochain - 1) / n), fins: Math.round(flux.fins * (prochain - 1) / n), licPerso: Math.round(flux.licPerso * (prochain - 1) / n), licEco: Math.round(flux.licEco * (prochain - 1) / n), rc: Math.round(flux.rc * (prochain - 1) / n) });
    const ap = chiffrer(prochain, f2);
    return { seuil: prochain, admin: ap.central - avant.central, deleg: ap.hDeleg - avant.hDeleg };
  }, [n, flux, prochain]);

  const champs: [keyof Flux, string][] = [
    ["cdi", "Embauches en CDI par an"],
    ["cdd", "Embauches en CDD par an"],
    ["fins", "Fins de contrat par an (tous motifs)"],
    ["licPerso", "Licenciements pour motif personnel par an"],
    ["rc", "Ruptures conventionnelles par an"],
    ["licEco", "Licenciements économiques par an"],
  ];

  return (
    <>
      <div className="sim-inputs">
        <label className="sim-n">
          <span>Effectif de l'entreprise</span>
          <span className="sim-n-row">
            <input type="number" min={1} max={500} value={n} onChange={(e) => changeN(+e.target.value)} />
            <span>salariés</span>
          </span>
          <input type="range" min={1} max={300} value={Math.min(n, 300)} onChange={(e) => changeN(+e.target.value)} aria-label="Ajuster l'effectif" />
        </label>
        <fieldset className="sim-flux">
          <legend>Mouvements de personnel {perso ? "(vos chiffres)" : "(moyenne française pour cet effectif)"}</legend>
          {champs.map(([k, lab]) => (
            <label key={k}>
              <span>{lab}</span>
              <input type="number" min={0} value={flux[k]} onChange={(e) => changeFlux(k, +e.target.value)} />
            </label>
          ))}
          {perso && <button type="button" className="linklike" onClick={() => { setPerso(false); setFlux(moyennes(n)); }}>Revenir à la moyenne française</button>}
        </fieldset>
      </div>

      <div className="sim-result">
        <p className="calc">
          Chaque année, le Code du travail demande à votre entreprise environ <output>{fr(Math.round(r.heures))} heures</output> de démarches, soit <output>{fr(arrondi(r.central))} €</output>.
        </p>
        <p className="formula">Fourchette : {fr(arrondi(r.bas))} à {fr(arrondi(r.haut))} € par an, selon le temps réellement passé. Coût horaire : {fr(coutHoraire, 1)} € (Eurostat, 2025).</p>
        {r.hDeleg > 0 && (
          <p>S'y ajoutent jusqu'à <strong>{fr(r.hDeleg)} heures de délégation</strong> payées aux élus du CSE, soit environ {fr(arrondi(r.coutDeleg))} € si elles sont toutes utilisées (<Art>R2314-1</Art>).</p>
        )}
        {apres && (
          <p className="next-threshold">
            <strong>Au passage à {apres.seuil} salariés</strong>, votre charge administrative augmenterait d'environ {fr(arrondi(apres.admin))} € par an
            {apres.deleg > 0 ? <>, et les heures de délégation de {fr(apres.deleg)} heures par an</> : null}.
          </p>
        )}
      </div>

      <div className="tbl">
        <table className="plain">
          <thead><tr><th>Démarche</th><th>Volume</th><th className="r">Coût estimé par an</th></tr></thead>
          <tbody>
            {r.detail.map((d) => (
              <tr key={d.id}>
                <td>{d.nom} <Art>{d.article.split(" ")[0]}</Art></td>
                <td>{d.detail}</td>
                <td className="r">{fr(arrondi(d.central))} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

mount(
  "entreprise",
  <>
    <PageHead
      title="Ce que le Code du travail coûte à mon entreprise"
      lede="Indiquez votre effectif. Le simulateur estime le temps et l'argent que vous consacrez chaque année aux démarches imposées par le Code du travail, et ce que coûterait le prochain seuil."
    />
    <section aria-label="Simulateur">
      <Row
        note={
          <>
            <p><strong>Comment c'est calculé.</strong> Pour chaque démarche : nombre de fois par an × temps passé × coût horaire, moins ce que l'entreprise ferait de toute façon.<Fn id="scmmanual" /> Même modèle que la page principale.<Fn id="scm" /></p>
            <p>Les mouvements de personnel sont pré-remplis avec la moyenne française de 2025, très tirée par les CDD courts de certains secteurs.<Fn id="dares" /> Remplacez-les par vos chiffres.</p>
            <p><strong>Non compris :</strong> les cotisations, la participation, le budget du CSE, les indemnités de licenciement et le contentieux. C'est une estimation de la paperasse, pas du coût total du travail.</p>
          </>
        }
      >
        <Simulateur />
      </Row>
    </section>
  </>,
);
