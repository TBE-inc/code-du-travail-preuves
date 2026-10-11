import { Hero } from "./sections/Hero";
import { Assurance, Chomage, Licenciement, Paperasse, Seuil } from "./sections/Constats";
import { Amendements } from "./sections/Amendements";
import { Explorer, Methode, Sources } from "./sections/Fin";

/** Page d'accueil : le constat, les amendements, la méthode et les sources. */
export default function App() {
  return (
    <>
      <Hero />
      <Chomage />
      <Paperasse />
      <Seuil />
      <Licenciement />
      <Assurance />
      <Amendements />
      <Explorer />
      <Methode />
      <Sources />
    </>
  );
}
