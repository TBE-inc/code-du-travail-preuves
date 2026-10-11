import { CostChart, EplChart, EssChart, Stairs, WellbyCalculator } from "../components/charts";
import { Fn, Law, Level, Row } from "../components/ui";

export function Chomage() {
  return (
    <section id="chomage" aria-labelledby="h-chomage">
      <Row
        note={
          <>
            <p><Level kind="moyenne" />. 40 000 personnes dans 32 pays, 2020-2024. Plan d'analyse écrit avant de voir les résultats.</p>
            <p>Ce sont des associations : des personnes moins heureuses peuvent aussi être plus souvent au chômage. Les études qui suivent les mêmes personnes dans le temps trouvent des effets du même ordre.</p>
          </>
        }
      >
        <h2 id="h-chomage">Le chômage pèse cinq fois plus qu'un CDD sur le bien-être</h2>
        <p>Une grande enquête européenne pose la même question à tout le monde : « Êtes-vous satisfait de votre vie, de 0 à 10 ? ». On a comparé des personnes semblables (âge, sexe, études, <strong>revenu</strong>, pays) qui ne diffèrent que par leur situation d'emploi.<Fn id="ess" /></p>
      </Row>

      <Row
        note={
          <>
            <p><strong>À revenu égal</strong>, perdre son emploi coûte 0,74 point. Ce n'est donc pas qu'une affaire d'argent : statut, liens, estime de soi.</p>
            <p>Le chômage long laisse une trace : 0,36 point même après avoir retrouvé un emploi.</p>
            <p>L'autonomie au travail pèse presque autant que l'emploi lui-même.</p>
          </>
        }
      >
        <EssChart />
      </Row>

      <Row
        note={
          <>
            <p><strong>Un « point de bien-être pendant un an »</strong> vaut 13 000 £ (2019) selon le Trésor britannique, soit environ 18 000 € aujourd'hui.<Fn id="wellby" /></p>
            <p>Revenus non compris. Pour comparer : toutes les simplifications sûres proposées plus bas rapportent 100 à 550 millions d'euros par an.</p>
          </>
        }
      >
        <p>Ce n'est pas un détail. Une perte d'emploi augmente la mortalité de <strong>15 à 20 % sur les vingt années suivantes</strong>,<Fn id="sullivan" /> et environ un suicide sur cinq dans le monde est associé au chômage.<Fn id="nordt" /> Conséquence pour tout le reste : une réforme se juge d'abord à son effet sur l'emploi.</p>
        <WellbyCalculator />
      </Row>
    </section>
  );
}

