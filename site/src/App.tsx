import { Hero } from "./sections/Hero";
import { Assurance, Chomage, Licenciement, Paperasse, Seuil } from "./sections/Constats";
import { Amendements } from "./sections/Amendements";
import { Footer, Methode, Sources } from "./sections/Fin";

const toc: [string, string][] = [
  ["#chomage", "Le chômage"],
  ["#paperasse", "La paperasse"],
  ["#seuil", "Le seuil de 50"],
  ["#licenciement", "Le licenciement"],
  ["#assurance", "L'assurance chômage"],
  ["#amendements", "Les amendements"],
  ["#methode", "Méthode et limites"],
  ["#sources", "Sources"],
];

export default function App() {
  return (
    <>
      <nav className="toc" aria-label="Sommaire">
        <ul>
          {toc.map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
      </nav>
      <div className="page">
        <main>
          <Hero />
          <Chomage />
          <Paperasse />
          <Seuil />
          <Licenciement />
          <Assurance />
          <Amendements />
          <Methode />
          <Sources />
        </main>
        <Footer />
      </div>
    </>
  );
}
