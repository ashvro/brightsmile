import Reveal from '../layout/Reveal';
import { MdArrowForward, MdVerified } from 'react-icons/md';
import doctor1 from '../../assets/doctor1.png';
import doctor2 from '../../assets/doctor2.png';
import doctor3 from '../../assets/doctor3.png';
import './AboutTeam.css';

const team = [
  {
    img: doctor1,
    name: 'Dr. Michael Carter',
    role: 'Founder & Clinical Director',
    focus: 'General and family dentistry, digital diagnostics',
    years: '15+',
    creds: 'BDS · PGDip Clin Dent',
    tags: ['General', 'Family', 'Digital'],
    accent: '#0f7d6d',
  },
  {
    img: doctor2,
    name: 'Dr. Sarah Hayes',
    role: 'Orthodontics & Aligner Care',
    focus: 'Clear aligners, braces, and growth guidance',
    years: '10',
    creds: 'BDS · MSc Orthodontics',
    tags: ['Aligners', 'Braces', 'Kids'],
    accent: '#6d5bd0',
  },
  {
    img: doctor3,
    name: 'Dr. Daniel Johnson',
    role: 'Cosmetic & Restorative Dentistry',
    focus: 'Veneers, smile design, and implant restorations',
    years: '12',
    creds: 'BDS · MFDS RCS',
    tags: ['Veneers', 'Implants', 'Smile Design'],
    accent: '#c9a84c',
  },
];

export default function AboutTeam() {
  return (
    <section className="team-band section-pad">
      <div className="container">
        <Reveal className="team-head">
          <h2 className="section-title">The Dentists Behind <span>Your Smile</span></h2>
          <p className="section-subtitle">
            A close-knit team of specialists who share one standard — unhurried, honest,
            gentle care built on modern dentistry.
          </p>
        </Reveal>

        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.12}>
              <article className="team-card" style={{ '--tm-accent': member.accent }}>
                <div className="team-photo">
                  <img src={member.img} alt={member.name} loading="lazy" />
                  <span className="team-photo-badge" aria-hidden="true">
                    <strong>{member.years}</strong> yrs
                  </span>
                  <div className="team-photo-overlay">
                    <span className="team-overlay-label">
                      <MdVerified aria-hidden="true" /> {member.creds}
                    </span>
                  </div>
                </div>
                <div className="team-body">
                  <span className="team-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  <div className="team-tags">
                    {member.tags.map(t => (
                      <span key={t} className="team-tag">{t}</span>
                    ))}
                  </div>
                  <p className="team-focus">{member.focus}</p>
                  <div className="team-exp">
                    <strong>{member.years}</strong>
                    <span>Years of experience</span>
                  </div>
                  <a className="team-book" href="/#appointment">
                    Book with {member.name.split(' ')[1]}
                    <MdArrowForward aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="team-join">
          <div className="team-join-card">
            <div className="team-join-copy">
              <span className="team-join-kicker">
                <MdVerified aria-hidden="true" /> Caregivers welcome
              </span>
              <h3>Passionate about gentle dentistry?</h3>
              <p>We're always looking for kind, skilled clinicians and dental nurses to join our family.</p>
            </div>
            <a className="btn-primary" href="/contact">Join our team</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}