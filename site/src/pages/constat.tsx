import type { ReactElement } from "react";
import { mount, PageHead } from "../components/Layout";
import { constats, type ConstatId } from "../data/constats";
import { Assurance, Chomage, Licenciement, Paperasse, Seuil } from "../sections/Constats";

const base = import.meta.env.BASE_URL;
const contenus: Record<ConstatId, () => ReactElement> = { chomage: Chomage, paperasse: Paperasse, seuil: Seuil, licenciement: Licenciement, assurance: Assurance };

function Page({ id }: { id: string }) {
  const i = constats.findIndex((c) => c.id === id);
  if (i < 0) return <p>Ce constat n'existe pas. <a href={base}>Retour à l'accueil</a>.</p>;
  const c = constats[i];
  const Contenu = contenus[c.id];
  const prev = constats[i - 1], next = constats[i + 1];
  return (
    <>
      <PageHead title={c.titre} lede={c.phrase} crumb={<><a href={`${base}#${c.id}`}>Constats</a> / Question {i + 1} sur {constats.length} : {c.question}</>} />
      <Contenu />
      <nav className="pager" aria-label="Constats">
        {prev ? <a href={`${base}constats/${prev.id}/`}><span className="meta">Précédent</span>{prev.titre}</a> : <a href={base}><span className="meta">Retour</span>L'accueil et le parcours</a>}
        <ol className="dots" aria-label={`Constat ${i + 1} sur ${constats.length}`}>
          {constats.map((k, j) => <li key={k.id}><a href={`${base}constats/${k.id}/`} aria-current={j === i ? "page" : undefined} title={k.court}><span className="sr">{k.court}</span></a></li>)}
        </ol>
        {next ? <a className="r" href={`${base}constats/${next.id}/`}><span className="meta">Suivant</span>{next.titre}</a> : <a className="r" href={`${base}propositions/`}><span className="meta">Ensuite</span>Ce qu'on propose</a>}
      </nav>
    </>
  );
}

const id = document.getElementById("root")?.dataset.slug ?? "";
mount("constat", <Page id={id} />);
