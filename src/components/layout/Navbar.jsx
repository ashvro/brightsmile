import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import { FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import { MdOutlineLocalHospital } from 'react-icons/md';
import './Navbar.css';

const HOME_SECTIONS = [
  { id: 'hero', to: '/' },
  { id: 'services', to: '/services' },
  { id: 'about', to: '/about-us' },
  { id: 'testimonials', to: '/testimonials' },
  { id: 'faq', to: '/faq' },
  { id: 'appointment', to: '/faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      if (pathname !== '/') return;
      const probe = window.scrollY + 140;
      let current = '/';
      for (const s of HOME_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = s.to;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About Us', to: '/about-us' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ];

  const linkClass = to => ({ isActive }) => {
    if (isHome) return to === activeSection ? 'active' : undefined;
    return isActive ? 'active' : undefined;
  };

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
                className={linkClass(link.to)}
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