import { Hero } from "./sections/Hero";
import { Assurance, Chomage, Licenciement, Paperasse, Seuil } from "./sections/Constats";
import { Explorer, Propositions } from "./sections/Fin";

/** Accueil : les cinq constats, puis ce qu'on propose et les outils. */
export default function App() {
  return (
    <>
      <Hero />
      <Chomage />
      <Paperasse />
      <Seuil />
      <Licenciement />
      <Assurance />
      <Propositions />
      <Explorer />
    </>
  );
}
