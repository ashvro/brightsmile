import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import './FloatingContact.css';

const WHATSAPP_URL = 'https://wa.me/15550001234?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment.';
const PHONE_URL = 'tel:+15550001234';

export default function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Contact the clinic">
      <a
        href={WHATSAPP_URL}
        className="floating-btn floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
        <span className="floating-tip">Chat on WhatsApp</span>
      </a>
      <a
        href={PHONE_URL}
        className="floating-btn floating-phone"
        aria-label="Call the clinic"
      >
        <FiPhone />
        <span className="floating-tip">Call the clinic</span>
      </a>
    </div>
  );
}