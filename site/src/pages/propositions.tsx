import { mount, PageHead } from "../components/Layout";
import { Amendements } from "../sections/Amendements";

mount(
  "propositions",
  <>
    <PageHead
      title="Ce qu'on propose"
      lede="Cinq amendements au Code du travail, écrits comme de vrais articles, et quatre pistes hors du Code. Chacun a reçu un verdict à partir des preuves."
    />
    <Amendements />
  </>,
);
