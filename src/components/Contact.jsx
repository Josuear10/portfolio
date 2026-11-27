import { profile } from '../data/profile.js';

export default function Contact() {
  return (
    <section id="contacto" className="contact">
      <div>
        <h2>¿Construimos algo <span>juntos?</span></h2>
        <div className="contact__links">
          <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span>{profile.location} · {profile.timezone}</span>
        </div>
      </div>
      <a href={`mailto:${profile.email}`} className="btn btn--light">{profile.email}</a>
    </section>
  );
}
