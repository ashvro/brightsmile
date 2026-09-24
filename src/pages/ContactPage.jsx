import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdOutlinePhone,
  MdOutlineChat,
  MdEmail,
  MdLocationOn,
  MdOutlineWatchLater,
  MdCheckCircle,
  MdErrorOutline,
  MdArrowForward,
} from 'react-icons/md';
import PageHero from '../components/layout/PageHero';
import Reveal from '../components/layout/Reveal';
import dentalHeroContactUs from '../assets/dental-hero-contact-us.png';
import './ContactPage.css';

const subjects = ['General Inquiry', 'Book an Appointment', 'Insurance & Billing', 'Feedback'];

const channels = [
  {
    icon: <MdOutlinePhone />,
    label: 'Call Us',
    value: '+1 (555) 000-1234',
    href: 'tel:+15550001234',
  },
  {
    icon: <MdOutlineChat />,
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: 'https://wa.me/15550001234?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment.',
  },
  {
    icon: <MdEmail />,
    label: 'Email',
    value: 'hello@brightsmile.com',
    href: 'mailto:hello@brightsmile.com',
  },
  {
    icon: <MdLocationOn />,
    label: 'Visit Us',
    value: '123 Wellness Blvd, New York, NY 10001',
    href: 'https://maps.google.com/?q=New+York',
  },
];

