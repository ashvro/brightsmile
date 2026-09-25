import Reveal from '../layout/Reveal';
import './PageExtras.css';

const steps = [
  {
    title: 'Book Online',
    color: '#0f7d6d',
    text: 'Pick a time that suits you in under a minute — evenings and weekends available.',
  },
  {
    title: 'Consult & Diagnose',
    color: '#3fb5a0',
    text: 'Meet your dentist, share any concerns, and get a full digital assessment.',
  },
  {
    title: 'Personalized Plan',
    color: '#c9a84c',
    text: 'Receive a clear treatment plan and transparent quote before we begin.',
  },
  {
    title: 'Gentle Aftercare',
    color: '#4c86c0',
    text: 'Leave with complete aftercare guidance and our continued support.',
  },
];

const pad = n => String(n).padStart(2, '0');

export default function ServicesExtras() {
  return (
    <section className="fx-band path-section">
      <div className="container">
        <Reveal className="fx-head">
          <h2>A Simple Path to Great <span>Dental Care</span></h2>
        </Reveal>

        <div className="path-track">
          <svg
            className="path-route"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="path-route-line"
              d="M0 50 C6 50 9 6 12.5 8 C20 8 30 92 37.5 90 C45 90 55 8 62.5 8 C70 8 80 92 87.5 90 C91 90 94 50 100 50"
            />
            <path
              className="path-route-dash"
              d="M0 50 C6 50 9 6 12.5 8 C20 8 30 92 37.5 90 C45 90 55 8 62.5 8 C70 8 80 92 87.5 90 C91 90 94 50 100 50"
            />
          </svg>

          <span className="path-start">Start</span>
          <span className="path-finish">Finish</span>

          <div className="path-cells">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.12}
                className={`path-cell${i % 2 === 1 ? ' is-even' : ''}`}
                style={{ '--path-accent': s.color }}
              >
                <div className="path-card">
                  <span className="path-badge" aria-hidden="true">{pad(i + 1)}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}