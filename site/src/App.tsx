import { Hero } from "./sections/Hero";
import { Parcours } from "./sections/Parcours";
import { Insights } from "./sections/Insights";
import { Propositions, Resume } from "./sections/Fin";

/** Accueil : cinq constats en une image chacun, puis ce qu'on propose et les outils. */
export default function App() {
  return (
    <>
      <Parcours />
      <Hero />
      <Insights />
      <Propositions />
      <Resume />
    </>
  );
}
