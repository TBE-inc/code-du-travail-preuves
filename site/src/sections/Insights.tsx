import type { ReactNode } from "react";
import { Bars } from "../components/Bars";
import { constats, type ConstatId } from "../data/constats";
import { Folio } from "./Hero";

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
  seuil: <Folio />,
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
    <div className="block-head">
      <span className="block-n" aria-hidden="true">{n}</span>
      <p className="block-q">{q}</p>
    </div>
  );
}

export function Insights() {
  return (
    <>
      {constats.map((c, i) => (
        <section key={c.id} id={c.id} className="block" aria-labelledby={`h-${c.id}`}>
          <BlockHead n={i + 1} q={c.question} />
          <h2 id={`h-${c.id}`}>{c.titre}</h2>
          {visuels[c.id]}
          <p className="insight-text">{c.phrase}</p>
          <a className="more-link" href={`${base}constats/${c.id}/`}>Voir le détail et les preuves</a>
        </section>
      ))}
    </>
  );
}
