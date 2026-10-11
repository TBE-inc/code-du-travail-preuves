import type { ReactNode } from "react";
import { CostChart, EplChart, EssChart, Stairs, WellbyCalculator } from "../components/charts";
import { Fn, Law, Level } from "../components/ui";

/** Page de détail d'un constat : chiffre clé, explication, visuel complet, puis preuves et limites. */
function Constat({ fig, cap, level, proof, children }: { id: string; fig: ReactNode; cap: ReactNode; level: "forte" | "moyenne" | "faible"; proof: ReactNode; children: ReactNode }) {
  return (
    <>
      <section aria-label="Le constat">
        <div className="keyfig">
          <p className="fig"><span>{fig}</span></p>
          <p className="cap">{cap}</p>
        </div>
        {children}
      </section>
      <section aria-labelledby="h-preuves">
        <div className="stack">
          <h2 id="h-preuves">Preuves et limites</h2>
          <p><Level kind={level} /></p>
          {proof}
        </div>
      </section>
    </>
  );
}

export function Chomage() {
  return (
    <Constat
      id="chomage"
      fig="−0,74 point"
      cap="de satisfaction de vie sur 10 pour un chômeur, à revenu égal. Un CDD : −0,15."
      level="moyenne"
      proof={
        <>
          <p>Enquête sociale européenne, 40 000 personnes dans 32 pays, 2020-2024.<Fn id="ess" /> Plan d'analyse écrit avant de voir les résultats. Ce sont des associations : des personnes moins heureuses peuvent aussi être plus souvent au chômage. Les études qui suivent les mêmes personnes dans le temps trouvent des effets du même ordre.</p>
          <p>Le chômage long laisse une trace : −0,36 point même après avoir retrouvé un emploi. L'autonomie au travail pèse presque autant que l'emploi lui-même.</p>
          <p>Une perte d'emploi augmente la mortalité de 15 à 20 % sur les vingt années suivantes,<Fn id="sullivan" /> et environ un suicide sur cinq dans le monde est associé au chômage.<Fn id="nordt" /></p>
          <p>Un « point de bien-être pendant un an » vaut 13 000 £ (2019) selon le Trésor britannique, soit environ 18 000 € aujourd'hui.<Fn id="wellby" /> Calculez ce que coûte le chômage :</p>
          <WellbyCalculator />
        </>
      }
    >
      <p>Une grande enquête européenne demande à chacun : « Êtes-vous satisfait de votre vie, de 0 à 10 ? ». On a comparé des personnes semblables, <strong>revenu compris</strong>, qui ne diffèrent que par leur situation d'emploi. Perdre son emploi coûte bien plus que de l'argent. Une réforme se juge donc d'abord à son effet sur l'emploi.</p>
      <EssChart />
    </Constat>
  );
}

export function Paperasse() {
  return (
    <Constat
      id="paperasse"
      fig="1,2 à 7,3 Md€"
      cap="par an de démarches imposées par le Code, selon le temps réellement passé."
      level="moyenne"
      proof={
        <>
          <p>Méthode de l'OCDE et de l'Union européenne :<Fn id="scmmanual" /> nombre de fois par an × temps passé × 44,30 € de l'heure,<Fn id="eurostat" /> moins ce que l'entreprise ferait de toute façon. Volumes et coût horaire mesurés.<Fn id="dares" /> Temps passé mesuré pour le document de risques<Fn id="hlg" /> et la paie, estimé pour le reste : d'où trois scénarios.</p>
          <p>Exemple : le CDD. Le Code impose huit mentions, et une erreur peut transformer le contrat en CDI. Il s'en signe 21,9 millions par an.</p>
          <Law cite="Article L1242-12">« Le contrat de travail à durée déterminée est établi par écrit et comporte la définition précise de son motif. A défaut, il est réputé conclu pour une durée indéterminée. […] »</Law>
          <p>La complexité de la paie vient surtout des cotisations sociales, qui relèvent du Code de la sécurité sociale.</p>
        </>
      }
    >
      <p>On a chiffré 23 démarches. Le gros de la facture : la paie, l'évaluation des risques, les fins de contrat et les heures des élus. Les cibles habituelles des discours de simplification, <mark>surlignées</mark>, pèsent très peu. Changez de scénario : l'ordre ne bouge presque pas.</p>
      <CostChart />
    </Constat>
  );
}

export function Seuil() {
  return (
    <Constat
      id="seuil"
      fig="+52 heures"
      cap="de délégation par mois en passant de 49 à 50 salariés, plus 2 200 à 14 800 € de démarches par an."
      level="moyenne"
      proof={
        <>
          <p>L'étude de référence porte sur toutes les entreprises françaises de 2002 à 2007, avant les réformes de 2017 et 2019 : elle observe une accumulation anormale d'entreprises à 49 salariés.<Fn id="garicano" /> Notre propre calcul, par une autre méthode, arrive au même ordre de grandeur : 1 à 2 % de la masse salariale.</p>
          <p>Relever le seuil à 100 déplacerait simplement l'embouteillage à 99.</p>
        </>
      }
    >
      <p>Beaucoup d'obligations se déclenchent d'un coup à 50 salariés, alors des entreprises évitent de grandir. Les salariés en sont les premiers perdants. La solution n'est pas de relever le seuil mais de <strong>le lisser</strong> : faire monter les obligations progressivement. Faites glisser l'effectif :</p>
      <Stairs />
    </Constat>
  );
}

