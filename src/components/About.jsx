import Reveal from './Reveal';
import doctor1 from '../assets/doctor1.png';
import './About.css';

export default function About({ naked = false }) {
  return (
    <section className="about section-pad" id="about">
      <div className="container about-inner">
        <Reveal dir="left" className="about-image">
          <div className="about-gallery">
            <figure className="about-fig about-fig-main">
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1400&auto=format&fit=crop" alt="Modern dental treatment room" loading="lazy" />
            </figure>
            <figure className="about-fig about-fig-small">
              <img src={doctor1} alt="BrightSmile dentist at work" loading="lazy" />
            </figure>
            <div className="about-card">
              <strong>15+</strong>
              <span>Years of practice</span>
            </div>
          </div>
        </Reveal>

        <Reveal dir="right" delay={0.12} className="about-content">
          {!naked && <div className="section-tag">About Us</div>}
          <h2 className="section-title">Dedicated to Your <span>Dental Health</span></h2>
          <p className="about-lead">
            Founded in 2009, BrightSmile Dental brings together a team of specialists who believe every smile deserves thoughtful, gentle care — backed by modern technology and honest advice.
          </p>

          <ul className="about-points">
            <li>Digital X-ray & 3D imaging diagnostics</li>
            <li>Comfort-first care for anxious patients</li>
            <li>Transparent pricing & insurance support</li>
            <li>Same-day emergency appointments</li>
          </ul>

          <div className="about-founder">
            <div className="about-founder-avatar">
              <img src={doctor1} alt="Dr. Michael Carter" loading="lazy" />
            </div>
            <div className="about-founder-text">
              <span className="about-founder-quote">"Care is never rushed here. We take the time to listen, explain, and build a plan around you."</span>
              <span className="about-founder-name">Dr. Michael Carter — Clinical Director</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}