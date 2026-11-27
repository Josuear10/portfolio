import { profile } from '../data/profile.js';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <h1 className="hero__title">
        <span>Hola, soy {profile.firstName}.</span>
        <span>
          <span className="muted">Soy </span>
          {profile.role}
          <span className="muted"> en</span>
        </span>
        <span className="hero__line">
          <span className="accent">{profile.location}.</span>
          <span className="status-dot" aria-hidden="true" />
        </span>
      </h1>
      <div className="hero__cta">
        <a href="#contacto" className="btn btn--dark">Hablemos</a>
        <p>{profile.intro}</p>
      </div>
    </section>
  );
}
