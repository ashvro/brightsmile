import Reveal from '../layout/Reveal';
import './PageExtras.css';

const milestones = [
  { year: '2009', title: 'The Practice Opens', text: 'Dr. Michael Carter founds BrightSmile with one surgery room and a promise of unhurried care.' },
  { year: '2015', title: 'Growing Our Team', text: 'Cosmetic and orthodontic specialists join, bringing implants and smile design under one roof.' },
  { year: '2020', title: 'Fully Digital Practice', text: 'We go paperless with digital X-rays, 3D imaging, and same-day treatment planning.' },
  { year: '2024', title: '20,000+ Smiles', text: 'One of the region\'s most trusted dental clinics, still family-owned and community-first.' },
];

export default function AboutExtras() {
  return (
    <section className="fx-band">
      <div className="container">
        <Reveal className="fx-head">
          <h2>Sixteen Years of Trust, <span>Milestone by Milestone</span></h2>
        </Reveal>

        <div className="fx-timeline">
          {milestones.map((m, i) => (
            <Reveal key={m.year} dir="left" delay={i * 0.12}>
              <div className="fx-mile">
                <span className="fx-mile-year">{m.year}</span>
                <div className="fx-mile-card">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}