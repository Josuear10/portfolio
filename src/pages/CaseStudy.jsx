import { Link, useParams } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import { Shot } from '../components/Projects.jsx';
import { getProject, projects } from '../data/projects.js';
import NotFound from './NotFound.jsx';

function Node({ node }) {
  const cls = node.primary ? 'node node--primary' : node.tinted ? 'node node--tinted' : 'node';
  return (
    <div className={cls}>
      <strong>{node.name}</strong>
      <span>{node.note}</span>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

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

        <Shot project={project} tall />

        <section className="cs-split">
          <h2>El problema</h2>
          <p>{project.problem}</p>
        </section>

        <section className="cs-block">
          <h2>Arquitectura</h2>
          <div className="card arch">
            {project.architecture.map((step, i) => (
              <div key={i} className="arch__step">
                {i > 0 && <span className="arch__arrow" aria-hidden="true">→</span>}
                {Array.isArray(step) ? (
                  <div className="arch__stack">{step.map((n) => <Node key={n.name} node={n} />)}</div>
                ) : (
                  <Node node={step} />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="cs-block">
          <h2>Decisiones técnicas</h2>
          <div className="decisions">
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
          <p>{project.learned}</p>
        </section>

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
