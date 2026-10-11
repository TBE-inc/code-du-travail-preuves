import { Fragment } from "react";
import { mount, PageHead } from "../components/Layout";
import { Fn, Row } from "../components/ui";
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
  if (!a) return <p>Cette fiche n'existe pas. <a href={`${base}propositions/`}>Voir tous les amendements</a>.</p>;
  const i = amendements.indexOf(a);
  const next = amendements[(i + 1) % amendements.length];
  return (
    <>
      <PageHead title={a.titre} lede={a.resume} crumb={<><a href={`${base}propositions/`}>Propositions</a>, amendement {i + 1} sur {amendements.length}</>}>
        <p className="verdict-line">
          <span className={`v-${a.verdict}`}>{verdictLabel[a.verdict]}.</span> {a.gain}.
        </p>
      </PageHead>

      <section aria-labelledby="h-texte">
        <Row>
          <h2 id="h-texte">Le texte</h2>
          <blockquote className="law">
            <cite>{a.article}, en vigueur le 8 octobre 2026<Fn id="code" /></cite>
            <p>{a.actuel}</p>
          </blockquote>
          <h3>Proposé</h3>
          <Redline segments={a.propose} />
          <p className="meta"><del>Barré</del> : ce qu'on retire. <ins>Souligné</ins> : ce qu'on ajoute.</p>
        </Row>
      </section>

      <section aria-labelledby="h-inchange">
        <Row>
          <h2 id="h-inchange">Ce qui ne change pas</h2>
          <ul className="plainlist">{a.inchange.map((t) => <li key={t}>{t}</li>)}</ul>
        </Row>
      </section>

      <section aria-labelledby="h-pourquoi">
        <Row>
          <h2 id="h-pourquoi">Pourquoi</h2>
          <ul className="plainlist">
            {a.pourquoi.map((p) => (
              <li key={p.texte}>{p.texte}{p.sources.map((s) => <Fn key={s} id={s} />)}</li>
            ))}
          </ul>
        </Row>
      </section>

      <section aria-labelledby="h-perd">
        <Row>
          <h2 id="h-perd">Qui perd</h2>
          <p>{a.quiPerd}</p>
          <p><strong>Suivi proposé :</strong> {a.suivi}</p>
        </Row>
      </section>

      <section aria-labelledby="h-vues">
        <Row>
          <h2 id="h-vues">Trois regards contradictoires</h2>
          <dl className="views3">
            <div><dt>Regard libéral</dt><dd>{a.vues.liberal}</dd></div>
            <div><dt>Regard syndical</dt><dd>{a.vues.syndical}</dd></div>
            <div><dt>Regard juridique</dt><dd>{a.vues.juridique}</dd></div>
          </dl>
        </Row>
      </section>

      <section aria-labelledby="h-suite">
        <Row>
          <h2 id="h-suite">Et ensuite</h2>
          <p>
            Fiche de travail complète dans le dépôt : <a href={`https://github.com/TBE-inc/code-du-travail-preuves/blob/main/${a.fichier}`} rel="noopener">{a.fichier}</a>.
            Ce texte n'est pas un avis juridique : il doit être relu par un juriste en droit du travail.
          </p>
          <p>
            Amendement suivant : <a href={`${base}amendements/${next.slug}/`}>{next.titre}</a>. <a href={`${base}propositions/`}>Tous les amendements</a>. <a href={`${base}methode/#sources`}>Toutes les sources</a>.
          </p>
        </Row>
      </section>
    </>
  );
}

const slug = document.getElementById("root")?.dataset.slug ?? "";
mount("propositions", <Fiche slug={slug} />);
