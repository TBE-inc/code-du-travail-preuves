import { mount, PageHead } from "../components/Layout";
import { Methode, Sources } from "../sections/Fin";

mount(
  "methode",
  <>
    <PageHead
      title="Méthode et sources"
      lede="Comment on a lu le Code, ce qu'on a corrigé en route, ce qu'on ne sait pas, et les 29 sources derrière chaque chiffre."
    />
    <Methode />
    <Sources />
  </>,
);