export function Licenciement() {
  return (
    <Constat
      id="licenciement"
      fig="Aucun effet net"
      cap="sur le chômage d'une protection plus forte du CDI : les études des deux bords s'accordent."
      level="forte"
      proof={
        <>
          <p><strong>Notre test :</strong> si la protection contre le licenciement protégeait le bien-être, chômeurs et salariés en CDD iraient mieux dans les pays très protecteurs. On ne détecte rien de tel sur 25 pays.<Fn id="ess" /> C'est peu de pays pour conclure.</p>
          <p><strong>Déjà fait :</strong> la forme du licenciement a été simplifiée en 2017. Une erreur de procédure coûte au plus un mois de salaire.</p>
          <Law cite="Article L1235-2, depuis 2017">« Lorsqu'une irrégularité a été commise au cours de la procédure […] mais pour une cause réelle et sérieuse, le juge accorde au salarié […] une indemnité qui ne peut être supérieure à un mois de salaire. »</Law>
          <EplChart />
        </>
      }
    >
      <p>C'est le débat le plus idéologique du droit du travail. Voici ce que disent les études des deux bords, côte à côte.</p>
      <div className="tbl">
        <table className="plain">
          <thead><tr><th>Question</th><th>Ce que trouvent les études</th></tr></thead>
          <tbody>
            <tr><td>Protéger plus le CDI augmente-t-il le chômage ?</td><td><strong>Pas d'effet net démontré</strong>, chez les partisans de la flexibilité<Fn id="cp" /> comme chez ses critiques.<Fn id="avdagic" /><Fn id="howell" /></td></tr>
            <tr><td>Cela freine-t-il la productivité ?</td><td><strong>Oui</strong> : les emplois passent moins vite des entreprises en déclin vers celles qui grandissent.<Fn id="bassanini" /> Mais trop de rotation nuit à l'apprentissage.<Fn id="vergeer" /></td></tr>
            <tr><td>Cela crée-t-il deux classes de salariés ?</td><td><strong>Oui</strong> : CDI très protégés d'un côté, CDD précaires de l'autre, surtout pour les jeunes.<Fn id="cp" /></td></tr>
            <tr><td>Qu'ont donné les réformes à l'étranger ?</td><td><strong>Italie</strong> : plus d'embauches en CDI.<Fn id="boeri" /> <strong>Allemagne</strong> : chômage plus court, salaires en baisse.<Fn id="hartz" /> <strong>Danemark</strong> : ça marche, avec un accompagnement massif des chômeurs.<Fn id="dk" /></td></tr>
          </tbody>
        </table>
      </div>
      <p>On peut donc assouplir, <strong>à condition de sécuriser la transition</strong> des personnes licenciées. Une piste : celui qui licencie paie le coût réel qu'il fait porter à l'assurance chômage, et en échange le juge contrôle moins le motif.<Fn id="bt" /></p>
    </Constat>
  );
}

export function Assurance() {
  return (
    <Constat
      id="assurance"
      fig="3 réformes"
      cap="des allocations chômage depuis 2021, aucune encore évaluée sérieusement."
      level="forte"
      proof={
        <>
          <p>Plus de 200 évaluations rassemblées sur l'accompagnement des chômeurs.<Fn id="ckw" /> Baisser les allocations raccourcit le chômage sans réduire le nombre de chômeurs.<Fn id="hartz" /></p>
          <p>Exigences envers les chômeurs (OCDE 2024) : la France demande moins de mobilité que ses voisins (0,75 contre 1,2 à 1,4) mais sanctionne plus (0,94 contre 0,72).<Fn id="oecdact" /></p>
          <p>Les ruptures conventionnelles pèsent 9,4 milliards d'euros, soit 26 % des allocations.<Fn id="senat" /></p>
        </>
      }
    >
      <p>Les règles d'indemnisation sont négociées par les syndicats et le patronat, hors du Code du travail.<Fn id="unedic" /> Ce qui marche le mieux selon les études : <strong>accompagner les chômeurs de longue durée</strong>, un investissement qui paie après deux à trois ans.</p>
      <dl className="chrono">
        <div><dt>2021</dt><dd>Allocation calculée sur le revenu moyen, jours non travaillés compris. Bonus-malus dans 7 secteurs.</dd></div>
        <div><dt>2023</dt><dd>Durée d'indemnisation réduite de 25 % quand l'emploi va bien.</dd></div>
        <div><dt>2026</dt><dd>Après une rupture conventionnelle, durée ramenée de 18 à 15 mois.</dd></div>
      </dl>
    </Constat>
  );
}
