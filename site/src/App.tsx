import { Hero } from "./sections/Hero";
import { Insights } from "./sections/Insights";
import { Contexte } from "./sections/Contexte";
import { Propositions, Resume } from "./sections/Fin";

/** Accueil : cinq constats en une image chacun, puis ce qu'on propose et les outils. */
export default function App() {
  return (
    <>
      <Hero />
      <Contexte />
      <Insights />
      <Propositions />
      <Resume />
    </>
  );
}
