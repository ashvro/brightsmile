import { MdOutlineLocalHospital } from 'react-icons/md';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { label: 'Home', to: '/' }, { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about-us' }, { label: 'Testimonials', to: '/testimonials' }, { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book Appointment', to: '/#appointment' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <MdOutlineLocalHospital className="footer-logo-icon" />
            <span>BrightSmile<em>Dental</em></span>
          </div>
          <p>Providing compassionate, expert dental care to families since 2009. Your smile is our passion.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <ul className="hours-list">
            <li><span>Mon – Fri</span><span>9:00 AM – 7:00 PM</span></li>
            <li><span>Saturday</span><span>10:00 AM – 5:00 PM</span></li>
            <li><span>Sunday</span><span className="closed">Closed</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li><FiMapPin /><span>123 Wellness Blvd, New York, NY 10001</span></li>
            <li><FiPhone /><a href="tel:+15550001234">+1 (555) 000-1234</a></li>
            <li><FiMail /><a href="mailto:hello@brightsmile.com">hello@brightsmile.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
