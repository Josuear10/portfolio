import { profile } from '../data/profile.js';

export default function About() {
  return (
    <section id="sobre-mi" className="card about">
      <h2>Sobre <span className="muted">mí</span></h2>
      <div>
        {profile.about.filter(Boolean).map((p) => <p key={p}>{p}</p>)}
        {profile.interests?.length > 0 && (
          <ul className="chips interests">
            {profile.interests.map((i) => <li key={i}>{i}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
