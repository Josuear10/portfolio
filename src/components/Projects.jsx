import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';

export function Shot({ project, tall = false }) {
  return (
    <div className={`shot${tall ? ' shot--tall' : ''}`} style={{ background: project.tint }}>
      {project.image && <img src={project.image} alt={`Captura de ${project.name}`} />}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="section__head">
        <h2>Proyectos <span className="muted">destacados</span></h2>
        <p>Web · Backend · iOS · IA</p>
      </div>
      <div className="projects">
        {projects.map((p) => (
          <article key={p.slug} className="card project">
            <div className="project__media">
              <span className="tag tag--float">{p.kind}</span>
              <Shot project={p} />
            </div>
            <div className="project__body">
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <ul className="chips">
                {p.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className="project__links">
                <Link to={`/proyectos/${p.slug}`} className="link-accent">Ver case study →</Link>
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Repo</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
