import type { ReactNode } from "react";
import { Bars } from "../components/Bars";
import { constats, type ConstatId } from "../data/constats";

const base = import.meta.env.BASE_URL;

/** Les visuels simplifiés de l'accueil : un seul message chacun. */
const visuels: Record<ConstatId, ReactNode> = {
  chomage: (
    <Bars
      title="Satisfaction de vie par rapport à un salarié en CDI, sur 10"
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
      title="Coût par an, en millions d'euros (scénario central)"
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
    <dl className="verdicts">
      <div><dt>Heures payées aux élus par mois</dt><dd className="down">20 h, puis 72 h</dd></div>
      <div><dt>Démarches en plus par an</dt><dd>2 200 à 14 800 €</dd></div>
      <div><dt>Effet mesuré sur toutes les entreprises</dt><dd className="down">Taxe de 1,3 % sur le travail</dd></div>
    </dl>
  ),
  licenciement: (
    <dl className="verdicts">
      <div><dt>Sur le chômage</dt><dd>Pas d'effet net</dd></div>
      <div><dt>Sur la productivité</dt><dd className="up">Meilleure</dd></div>
      <div><dt>Sur les embauches en CDI (Italie)</dt><dd className="up">Plus nombreuses</dd></div>
    </dl>
  ),
  assurance: (
    <dl className="verdicts">
      <div><dt>Réformes des allocations depuis 2021</dt><dd>3</dd></div>
      <div><dt>Évaluées sérieusement</dt><dd className="down">Aucune</dd></div>
      <div><dt>Accompagnement des chômeurs de longue durée</dt><dd className="up">Rentable en 2 à 3 ans</dd></div>
    </dl>
  ),
};

/** En-tête d'un bloc : numéro et question. */
export function BlockHead({ n, q }: { n: number; q: string }) {
  return (
    <p className="block-q">{n}. {q}</p>
  );
}

export function Insights() {
  return (
    <>
      {constats.map((c, i) => (
        <section key={c.id} id={c.id} className={`band${i % 2 === 0 ? " alt" : ""}`} aria-labelledby={`h-${c.id}`}>
          <div className="ins">
            <div className="ins-text">
              <BlockHead n={i + 1} q={c.question} />
              <h2 id={`h-${c.id}`}>{c.titre}</h2>
              <p className="insight-text">{c.phrase}</p>
              <a className="more-link" href={`${base}constats/${c.id}/`}>Voir le détail et les preuves</a>
            </div>
            <div className="ins-vis">{visuels[c.id]}</div>
          </div>
        </section>
      ))}
    </>
  );
}
