import type { ReactNode } from "react";
import { Bars } from "../components/Bars";
import { constats, type ConstatId } from "../data/constats";
import { AvecTermes, Terme } from "../components/Terme";

const base = import.meta.env.BASE_URL;

/** Les visuels simplifiés de l'accueil : un seul message chacun. */
const visuels: Record<ConstatId, ReactNode> = {
  chomage: (
    <Bars
      title="Écart de satisfaction de vie avec un salarié en CDI, sur 10, à revenu égal"
      unit=" point"
      digits={2}
      rows={[
        { label: "Chômeur", value: -0.74, strong: true },
        { label: "Salarié en CDD", value: -0.15 },
      ]}
    />
  ),
  paperasse: (
    <Bars
      title="Ce que coûte chaque démarche, par an, à toutes les entreprises"
      unit=" M€"
      rows={[
        { label: "Fiches de paie", value: 759, strong: true },
        { label: "Évaluation des risques", value: 458 },
        { label: "Réunions et élections du CSE", value: 360 },
        { label: "Licenciements individuels", value: 240 },
        { label: "Registre, index égalité, règlement intérieur", value: 32, faint: true },
      ]}
    />
  ),
  seuil: (
    <>
    <p className="fig-title">Ce qui change quand une entreprise passe de 49 à 50 salariés</p>
    <dl className="verdicts">
      <div><dt><Terme id="delegation">Heures de délégation</Terme> des élus, par mois</dt><dd className="down">20 h, puis 72 h</dd></div>
      <div><dt>Équivaut à une taxe sur le travail de</dt><dd className="down">1,3 %</dd></div>
      <div><dt>PIB perdu si les salaires sont rigides</dt><dd className="down">4 à 5 %</dd></div>
    </dl>
    </>
  ),
  licenciement: (
    <>
    <p className="fig-title">Ce que trouvent les études quand on assouplit la protection des <Terme id="cdi">CDI</Terme></p>
    <dl className="verdicts">
      <div><dt>Sur le chômage</dt><dd>Pas d'effet net</dd></div>
      <div><dt>Sur la productivité</dt><dd className="up">En hausse</dd></div>
      <div><dt>Sur les embauches en <Terme id="cdi">CDI</Terme> (Italie, 2015)</dt><dd className="up">En hausse</dd></div>
    </dl>
    </>
  ),
  assurance: (
    <>
    <p className="fig-title">Les réformes des allocations chômage depuis 2021, et leurs effets connus</p>
    <dl className="verdicts">
      <div><dt>Réformes des allocations depuis 2021</dt><dd>3</dd></div>
      <div><dt>Évaluées de façon solide</dt><dd className="down">Aucune</dd></div>
      <div><dt>Accompagnement des chômeurs de longue durée</dt><dd className="up">Efficace après 2 à 3 ans</dd></div>
    </dl>
    </>
  ),
};

/** Ouverture d'un chapitre : grand numéro, « Chapitre n » et la question (chapitres 1 à 5, puis « Que changer »). */
export function BlockHead({ n, q }: { n: number; q: string }) {
  return (
    <div className="chap">
      <span className="chap-n" aria-hidden="true">{n}</span>
      <p className="chap-q"><span className="chap-sur">Chapitre {n}</span>{q}</p>
    </div>
  );
}

/** Fin d'un chapitre : une flèche annotée au stylo rouge, la phrase de passage et le lien vers la suite. */
export function Fil({ texte, vers, suite }: { texte: string; vers: string; suite: string }) {
  return (
    <div className="fil">
      <svg className="fil-fleche" viewBox="0 0 72 88" fill="none" aria-hidden="true">
        <path d="M6 4C6 40 22 66 60 78" />
        <path d="M49 70L61 78.5L48 84" />
      </svg>
      <div className="fil-corps">
        <p className="fil-texte">{texte}</p>
        <a href={vers}>{suite}</a>
      </div>
    </div>
  );
}

export function Insights() {
  return (
    <>
      {constats.map((c, i) => (
        <section key={c.id} id={c.id} className={`band${i % 2 === 0 ? " alt" : ""}`} aria-labelledby={`h-${c.id}`}>
          <BlockHead n={i + 1} q={c.question} />
          <div className="ins">
            <div className="ins-text">
              <h2 id={`h-${c.id}`}>{c.titre}</h2>
              <p className="insight-text"><AvecTermes texte={c.phrase} /></p>
              <a className="more-link" href={`${base}constats/${c.id}/`}>Voir le détail et les preuves</a>
            </div>
            <div className="ins-vis">
              {visuels[c.id]}
              <p className="ins-proof"><span className={`lvl ${c.niveau}`}>Preuve {c.niveau}.</span> {c.preuve}</p>
            </div>
          </div>
          {i + 1 < constats.length
            ? <Fil texte={c.fil} vers={`#${constats[i + 1].id}`} suite={`Chapitre ${i + 2} : ${constats[i + 1].court}`} />
            : <Fil texte={c.fil} vers="#propositions" suite={`Chapitre ${i + 2} : Que changer`} />}
        </section>
      ))}
    </>
  );
}
