import { MdOutlineLocalHospital, MdKeyboardArrowUp } from 'react-icons/md';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const quickLinks = [
  { label: 'Home', to: '/' }, { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about-us' }, { label: 'Testimonials', to: '/testimonials' }, { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Book Appointment', to: '/#appointment' },
];

const colVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

const gridVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-rail" aria-hidden="true">
        <span className="footer-rail-glow" />
      </div>

      <motion.div
        className="container footer-top"
        variants={gridVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div className="footer-col footer-brand" variants={colVariant}>
          <div className="footer-logo">
            <span className="footer-logo-icon-wrap"><MdOutlineLocalHospital className="footer-logo-icon" /></span>
            <span>BrightSmile<em>Dental</em></span>
          </div>
          <p>Providing compassionate, expert dental care to families since 2009. Your smile is our passion.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </motion.div>

        <motion.div className="footer-col" variants={colVariant}>
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map(l => (
              <li key={l.to}>
                <Link to={l.to}><span className="footer-link-text">{l.label}</span></Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="footer-col" variants={colVariant}>
          <h4>Opening Hours</h4>
          <ul className="hours-list">
            <li><span>Mon – Fri</span><span>9:00 AM – 7:00 PM</span></li>
            <li><span>Saturday</span><span>10:00 AM – 5:00 PM</span></li>
            <li><span>Sunday</span><span className="closed">Closed</span></li>
          </ul>
        </motion.div>

        <motion.div className="footer-col" variants={colVariant}>
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li><FiMapPin /><span>123 Wellness Blvd, New York, NY 10001</span></li>
            <li><FiPhone /><a href="tel:+15550001234">+1 (555) 000-1234</a></li>
            <li><FiMail /><a href="mailto:hello@brightsmile.com">hello@brightsmile.com</a></li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="footer-divider" aria-hidden="true">
        <span className="footer-divider-line" />
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Accessibility</a>
        </div>
        <button type="button" className="footer-top-btn" onClick={scrollTop} aria-label="Back to top">
          <MdKeyboardArrowUp />
        </button>
      </div>
    </footer>
  );
}
