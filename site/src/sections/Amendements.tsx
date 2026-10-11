import type { ReactNode } from "react";
import { Art, Fn, Proof, Row } from "../components/ui";

type Verdict = "good" | "cond" | "no";
const verdictLabel: Record<Verdict, string> = { good: "Gagnant partout", cond: "Sous condition", no: "Non retenu" };

const base = import.meta.env.BASE_URL;

function Amendment({ title, article, verdict, gain, children, note, slug }: { title: string; article: string; verdict: Verdict; gain: string; children: ReactNode; note: ReactNode; slug: string }) {
  return (
    <article className="stack" id={slug}>
      <h3>{title}</h3>
      <p className="verdict-line"><span className={`v-${verdict}`}>{verdictLabel[verdict]}.</span> {gain}</p>
      <div className="redline">
        <span className="art">{article}</span>
        <br />
        {children}
      </div>
      <Proof label="Garde-fous et perdants">
        {note}
        <p><a href={`${base}amendements/${slug}/`}>Lire la fiche complète : texte actuel, qui perd, trois regards contradictoires</a></p>
      </Proof>
    </article>
  );
}

export function Amendements() {
  return (
    <>
    <section id="amendements" aria-labelledby="h-amend">
      <Row>
        <h2 id="h-amend">Cinq amendements au Code</h2>
        <p>Chaque mesure est écrite comme un vrai article, après relecture du texte en vigueur. <del>Barré</del> : ce qu'on retire. <ins>Souligné</ins> : ce qu'on ajoute.</p>
      </Row>

      <Amendment
        title="Évaluer les risques sans paperasse inutile"
        slug="document-unique"
        article="Article R4121-2, 1°"
        verdict="good"
        gain="Environ 140 M€ par an."
        note={<p>La directive européenne autorise l'adaptation à la taille (article 9.2).<Fn id="dir89" /> On garde la mise à jour à chaque changement et la conservation pendant 40 ans, qui protège les victimes de maladies tardives comme l'amiante.</p>}
      >
        « La mise à jour du document unique d'évaluation des risques professionnels est réalisée : 1° Au moins chaque année dans les entreprises d'au moins <del>onze</del> <ins>cinquante</ins> salariés ; »
        <br />
        <ins>« Dans les entreprises de moins de cinquante salariés, le document établi avec l'outil numérique officiel est présumé conforme. »</ins>
      </Amendment>

      <Amendment
        title="Transposer la règle européenne sur l'égalité salariale, sans en rajouter"
        slug="transparence-salariale"
        article="Article L1142-8"
        verdict="good"
        gain="5 à 25 M€ par an, et une obligation de moins au seuil de 50."
        note={<p>La France devait transposer la directive avant juin 2026.<Fn id="dir970" /> <strong>Qui perd :</strong> les salariées des entreprises de 50 à 99 salariés perdent un indicateur public. À vérifier en 2030.</p>}
      >
        « Dans les entreprises d'au moins <del>cinquante</del> <ins>cent</ins> salariés, l'employeur publie <del>chaque année</del> <ins>selon la périodicité prévue par la directive (UE) 2023/970</ins> l'ensemble des indicateurs relatifs aux écarts de rémunération […] <ins>calculés à partir de la déclaration sociale nominative</ins>. »
      </Amendment>

      <Amendment
        title="CDD : une erreur de forme ne fait plus un CDI"
        slug="cdd"
        article="Article L1245-1, alinéa ajouté"
        verdict="good"
        gain="Sécurité juridique."
        note={<p>Un motif absent ou faux entraîne toujours la requalification. On a abandonné l'idée d'un contrat unique pour missions répétées : il aurait facilité l'enchaînement de contrats très courts.<Fn id="cae24" /></p>}
      >
        <ins>« L'omission d'une des mentions prévues aux 2° à 8° de l'article L. 1242-12 ne saurait, à elle seule, entraîner la requalification lorsque le motif du recours est précisément défini et réel. Elle ouvre droit à une indemnité qui ne peut être supérieure à un mois de salaire. »</ins>
      </Amendment>

      <Amendment
        title="Adoucir la marche des 50 salariés"
        slug="heures-de-delegation"
        article="Article R2314-1, tableau"
        verdict="cond"
        gain="25 à 150 M€ par an. La marche passe de +52 à +24 heures."
        note={<p><strong>Qui perd :</strong> les élus des entreprises de 50 à 99 salariés. Condition : réserver des heures à la santé et la sécurité, mesurer l'effet après quatre ans.</p>}
      >
        25 à 49 salariés : <del>20 h</del> <ins>24 h</ins> par mois
        <br />
        50 à 74 salariés : <del>72 h</del> <ins>48 h</ins> par mois
        <br />
        75 à 99 salariés : <del>95 h</del> <ins>76 h</ins> par mois
      </Amendment>

      <Amendment
        title="Rupture conventionnelle : validation immédiate des dossiers conformes"
        slug="rupture-conventionnelle"
        article="Article L1237-14"
        verdict="cond"
        gain="Quinze jours ouvrables de moins par rupture."
        note={<p>Risque : plus de ruptures, donc plus de dépenses pour l'assurance chômage. Seulement avec des règles d'indemnisation ajustées.</p>}
      >
        <ins>« Lorsque le contrôle automatisé réalisé lors du dépôt établit que le délai de rétractation a été respecté et que l'indemnité n'est pas inférieure au minimum légal, l'homologation est acquise dès le dépôt. »</ins>
      </Amendment>

    </section>
    <section id="hors-code" aria-labelledby="h-hors">
      <Row>
        <h2 id="h-hors">Hors du Code : l'assurance chômage</h2>
        <div className="tbl">
          <table className="plain">
            <thead><tr><th>Mesure</th><th>Verdict</th></tr></thead>
            <tbody>
              <tr><td>Tester chaque nouvelle règle sur une partie des chômeurs tirée au sort avant de la généraliser, comme au Danemark,<Fn id="dk" /> et évaluer d'abord les réformes 2021-2026</td><td className="v-good">Gagnant partout</td></tr>
              <tr><td>Accompagnement intensif des chômeurs de longue durée, avec formation<Fn id="ckw" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Exigences de mobilité alignées sur les pays voisins, couplées à cet accompagnement</td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Celui qui licencie paie : bonus-malus étendu au-delà de 7 secteurs, contre moins de contrôle par le juge (<Art>L5422-12</Art>)<Fn id="bt" /></td><td className="v-cond">Sous condition</td></tr>
              <tr><td>Baisser encore les allocations</td><td className="v-no">Non retenu</td></tr>
            </tbody>
          </table>
        </div>
      </Row>
    </section>
    </>
  );
}
