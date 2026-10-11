import { mount, PageHead } from "../components/Layout";
import { Amendements } from "../sections/Amendements";

mount(
  "propositions",
  <>
    <PageHead
      title="Ce qu'on propose"
      lede="Cinq amendements au Code du travail, écrits comme de vrais articles, et quatre pistes hors du Code. Chacun a reçu un verdict à partir des preuves."
    >
      <dl className="gloss">
        <div><dt className="v-good">Gagnant partout</dt><dd>Améliore un objectif sans rien dégrader.</dd></div>
        <div><dt className="v-cond">Sous condition</dt><dd>Gain probable, seulement avec une mesure d'accompagnement.</dd></div>
        <div><dt className="v-no">Non retenu</dt><dd>Non soutenu par les preuves, ou déjà fait.</dd></div>
      </dl>
    </PageHead>
    <Amendements />
  </>,
);
