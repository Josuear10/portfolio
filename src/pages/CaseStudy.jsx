import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox.jsx';
import Nav from '../components/Nav.jsx';
import { Shot } from '../components/Projects.jsx';
import { getProject, projects } from '../data/projects.js';
import NotFound from './NotFound.jsx';

function Node({ node, variant = '' }) {
  return (
    <div className={`node ${variant}`}>
      <strong>{node.name}</strong>
      <span>{node.note}</span>
    </div>
  );
}

function Arrow({ vertical = false }) {
  return (
    <svg className={`flow-arrow${vertical ? ' flow-arrow--v' : ''}`} viewBox="0 0 40 24" aria-hidden="true">
      <path d="M4 8h30m-5-5 5 5-5 5" />
      <path d="M36 16H6m5-5-5 5 5 5" />
    </svg>
  );
}

function Diagram({ diagram }) {
  return (
    <div className="diagram">
      <div className="diagram__row">
        {diagram.row.map((node, i) => (
          <Fragment key={node.name}>
            {i > 0 && <Arrow />}
            <Node node={node} variant={node.variant ? `node--${node.variant}` : ''} />
          </Fragment>
        ))}
      </div>
      {diagram.below && (
        <div className="diagram__below">
          <Arrow vertical />
          <Node node={diagram.below} />
        </div>
      )}
    </div>
  );
}

function Gallery({ images, preview, onOpen }) {
  const visible = preview ? images.slice(0, preview) : images;
  const hidden = images.length - visible.length;
  return (
    <div className="gallery">
      {visible.map((img, i) => {
        const more = hidden > 0 && i === visible.length - 1;
        return (
          <button
            key={img.src}
            type="button"
            className="gallery__item"
            onClick={() => onOpen(i)}
            aria-label={more ? `Ver galería completa, ${images.length} imágenes` : `Ampliar: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            {more ? (
              <span className="gallery__more" aria-hidden="true">+{hidden}</span>
            ) : (
              <span className="gallery__hint" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function LegacyArchitecture({ steps }) {
  return (
    <div className="card arch">
      {steps.map((step, i) => (
        <div key={i} className="arch__step">
          {i > 0 && <span className="arch__arrow" aria-hidden="true">→</span>}
          {Array.isArray(step) ? (
            <div className="arch__stack">
              {step.map((n) => (
                <Node key={n.name} node={n} variant={n.tinted ? 'node--tinted' : ''} />
              ))}
            </div>
          ) : (
            <Node node={step} variant={step.primary ? 'node--primary' : ''} />
          )}
        </div>
      ))}
    </div>
  );
}

const gridClass = (items) => (items.length === 4 ? 'decisions decisions--pairs' : 'decisions');

export default function CaseStudy() {
  const { slug } = useParams();
  const [open, setOpen] = useState(null);
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const gallery = project.media?.gallery ?? [];

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const learned = Array.isArray(project.learned) ? project.learned : [project.learned].filter(Boolean);

  return (
    <div className="container container--narrow">
      <Nav back />
      <main>
        <header className="cs-header">
          <p className="eyebrow">Case study · {project.kind}</p>
          <h1>{project.name}</h1>
          <p className="cs-tagline">{project.tagline}</p>
          {(project.demo || project.repo) && (
            <div className="row">
              {project.demo && <a href={project.demo} className="btn btn--dark" target="_blank" rel="noreferrer">Probar demo</a>}
              {project.repo && <a href={project.repo} className="btn btn--outline" target="_blank" rel="noreferrer">Ver código</a>}
            </div>
          )}
        </header>

        <dl className="card cs-meta">
          {project.meta.filter(([, v]) => v).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        {project.media ? (
          <div className="media">
            {project.media.video && (
              <video
                className="media__video"
                src={project.media.video}
                poster={project.media.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`Demo de ${project.name}`}
              />
            )}
            {gallery.length > 0 && <Gallery images={gallery} preview={project.media.preview} onOpen={setOpen} />}
          </div>
        ) : (
          <Shot project={project} tall />
        )}

        <section className="cs-split">
          <h2>Cómo nació</h2>
          <p>{project.origin}</p>
        </section>

        <section className="cs-block">
          <h2>Arquitectura</h2>
          {project.diagram ? (
            <div className="card arch-card">
              <Diagram diagram={project.diagram} />
              {project.flow?.length > 0 && (
                <ol className="flow">
                  {project.flow.map(([title, text]) => (
                    <li key={title}>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ) : (
            <LegacyArchitecture steps={project.architecture} />
          )}
        </section>

        {project.database && (
          <section className="cs-block">
            <h2>Base de datos</h2>
            <div className={`tables${project.database.layout === 'masonry' ? ' tables--masonry' : ''}`}>
              {project.database.tables.map((table) => (
                <div key={table.name} className="card db-table">
                  <div className="db-table__head">
                    <code>{table.name}</code>
                    <span>{table.note}</span>
                  </div>
                  <table>
                    <tbody>
                      {table.columns.map(([col, type, note, key]) => (
                        <tr key={col} className={key ? 'is-key' : ''}>
                          <td><code>{col}</code></td>
                          <td>{type}</td>
                          <td>{note === 'PK' ? <span className="pk">PK</span> : note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            {project.database.relations && (
              <ul className="relations" aria-label="Relaciones entre tablas">
                {project.database.relations.map((r) => <li key={r}>{r}</li>)}
              </ul>
            )}
            <div className={gridClass(project.database.points)}>
              {project.database.points.map(([title, text]) => (
                <div key={title} className="card decision">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="cs-block">
          <h2>Decisiones técnicas</h2>
          <div className={gridClass(project.decisions)}>
            {project.decisions.map(([title, text]) => (
              <div key={title} className="card decision">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-split">
          <h2>Qué aprendí</h2>
          {learned.length > 0 ? (
            <ul className="learned">
              {learned.map((item) =>
                Array.isArray(item) ? (
                  <li key={item[0]}>
                    <strong>{item[0]}.</strong> {item[1]}
                  </li>
                ) : (
                  <li key={item}>{item}</li>
                ),
              )}
            </ul>
          ) : (
            <p />
          )}
        </section>

        {open !== null && (
          <Lightbox images={gallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
        )}

        <Link to={`/proyectos/${next.slug}`} className="next">
          <span>
            <small>Siguiente proyecto</small>
            <strong>{next.name}</strong>
          </span>
          <span>Ver case study →</span>
        </Link>
      </main>
    </div>
  );
}
