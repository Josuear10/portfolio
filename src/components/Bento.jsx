import { experience, profile, streakDays, streakLabel } from '../data/profile.js';

function buildDots() {
  const total = 105;
  if (streakDays.length) {
    const done = new Set(streakDays);
    const today = new Date();
    return Array.from({ length: total }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (total - 1 - i));
      return done.has(d.toISOString().slice(0, 10)) ? 'on' : 'off';
    });
  }
  return Array.from({ length: total }, (_, i) => {
    if (i > 96) return 'future';
    const on = (i * 7 + 3) % 5 !== 0 && i % 11 !== 0 && i % 13 !== 4;
    return on ? (i % 9 === 0 ? 'soft' : 'on') : 'off';
  });
}

export default function Bento() {
  const dots = buildDots();
  return (
    <section className="bento">
      <div className="card">
        <span className="tag">Mi experiencia</span>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.title + e.meta} className={e.current ? 'is-current' : ''}>
              <strong>{e.title}</strong>
              <span>{e.meta}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <span className="tag">Constancia</span>
        <div className="dots" aria-hidden="true">
          {dots.map((state, i) => (
            <span key={i} className={`dot dot--${state}`} />
          ))}
        </div>
        <div className="dots__legend">
          <span>Cada punto, un día construyendo</span>
          {streakLabel && <strong>{streakLabel}</strong>}
        </div>
      </div>

      <div className="card card--accent">
        <span className="tag tag--glass">Ahora mismo</span>
        <p className="now">{profile.now}</p>
        {profile.nowTopics?.length > 0 && (
          <ul className="now-topics">
            {profile.nowTopics.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