const channelList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const channelItem = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const fmtTime = mins => {
  const h = Math.floor(mins / 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(mins % 60).padStart(2, '0')} ${period}`;
};

const getSchedule = (now = new Date()) => {
  const day = now.getDay();
  if (day === 0) return { open: false, note: 'Closed today' };
  const [open, close] = day === 6 ? [600, 1020] : [540, 1140];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins >= open && mins < close) {
    return { open: true, note: `Open now · closes at ${fmtTime(close)}` };
  }
  return { open: false, note: mins < open ? `Opens at ${fmtTime(open)}` : 'Closed for today' };
};

const validate = form => {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email.';
  if (!form.subject) errors.subject = 'Please choose a subject.';
  if (!form.message.trim() || form.message.trim().length < 10) errors.message = 'Please write a short message.';
  return errors;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(() => getSchedule());

  useEffect(() => {
    const id = setInterval(() => setStatus(getSchedule()), 60000);
    return () => clearInterval(id);
  }, []);

  const selectSubject = s => {
    setForm(prev => ({ ...prev, subject: s }));
    setTouched(prev => ({ ...prev, subject: true }));
    setErrors(prev => ({ ...prev, subject: undefined }));
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleBlur = e => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <>
      <PageHero
        display="Contact Us"
        bg={dentalHeroContactUs}
      />

      <section className="contact-main section-pad">
        <div className="ambient-blobs" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1" />
          <div className="ambient-blob ambient-blob-2" />
        </div>
        <div className="edge-rails" aria-hidden="true">
          <span className="edge-rail edge-rail-l" />
          <span className="edge-rail edge-rail-r" />
          <span className="edge-arc edge-arc-l" />
          <span className="edge-arc edge-arc-r" />
          <span className="edge-dots edge-dots-tl" />
          <span className="edge-dots edge-dots-br" />
        </div>

        <div className="container">
          <div className="contact-panel">
            <Reveal dir="left" className="contact-info-wrap">
              <div className="contact-info">
                <div className="contact-info-head">
                  <div className="contact-info-title">
                    <h2>Contact <span>Information</span></h2>
                    <p>Prefer to talk things through? Here's every way to reach the practice.</p>
                  </div>

                  <div className={`contact-status${status.open ? ' is-open' : ''}`}>
                    <span className="contact-status-dot" aria-hidden="true" />
                    <span>{status.note}</span>
                  </div>

                  <span className="contact-group-label">Reach us directly</span>
                </div>

                <motion.ul
                  className="contact-channels"
                  variants={channelList}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {channels.map(c => (
                    <motion.li key={c.label} variants={channelItem}>
                      <a href={c.href} className="contact-channel" rel="noopener noreferrer">
                        <span className="contact-channel-icon">{c.icon}</span>
                        <span className="contact-channel-text">
                          <span className="contact-channel-label">{c.label}</span>
                          <span className="contact-channel-value">{c.value}</span>
                        </span>
                        <MdArrowForward className="contact-channel-arrow" aria-hidden="true" />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="contact-info-foot">
                  <span className="contact-group-label contact-group-label-gold">In an emergency?</span>

                  <div className="contact-emergency">
                    <span className="contact-emergency-ring"><MdOutlinePhone /></span>
                    <div className="contact-emergency-text">
                      <span>Dental emergency outside hours?</span>
                      <strong>We reserve same-day slots for urgent cases.</strong>
                    </div>
                    <a className="contact-emergency-call" href="tel:+15550001234">
                      Call now <MdArrowForward aria-hidden="true" />
                    </a>
                  </div>

                  <Link to="/#appointment" className="contact-cta">
                    <span>Book an appointment</span>
                    <MdArrowForward aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <span className="contact-panel-sep" aria-hidden="true" />

            <Reveal dir="right" delay={0.12} className="contact-form-wrap">
            <div className="contact-form-card">
              {submitted ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                >
                  <motion.span
                    className="contact-success-icon"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                  >
                    <MdCheckCircle />
                  </motion.span>
                  <h3>Message Sent!</h3>
                  <p>Thanks, <strong>{form.name}</strong>! Our team will get back to you within one business day.</p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another</button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <h3>Send Us a Message</h3>

                  <div className={`cf-group${errors.name && touched.name ? ' has-error' : ''}${form.name ? ' is-filled' : ''}`}>
                    <div className="form-field">
                      <input id="cf-name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.name} autoComplete="name" />
                      <label htmlFor="cf-name">Full Name</label>
                    </div>
                    {errors.name && touched.name && <span className="cf-error"><MdErrorOutline /> {errors.name}</span>}
                  </div>

                  <div className="cf-row">
                    <div className={`cf-group${errors.email && touched.email ? ' has-error' : ''}${form.email ? ' is-filled' : ''}`}>
                      <div className="form-field">
                        <input id="cf-email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.email} autoComplete="email" />
                        <label htmlFor="cf-email">Email</label>
                      </div>
                      {errors.email && touched.email && <span className="cf-error"><MdErrorOutline /> {errors.email}</span>}
                    </div>
                    <div className={`cf-group${form.phone ? ' is-filled' : ''}`}>
                      <div className="form-field">
                        <input id="cf-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />
                        <label htmlFor="cf-phone">Phone (optional)</label>
                      </div>
                    </div>
                  </div>

                  <div className={`cf-group cf-subject${errors.subject && touched.subject ? ' has-error' : ''}`}>
                    <span className="cf-group-label">Subject</span>
                    <div className="cf-chips">
                      {subjects.map(s => (
                        <button
                          type="button"
                          key={s}
                          className={`cf-chip${form.subject === s ? ' is-active' : ''}`}
                          onClick={() => selectSubject(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.subject && touched.subject && <span className="cf-error"><MdErrorOutline /> {errors.subject}</span>}
                  </div>

                  <div className={`cf-group${errors.message && touched.message ? ' has-error' : ''}${form.message ? ' is-filled' : ''}`}>
                    <div className="form-field is-area">
                      <textarea id="cf-message" name="message" rows="5" maxLength="500" placeholder=" " value={form.message} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.message} />
                      <label htmlFor="cf-message">Your Message</label>
                      <span className={`cf-count${form.message.length > 400 ? ' is-warn' : ''}`}>{form.message.length}/500</span>
                    </div>
                    {errors.message && touched.message && <span className="cf-error"><MdErrorOutline /> {errors.message}</span>}
                  </div>

                  <button type="submit" className="btn-primary">Send Message</button>
                  <div className="cf-trust"><MdCheckCircle /> We reply within one business day.</div>
                </form>
              )}
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="contact-extra">
        <div className="ambient-blobs" aria-hidden="true">
          <div className="ambient-blob ambient-blob-1" />
          <div className="ambient-blob ambient-blob-2" />
        </div>
        <div className="edge-rails" aria-hidden="true">
          <span className="edge-rail edge-rail-l" />
          <span className="edge-rail edge-rail-r" />
          <span className="edge-arc edge-arc-l" />
          <span className="edge-arc edge-arc-r" />
          <span className="edge-dots edge-dots-tl" />
          <span className="edge-dots edge-dots-br" />
        </div>

        <div className="container contact-extra-grid">
          <Reveal dir="left">
            <div className="contact-extra-card">
              <span className="contact-extra-icon"><MdOutlineWatchLater /></span>
              <div>
                <h3>Opening Hours</h3>
                <ul className="ce-hours">
                  <li><span>Mon – Fri</span><strong>9:00 – 19:00</strong></li>
                  <li><span>Saturday</span><strong>10:00 – 17:00</strong></li>
                  <li><span>Sunday</span><strong className="muted">Closed</strong></li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal dir="right" delay={0.1}>
            <div className="contact-extra-card">
              <span className="contact-extra-icon"><MdLocationOn /></span>
              <div>
                <h3>Getting Here</h3>
                <p className="ce-text">Two minutes from Grand Central stop. Street parking on Wellness Blvd and a public lot behind the building.</p>
                <a className="ce-link" href="https://maps.google.com/?q=New+York" target="_blank" rel="noopener noreferrer">
                  Get directions <MdArrowForward aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-map">
        <div className="container">
          <Reveal className="contact-map-head">
            <span className="section-tag">Getting Here</span>
            <h2 className="section-title">Find Us <span>Effortlessly</span></h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="contact-map-frame">
              <iframe
                title="BrightSmile Dental location map"
                src="https://maps.google.com/maps?q=New%20York%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="contact-map-card">
                <span className="contact-map-icon"><MdLocationOn /></span>
                <div>
                  <h3>BrightSmile Dental</h3>
                  <p>123 Wellness Blvd, New York, NY 10001</p>
                  <a href="https://maps.google.com/?q=New+York" target="_blank" rel="noopener noreferrer">
                    Get directions <MdArrowForward aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}