export function Paperasse() {
  return (
    <section id="paperasse" aria-labelledby="h-paperasse">
      <Row note={<p><Level kind="moyenne" />. Volumes et coût horaire mesurés. Temps passé : mesuré pour le document de risques<Fn id="hlg" /> et la paie, estimé pour le reste. D'où trois scénarios.</p>}>
        <h2 id="h-paperasse">La paperasse coûte 1 à 7 milliards par an, mais pas là où on le croit</h2>
        <p>Prenons le contrat à durée déterminée. Le Code impose huit mentions, et une erreur peut transformer le contrat en CDI.</p>
        <Law cite="Article L1242-12">« Le contrat de travail à durée déterminée est établi par écrit et comporte la définition précise de son motif. A défaut, il est réputé conclu pour une durée indéterminée. Il comporte notamment : 1° Le nom et la qualification professionnelle de la personne remplacée […] »</Law>
        <p>Il se signe <span className="num">21,9 millions</span> de CDD par an.<Fn id="dares" /> À quelques minutes chacun, la facture monte vite. On a fait ce calcul pour 23 démarches, avec la méthode qu'utilisent l'OCDE et l'Union européenne :<Fn id="scmmanual" /> nombre de fois par an × temps passé × 44,30 € de l'heure,<Fn id="eurostat" /> moins ce que l'entreprise ferait de toute façon.</p>
      </Row>
      <Row
        note={
          <>
            <p><strong>Changez de scénario : l'ordre ne bouge presque pas.</strong></p>
            <p>Les cibles habituelles des discours de simplification, <mark>surlignées</mark> dans le graphique, pèsent très peu.</p>
            <p>La complexité de la paie vient surtout des cotisations sociales, qui relèvent du Code de la sécurité sociale.</p>
          </>
        }
      >
        <CostChart />
      </Row>
    </section>
  );
}

export function Seuil() {
  return (
    <section id="seuil" aria-labelledby="h-seuil">
      <Row note={<p><Level kind="moyenne" />. Une étude solide sur les données de 2002 à 2007, avant les réformes de 2017 et 2019. Notre propre calcul, par une autre méthode, arrive au même ordre de grandeur : 1 à 2 % de la masse salariale.</p>}>
        <h2 id="h-seuil">Le seuil de 50 salariés freine les entreprises, et les salariés en paient le prix</h2>
        <p>Beaucoup d'obligations se déclenchent d'un coup à 50 salariés. Sur les données de toutes les entreprises françaises, on observe une accumulation anormale d'entreprises à 49 salariés : elles évitent de grandir.<Fn id="garicano" /></p>
      </Row>
      <Row
        note={
          <>
            <p><strong>Passer de 49 à 50 salariés</strong> coûte chaque année 2 200 à 14 800 € de démarches en plus, et jusqu'à 27 600 € d'heures de délégation.</p>
            <p><strong>Relever le seuil</strong> à 100 déplacerait simplement l'embouteillage à 99. <strong>Le lisser</strong>, en faisant monter les obligations progressivement, supprime l'effet de marche.</p>
          </>
        }
      >
        <Stairs />
      </Row>
    </section>
  );
}

export function Licenciement() {
  return (
    <section id="licenciement" aria-labelledby="h-lic">
      <Row note={<p><Level kind="forte" /> sur l'absence d'effet net sur l'emploi : les revues favorables à la flexibilité et celles qui la critiquent concluent la même chose.</p>}>
        <h2 id="h-lic">Faciliter le licenciement ne crée pas d'emplois en soi, mais rend l'économie plus productive</h2>
        <p>C'est le débat le plus idéologique du droit du travail. Voici ce que disent les études des deux bords, mises côte à côte.</p>
      </Row>
      <Row note={<p><strong>Notre test :</strong> si la protection contre le licenciement protégeait le bien-être, chômeurs et salariés en CDD iraient mieux dans les pays très protecteurs. On ne détecte rien de tel sur 25 pays.<Fn id="ess" /> C'est peu de pays pour conclure.</p>}>
        <div className="tbl">
          <table className="plain">
            <thead><tr><th>Question</th><th>Ce que trouvent les études</th></tr></thead>
            <tbody>
              <tr><td>Protéger plus fortement le CDI augmente-t-il le chômage ?</td><td><strong>Pas d'effet net démontré</strong>, chez les partisans de la flexibilité<Fn id="cp" /> comme chez ses critiques.<Fn id="avdagic" /><Fn id="howell" /></td></tr>
              <tr><td>Cela freine-t-il la productivité ?</td><td><strong>Oui</strong> : les emplois passent moins vite des entreprises en déclin vers celles qui grandissent.<Fn id="bassanini" /> Contre-argument : trop de rotation nuit à l'apprentissage.<Fn id="vergeer" /></td></tr>
              <tr><td>Cela crée-t-il deux classes de salariés ?</td><td><strong>Oui</strong> : CDI très protégés d'un côté, CDD précaires de l'autre, surtout pour les jeunes et les moins qualifiés.<Fn id="cp" /></td></tr>
              <tr><td>Qu'ont donné les réformes à l'étranger ?</td><td><strong>Italie</strong> : plus d'embauches en CDI.<Fn id="boeri" /> <strong>Allemagne</strong> : chômage plus court, mais pas moins de chômeurs et des salaires en baisse.<Fn id="hartz" /> <strong>Danemark</strong> : ça marche, avec un accompagnement des chômeurs massif et obligatoire.<Fn id="dk" /></td></tr>
            </tbody>
          </table>
        </div>
      </Row>
      <Row note={<p><strong>Déjà fait :</strong> la simplification de la forme du licenciement date de 2017. Une erreur de procédure coûte au plus un mois de salaire. Il reste peu à gagner de ce côté.</p>}>
        <EplChart />
        <p>On peut donc assouplir, <strong>à condition de sécuriser la transition</strong> des personnes licenciées, sinon santé et salaires en pâtissent. Une piste cohérente : <strong>celui qui licencie paie</strong> le coût réel qu'il fait porter à l'assurance chômage, et en échange le juge contrôle moins le motif.<Fn id="bt" /></p>
        <Law cite="Article L1235-2, depuis 2017">« Lorsqu'une irrégularité a été commise au cours de la procédure […] mais pour une cause réelle et sérieuse, le juge accorde au salarié […] une indemnité qui ne peut être supérieure à un mois de salaire. »</Law>
      </Row>
    </section>
  );
}

export function Assurance() {
  return (
    <section id="assurance" aria-labelledby="h-ac">
      <Row
        note={
          <>
            <p><Level kind="forte" /> sur l'accompagnement : plus de 200 évaluations rassemblées.</p>
            <p><strong>Exigences envers les chômeurs</strong> (OCDE 2024) : la France demande moins de mobilité que ses voisins (0,75 contre 1,2 à 1,4) mais sanctionne plus (0,94 contre 0,72).<Fn id="oecdact" /></p>
          </>
        }
      >
        <h2 id="h-ac">Les vrais leviers sur le chômage sont hors du Code du travail</h2>
        <p>Les règles d'indemnisation des chômeurs sont négociées par les syndicats et le patronat. Avant de proposer quoi que ce soit, on a vérifié ce qui existe déjà. Le durcissement des allocations a eu lieu trois fois.<Fn id="unedic" /></p>
        <dl className="chrono">
          <div><dt>2021</dt><dd>L'allocation est calculée sur le revenu moyen, jours non travaillés compris. Bonus-malus sur les cotisations dans 7 secteurs.</dd></div>
          <div><dt>2023</dt><dd>Durée d'indemnisation réduite de 25 % quand le marché du travail va bien.</dd></div>
          <div><dt>2026</dt><dd>Après une rupture conventionnelle, durée ramenée de 18 à 15 mois. Ces ruptures pèsent 9,4 milliards d'euros, soit 26 % des allocations.<Fn id="senat" /></dd></div>
        </dl>
        <p><strong>Aucune de ces réformes n'a encore d'évaluation solide.</strong> Et les études disent que baisser les allocations raccourcit le chômage sans réduire le nombre de chômeurs,<Fn id="hartz" /> alors que l'accompagnement des chômeurs de longue durée paie après deux à trois ans.<Fn id="ckw" /></p>
      </Row>
    </section>
  );
}
