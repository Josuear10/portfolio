import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';

export default function Nav({ back = false }) {
  return (
    <nav className="nav">
      <div className="nav__left">
        {back ? (
          <Link to="/#proyectos" className="nav__back">← Todos los proyectos</Link>
        ) : (
          <>
            <Link to="/" className="logo">
              {profile.name}
              <span className="logo__dot" />
            </Link>
            <a href={`mailto:${profile.email}`} className="nav__email">{profile.email}</a>
          </>
        )}
      </div>
      {back ? (
        <Link to="/" className="logo">
          {profile.name}
          <span className="logo__dot" />
        </Link>
      ) : (
        <div className="nav__pill">
          <Link to="/#proyectos">Proyectos</Link>
          <Link to="/#sobre-mi">Sobre mí</Link>
          <Link to="/#contacto" className="is-dark">Contacto</Link>
        </div>
      )}
    </nav>
  );
}
