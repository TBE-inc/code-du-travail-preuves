import type { ReactNode } from "react";
import { CostChart, EplChart, EssChart, Stairs, WellbyCalculator } from "../components/charts";
import { Fn, Law, Proof } from "../components/ui";

/** Page de détail d'un constat : chiffre clé et explication | visuel complet, puis preuves repliées. */
function Constat({ fig, cap, level, proof, chart, extra, children }: { id: string; fig: ReactNode; cap: ReactNode; level: "forte" | "moyenne" | "faible"; proof: ReactNode; chart: ReactNode; extra?: ReactNode; children: ReactNode }) {
  return (
    <>
      <section className="split" aria-label="Le constat">
        <div className="stack">
          <div className="keyfig">
            <p className="fig"><span>{fig}</span></p>
            <p className="cap">{cap}</p>
          </div>
          {children}
        </div>
        <div className="split-vis">{chart}</div>
      </section>
      {extra}
      <section aria-label="Preuves et limites">
        <Proof level={level}>{proof}</Proof>
      </section>
    </>
  );
}

export function Chomage() {
  return (
    <Constat
      id="chomage"
      fig="−0,74 point"
      cap="sur 10 de satisfaction de vie pour un chômeur, par rapport à un salarié en CDI au même revenu. Pour un CDD : −0,15."
      chart={<EssChart />}
      level="moyenne"
      proof={
        <>
          <p>Enquête sociale européenne : 40 000 personnes dans 32 pays, de 2020 à 2024.<Fn id="ess" /> Nous avons écrit notre plan d'analyse avant de voir les résultats.</p>
          <p>Ce sont des corrélations : des personnes moins heureuses peuvent aussi tomber plus souvent au chômage. Mais les études qui suivent les mêmes personnes dans le temps trouvent des effets du même ordre.</p>
          <p>Le chômage long laisse une trace : −0,36 point, même après avoir retrouvé un emploi. L'autonomie au travail pèse presque autant que l'emploi lui-même.</p>
          <p>Après une perte d'emploi, le risque de décès augmente de 15 à 20 % pendant les vingt années suivantes.<Fn id="sullivan" /> Dans le monde, environ 1 suicide sur 5 est associé au chômage.<Fn id="nordt" /></p>
          <p>Le Trésor britannique estime qu'un point de bien-être pendant un an vaut 13 000 £ (2019), soit environ 18 000 € aujourd'hui.<Fn id="wellby" /> Calculez ce que coûte le chômage :</p>
          <WellbyCalculator />
        </>
      }
    >
      <p>Une grande enquête européenne pose la même question à tous : « Êtes-vous satisfait de votre vie, de 0 à 10 ? ». Nous avons comparé des personnes semblables, <strong>au même revenu</strong>, qui ne diffèrent que par leur situation d'emploi.</p>
      <p>Perdre son emploi coûte donc bien plus que le salaire perdu : une place, des liens, l'estime de soi.</p>
    </Constat>
  );
}

