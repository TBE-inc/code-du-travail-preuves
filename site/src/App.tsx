import { Hero } from "./sections/Hero";
import { Insights } from "./sections/Insights";
import { Explorer, Propositions } from "./sections/Fin";

/** Accueil : cinq constats en une image chacun, puis ce qu'on propose et les outils. */
export default function App() {
  return (
    <>
      <Hero />
      <Insights />
      <Propositions />
      <Explorer />
    </>
  );
}
