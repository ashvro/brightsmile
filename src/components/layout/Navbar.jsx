import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import { FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import { MdOutlineLocalHospital } from 'react-icons/md';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ];

  const linkClass = ({ isActive }) => (isActive ? 'active' : undefined);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <MdOutlineLocalHospital className="logo-icon" />
          <span>BrightSmile<em>Dental</em></span>
        </Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-cta-mobile">
            <Scroll to="appointment" spy smooth duration={600} offset={-80} onClick={() => setMenuOpen(false)}>
              <button className="btn-primary nav-cta-btn">
                <FiCalendar /> Book Now
              </button>
            </Scroll>
          </li>
        </ul>

        <Scroll to="appointment" spy smooth duration={600} offset={-80} className="nav-cta-desktop">
          <button className="btn-primary nav-cta-btn">
            <FiCalendar /> Book Appointment
          </button>
        </Scroll>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}