const effets: [string, string, ReactNode][] = [
  ["Facture directe (mesurée)", "1,2 à 7,3 Md€ par an", <>Temps passé × 44,30 € de l'heure, plus les frais externes.</>],
  ["Production immobilisée", "1,6 à 9,2 Md€ par an", <>Les mêmes heures valorisées à 65,1 €, ce que produit en moyenne une heure de travail en France.<Fn id="eurostatpib" /></>],
  ["Défense aux prud'hommes", "0,25 à 1 Md€ par an", <>130 000 demandes en 2025 ; frais d'avocat et temps passé estimés.<Fn id="justice" /></>],
  ["PIB à long terme, nos propositions", "+0,16 à +1,1 Md€ par an", <>1,6 à 2,1 € de PIB par euro de paperasse inutile en moins, selon les modèles de la Commission européenne.<Fn id="ce2007" /></>],
  ["Seuil de 50 salariés", "jusqu'à 4 à 5 % du PIB", <>Si les salaires sont rigides ; moins de 1 % s'ils s'ajustent.<Fn id="garicano" /></>],
];

/** Au-delà de la facture : ce que la paperasse empêche de produire. */
function AuDelaFacture() {
  return (
    <section aria-labelledby="h-audela">
      <div className="stack">
        <h2 id="h-audela">Au-delà de la facture : ce que la paperasse empêche de produire</h2>
        <p className="muted-note">La facture compte le temps passé. Elle ne dit pas ce que ce temps aurait produit, ni ce que l'incertitude juridique et les seuils empêchent de créer. Ces effets-là sont estimés : ils sont plus incertains que la facture.</p>
      </div>
      <dl className="effets">
        {effets.map(([t, v, d], i) => (
          <div key={t} className={i === effets.length - 1 ? "fort" : undefined}>
            <dt>{t}</dt>
            <dd className="effets-v">{v}</dd>
            <dd className="effets-d">{d}</dd>
          </div>
        ))}
      </dl>
      <p className="effets-bilan"><strong>À retenir.</strong> La paperasse coûte plus que sa facture. Mais même en comptant ce qu'elle empêche de produire, elle pèse au plus 0,3 % du PIB. Les seuils pèsent des dizaines de fois plus.</p>
      <p>Le risque juridique freine aussi l'embauche. En 2017, 1 entreprise sur 7 citait les risques juridiques d'un licenciement parmi ses freins à l'embauche. L'enquête couvre l'industrie, les services et le bâtiment, avec un résultat pondéré par les effectifs.<Fn id="inseebarrieres" /></p>
      <p className="meta">Calcul complet : <a href="https://github.com/TBE-inc/code-du-travail-preuves/blob/main/03-analyses/effets-indirects.md" rel="noopener">03-analyses/effets-indirects.md</a>.</p>
    </section>
  );
}

export function Paperasse() {
  return (
    <Constat
      id="paperasse"
      fig="1,2 à 7,3 Md€"
      cap="par an : le coût des démarches imposées par le Code, selon le temps qu'on y passe vraiment."
      chart={<CostChart />}
      extra={<AuDelaFacture />}
      level="moyenne"
      proof={
        <>
          <p>Méthode de l'OCDE et de l'Union européenne :<Fn id="scmmanual" /> nombre de fois par an × temps passé × 44,30 € de l'heure.<Fn id="eurostat" /> On retire ce que l'entreprise ferait de toute façon.</p>
          <p>Les volumes et le coût horaire sont mesurés.<Fn id="dares" /> Le temps passé est mesuré pour le document de risques<Fn id="hlg" /> et pour la paie. Il est estimé pour le reste, d'où trois scénarios.</p>
          <p>Exemple : le CDD. Le Code impose huit mentions, et une seule erreur peut transformer le contrat en CDI. Il s'en signe 21,9 millions par an.</p>
          <Law cite="Article L1242-12">« Le contrat de travail à durée déterminée est établi par écrit et comporte la définition précise de son motif. A défaut, il est réputé conclu pour une durée indéterminée. […] »</Law>
          <p>La paie est complexe surtout à cause des cotisations sociales. Elles relèvent du Code de la sécurité sociale, pas du Code du travail.</p>
        </>
      }
    >
      <p>Nous avons chiffré 23 démarches. L'essentiel de la facture vient de la paie, de l'évaluation des risques, des fins de contrat et des heures des élus.</p>
      <p>Les exemples souvent cités pour simplifier, <mark>surlignés</mark>, pèsent très peu. Changez de scénario : l'ordre ne bouge presque pas.</p>
    </Constat>
  );
}

export function Seuil() {
  return (
    <Constat
      id="seuil"
      fig="+52 heures"
      cap="de temps payé aux élus par mois quand on passe de 49 à 50 salariés. S'y ajoutent 2 200 à 14 800 € de démarches par an."
      chart={<Stairs />}
      level="moyenne"
      proof={
        <>
          <p>L'étude de référence porte sur toutes les entreprises françaises de 2002 à 2007, avant les réformes de 2017 et 2019. Elle observe trop d'entreprises à 49 salariés, et trop peu à 50.<Fn id="garicano" /></p>
          <p>Notre propre calcul, par une autre méthode, arrive au même ordre de grandeur : 1 à 2 % de la masse salariale.</p>
          <p>Relever le seuil à 100 salariés ne ferait que déplacer le blocage à 99.</p>
        </>
      }
    >
      <p>Beaucoup d'obligations commencent d'un coup à 50 salariés. Des entreprises évitent donc de grandir, et leurs salariés en sont les premiers perdants.</p>
      <p>Relever le seuil ne règle rien. Il faut <strong>le lisser</strong> : faire monter les obligations peu à peu. Faites glisser l'effectif :</p>
    </Constat>
  );
}

export function Licenciement() {
  return (
    <Constat
      id="licenciement"
      fig="Aucun effet net"
      cap="sur le chômage quand on protège davantage le CDI. Les études des deux camps s'accordent sur ce point."
      chart={
      <div className="tbl">
          <table className="plain">
            <thead><tr><th>Question</th><th>Ce que trouvent les études</th></tr></thead>
            <tbody>
              <tr><td>Mieux protéger le CDI augmente-t-il le chômage ?</td><td><strong>Pas d'effet net démontré</strong>, chez les partisans de la flexibilité<Fn id="cp" /> comme chez ses critiques.<Fn id="avdagic" /><Fn id="howell" /></td></tr>
              <tr><td>Cela freine-t-il la productivité ?</td><td><strong>Oui</strong> : les emplois passent moins vite des entreprises en déclin à celles qui grandissent.<Fn id="bassanini" /> Mais trop de départs nuit à l'apprentissage.<Fn id="vergeer" /></td></tr>
              <tr><td>Cela crée-t-il deux classes de salariés ?</td><td><strong>Oui</strong> : des CDI très protégés d'un côté, des CDD précaires de l'autre, surtout pour les jeunes.<Fn id="cp" /></td></tr>
              <tr><td>Qu'ont donné les réformes à l'étranger ?</td><td><strong>Italie</strong> : plus d'embauches en CDI.<Fn id="boeri" /> <strong>Allemagne</strong> : chômage plus court, salaires en baisse.<Fn id="hartz" /> <strong>Danemark</strong> : cela marche, avec un accompagnement très poussé des chômeurs.<Fn id="dk" /></td></tr>
            </tbody>
          </table>
        </div>
      }
      level="forte"
      proof={
        <>
          <p><strong>Notre test.</strong> Si la protection contre le licenciement protégeait le bien-être, les chômeurs et les salariés en CDD iraient mieux dans les pays très protecteurs. Nous ne voyons rien de tel sur 25 pays.<Fn id="ess" /> C'est peu de pays pour conclure.</p>
          <p><strong>Déjà fait.</strong> La forme du licenciement a été simplifiée en 2017 : une erreur de procédure coûte au plus un mois de salaire.</p>
          <Law cite="Article L1235-2, depuis 2017">« Lorsqu'une irrégularité a été commise au cours de la procédure […] mais pour une cause réelle et sérieuse, le juge accorde au salarié […] une indemnité qui ne peut être supérieure à un mois de salaire. »</Law>
          <EplChart />
        </>
      }
    >
      <p>C'est le débat le plus politique du droit du travail. Voici ce que disent les études des deux camps, côte à côte.</p>
      <p>On peut donc assouplir, <strong>à condition d'aider vraiment</strong> les personnes licenciées à rebondir. Une piste : l'employeur qui licencie paie le coût qu'il fait porter à l'assurance chômage. En échange, le juge contrôle moins le motif.<Fn id="bt" /></p>
    </Constat>
  );
}

export function Assurance() {
  return (
    <Constat
      id="assurance"
      fig="3 réformes"
      cap="des allocations chômage depuis 2021. Aucune n'a encore été évaluée de façon solide."
      chart={
      <dl className="chrono">
          <div><dt>2021</dt><dd>L'allocation est calculée sur le revenu moyen, jours non travaillés compris. Les cotisations varient selon les fins de contrat dans 7 secteurs.</dd></div>
          <div><dt>2023</dt><dd>L'indemnisation dure 25 % moins longtemps quand l'emploi va bien.</dd></div>
          <div><dt>2026</dt><dd>Après une rupture conventionnelle, l'indemnisation passe de 18 à 15 mois au plus.</dd></div>
        </dl>
      }
      level="forte"
      proof={
        <>
          <p>Plus de 200 évaluations de l'accompagnement des chômeurs ont été rassemblées.<Fn id="ckw" /> Baisser les allocations raccourcit le chômage, sans réduire le nombre de chômeurs.<Fn id="hartz" /></p>
          <p>Exigences envers les chômeurs, selon l'OCDE (2024) : la France demande moins de mobilité que ses voisins (indice de 0,75 contre 1,2 à 1,4), mais sanctionne plus (0,94 contre 0,72).<Fn id="oecdact" /></p>
          <p>Les ruptures conventionnelles coûtent 9,4 milliards d'euros par an, soit 26 % des allocations versées.<Fn id="senat" /></p>
        </>
      }
    >
      <p>Les syndicats et le patronat négocient les règles d'indemnisation, hors du Code du travail.<Fn id="unedic" /></p>
      <p>Selon les études, ce qui marche le mieux est d'<strong>accompagner les chômeurs de longue durée</strong>. Les résultats arrivent au bout de deux à trois ans.</p>
    </Constat>
  );
}
