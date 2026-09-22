import { MdVerified } from 'react-icons/md';
import './Marquee.css';

const items = [
  'Delta Dental', 'Cigna', 'Aetna', 'MetLife', 'Guardian', 'Humana',
  'UnitedHealthcare', 'BlueCross BlueShield',
];

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Accepted insurance providers">
      <div className="marquee-track">
        {[0, 1].map(dup => (
          <div className="marquee-group" aria-hidden={dup === 1} key={dup}>
            {items.map(item => (
              <span key={`${dup}-${item}`} className="marquee-item">
                <MdVerified /> {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}