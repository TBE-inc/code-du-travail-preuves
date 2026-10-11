import { mount, PageHead } from "../components/Layout";
import { Amendements } from "../sections/Amendements";

mount(
  "propositions",
  <>
    <PageHead
      title="Nos propositions"
      lede="Cinq amendements au Code du travail, rédigés comme de vrais articles, et quatre pistes hors du Code. Chacun reçoit un verdict tiré des preuves."
    />
    <Amendements />
  </>,
);
