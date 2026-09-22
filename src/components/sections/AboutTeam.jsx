import Reveal from '../layout/Reveal';
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
  },
  {
    img: doctor2,
    name: 'Dr. Sarah Hayes',
    role: 'Orthodontics & Aligner Care',
    focus: 'Clear aligners, braces, and growth guidance',
    years: '10',
  },
  {
    img: doctor3,
    name: 'Dr. Daniel Johnson',
    role: 'Cosmetic & Restorative Dentistry',
    focus: 'Veneers, smile design, and implant restorations',
    years: '12',
  },
];

export default function AboutTeam() {
  return (
    <section className="team-band section-pad">
      <div className="container">
        <Reveal className="team-head">
          <div className="section-tag">Our Team</div>
          <h2 className="section-title">The Dentists Behind <span>Your Smile</span></h2>
          <p className="section-subtitle">
            A close-knit team of specialists who share one standard — unhurried, honest,
            gentle care built on modern dentistry.
          </p>
        </Reveal>

        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.12}>
              <article className="team-card">
                <div className="team-photo">
                  <img src={member.img} alt={member.name} loading="lazy" />
                </div>
                <div className="team-body">
                  <span className="team-role">{member.role}</span>
                  <h3>{member.name}</h3>
                  <p className="team-focus">{member.focus}</p>
                  <div className="team-exp">
                    <strong>{member.years}</strong>
                    <span>Years of experience</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}