import Reveal from '../layout/Reveal';
import './PageExtras.css';

const steps = [
  {
    title: 'Book Online',
    text: 'Pick a time that suits you in under a minute — evenings and weekends available.',
  },
  {
    title: 'Consult & Diagnose',
    text: 'Meet your dentist, share any concerns, and get a full digital assessment.',
  },
  {
    title: 'Personalized Plan',
    text: 'Receive a clear treatment plan and transparent quote before we begin.',
  },
  {
    title: 'Gentle Aftercare',
    text: 'Leave with complete aftercare guidance and our continued support.',
  },
];

export default function ServicesExtras() {
  return (
    <section className="fx-band">
      <div className="container">
        <Reveal className="fx-head">
          <h2>A Simple Path to Great <span>Dental Care</span></h2>
        </Reveal>

        <div className="fx-steps">
          <div className="fx-rail" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="fx-step">
                <span className="fx-step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}