import { Fragment } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn } from "../components/ui";
import { amendementBySlug, amendements, type Segment } from "../data/amendements";

const base = import.meta.env.BASE_URL;
const verdictLabel = { good: "Gagnant partout", cond: "Sous condition" } as const;

function Redline({ segments }: { segments: Segment[] }) {
  return (
    <div className="redline">
      {segments.map((s, i) => {
        if (typeof s === "string") return <Fragment key={i}>{s}</Fragment>;
        if ("del" in s) return <del key={i}>{s.del}</del>;
        if ("ins" in s) return <ins key={i}>{s.ins}</ins>;
        return <br key={i} />;
      })}
    </div>
  );
}

function Fiche({ slug }: { slug: string }) {
  const a = amendementBySlug(slug);
  if (!a) return <p>Cette fiche n'existe pas. <a href={`${base}propositions/`}>Voir les cinq amendements</a>.</p>;
  const i = amendements.indexOf(a);
  const prev = amendements[i - 1], next = amendements[i + 1];
  return (
    <>
      <PageHead title={a.titre} lede={a.resume} crumb={<><a href={`${base}propositions/`}>Propositions</a> / Amendement {i + 1} sur {amendements.length}</>}>
        <p className="verdict-line">
          <span className={`pill v-${a.verdict}`}>{verdictLabel[a.verdict]}</span> {a.gain}.
        </p>
      </PageHead>

      <section aria-labelledby="h-texte">
        <h2 id="h-texte">Le texte, avant et après</h2>
        <div className="diff">
          <div className="stack">
            <h3 className="diff-h">Aujourd'hui</h3>
            <blockquote className="law">
              <cite>Texte en vigueur le 8 octobre 2026<Fn id="code" /></cite>
              <p>{a.actuel}</p>
            </blockquote>
          </div>
          <div className="stack">
            <h3 className="diff-h">Proposé</h3>
            <Redline segments={a.propose} />
            <p className="meta"><del>Barré</del> : ce que nous retirons. <ins>Sur fond vert</ins> : ce que nous ajoutons.</p>
          </div>
        </div>
      </section>

      <section className="cols-75" aria-label="Pourquoi, et ce qui ne change pas">
        <div className="stack">
          <h2>Pourquoi cette mesure</h2>
          <ul className="plainlist">
            {a.pourquoi.map((p) => (
              <li key={p.texte}>{p.texte}{p.sources.map((s) => <Fn key={s} id={s} />)}</li>
            ))}
          </ul>
        </div>
        <div className="stack aside-box">
          <h2>Ce qui ne change pas</h2>
          <ul className="plainlist">{a.inchange.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="h-perd">
        <div className="stack">
          <h2 id="h-perd">Qui y perd</h2>
          <p>{a.quiPerd}</p>
          <p><strong>Comment vérifier ensuite :</strong> {a.suivi}</p>
        </div>
      </section>

      <section aria-labelledby="h-vues">
        <div className="stack">
          <h2 id="h-vues">Les objections, et nos réponses</h2>
          <dl className="views3">
            <div><dt>Du côté des employeurs et des libéraux</dt><dd>{a.vues.liberal}</dd></div>
            <div><dt>Du côté des syndicats</dt><dd>{a.vues.syndical}</dd></div>
            <div><dt>Du côté des juristes</dt><dd>{a.vues.juridique}</dd></div>
          </dl>
          <p className="meta">Fiche de travail complète : <a href={`https://github.com/TBE-inc/code-du-travail-preuves/blob/main/${a.fichier}`} rel="noopener">{a.fichier}</a>. Ce n'est pas un avis juridique : un juriste doit relire ce texte.</p>
        </div>
      </section>

      <nav className="pager" aria-label="Amendements">
        {prev ? <a href={`${base}amendements/${prev.slug}/`}><span className="meta">Précédent</span>{prev.titre}</a> : <a href={`${base}propositions/`}><span className="meta">Retour</span>Les cinq amendements</a>}
        <ol className="dots" aria-label={`Amendement ${i + 1} sur ${amendements.length}`}>
          {amendements.map((k, j) => <li key={k.slug}><a href={`${base}amendements/${k.slug}/`} aria-current={j === i ? "page" : undefined} title={k.titre}><span className="sr">{k.titre}</span></a></li>)}
        </ol>
        {next ? <a className="r" href={`${base}amendements/${next.slug}/`}><span className="meta">Suivant</span>{next.titre}</a> : <a className="r" href={`${base}propositions/`}><span className="meta">Retour</span>Les cinq amendements</a>}
      </nav>
    </>
  );
}

const slug = document.getElementById("root")?.dataset.slug ?? "";
mount("propositions", <Fiche slug={slug} />);
