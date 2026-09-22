import { MdOutlineChat, MdEmail, MdLocationOn } from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './PageExtras.css';

const hours = [
  { day: 'Mon – Fri', time: '9:00 – 19:00' },
  { day: 'Saturday', time: '10:00 – 17:00' },
  { day: 'Sunday', time: 'Closed', closed: true },
];

export default function FaqExtras() {
  return (
    <section className="fx-band">
      <div className="container">
        <Reveal className="fx-head">
          <div className="section-tag">Still Curious?</div>
          <h2>Talk to a Real <span>Person</span></h2>
          <p>Prefer to ask directly? We are a quick call or message away.</p>
        </Reveal>

        <div className="fx-contact">
          <Reveal dir="left">
            <div className="fx-contact-main">
              <h3>Speak With Our Front Desk</h3>
              <a className="fx-contact-tel" href="tel:+15550001234">+1 (555) 000-1234</a>
              <p>
                Our friendly team can answer questions, check your insurance,
                and book your appointment in minutes.
              </p>
              <div className="fx-contact-actions">
                <a className="fx-cta-primary" href="https://wa.me/15550001234?text=Hi%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer">
                  <MdOutlineChat /> WhatsApp us
                </a>
                <a className="fx-cta-ghost" href="mailto:hello@brightsmile.com">
                  <MdEmail /> Email a question
                </a>
              </div>
            </div>
          </Reveal>

          <div className="fx-contact-side">
            <Reveal dir="right" delay={0.1}>
              <div className="fx-contact-card">
                <h4>Opening Hours</h4>
                {hours.map(h => (
                  <div className={`fx-hour-row${h.closed ? ' closed' : ''}`} key={h.day}>
                    <strong>{h.day}</strong>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal dir="right" delay={0.2}>
              <div className="fx-contact-card">
                <h4>Visit Us</h4>
                <div className="fx-address">
                  <MdLocationOn />
                  <span>123 Wellness Blvd, New York, NY 10001 — near the Grand Central stop.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}