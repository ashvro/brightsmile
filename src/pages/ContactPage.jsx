import { useState } from 'react';
import { MdOutlinePhone, MdOutlineChat, MdEmail, MdLocationOn, MdOutlineWatchLater, MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import PageHero from '../components/layout/PageHero';
import Reveal from '../components/layout/Reveal';
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
      <PageHero display="Contact Us" />

      <section className="contact-main section-pad">
        <div className="container contact-grid">
          <Reveal dir="left" className="contact-info">
            <div className="contact-info-title">
              <h2>Contact <span>Information</span></h2>
              <p>Prefer to talk things through? Here's every way to reach the practice.</p>
            </div>

            <ul className="contact-channels">
              {channels.map(c => (
                <li key={c.label}>
                  <a href={c.href} className="contact-channel">
                    <span className="contact-channel-icon">{c.icon}</span>
                    <span className="contact-channel-text">
                      <span className="contact-channel-label">{c.label}</span>
                      <span className="contact-channel-value">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact-emergency">
              <MdOutlineWatchLater />
              <span>Dental emergency outside hours? <strong>Call +1 (555) 000-1234</strong> — we reserve same-day slots.</span>
            </div>
          </Reveal>

          <Reveal dir="right" delay={0.12} className="contact-form-wrap">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <MdCheckCircle className="contact-success-icon" />
                  <h3>Message Sent!</h3>
                  <p>Thanks, <strong>{form.name}</strong>! Our team will get back to you within one business day.</p>
                  <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <h3>Send Us a Message</h3>
                  <div className={`cf-group${errors.name && touched.name ? ' has-error' : ''}`}>
                    <label htmlFor="cf-name">Full Name</label>
                    <input id="cf-name" name="name" type="text" placeholder="Jane Doe" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.name} />
                    {errors.name && touched.name && <span className="cf-error"><MdErrorOutline /> {errors.name}</span>}
                  </div>
                  <div className="cf-row">
                    <div className={`cf-group${errors.email && touched.email ? ' has-error' : ''}`}>
                      <label htmlFor="cf-email">Email</label>
                      <input id="cf-email" name="email" type="email" placeholder="jane@email.com" value={form.email} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.email} />
                      {errors.email && touched.email && <span className="cf-error"><MdErrorOutline /> {errors.email}</span>}
                    </div>
                    <div className="cf-group">
                      <label htmlFor="cf-phone">Phone (optional)</label>
                      <input id="cf-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={`cf-group${errors.subject && touched.subject ? ' has-error' : ''}`}>
                    <label htmlFor="cf-subject">Subject</label>
                    <select id="cf-subject" name="subject" value={form.subject} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.subject}>
                      <option value="" disabled>Choose a topic…</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && touched.subject && <span className="cf-error"><MdErrorOutline /> {errors.subject}</span>}
                  </div>
                  <div className={`cf-group${errors.message && touched.message ? ' has-error' : ''}`}>
                    <label htmlFor="cf-message">Your Message</label>
                    <textarea id="cf-message" name="message" rows="5" placeholder="How can we help you?" value={form.message} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.message} />
                    {errors.message && touched.message && <span className="cf-error"><MdErrorOutline /> {errors.message}</span>}
                  </div>
                  <button type="submit" className="btn-primary">Send Message</button>
                  <p className="cf-note">We typically reply within one business day. Your details stay private.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-extra">
        <div className="container contact-extra-grid">
          <Reveal dir="left">
            <div className="contact-extra-card">
              <div className="contact-extra-icon"><MdOutlineWatchLater /></div>
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
              <div className="contact-extra-icon"><MdLocationOn /></div>
              <div>
                <h3>Getting Here</h3>
                <p className="ce-text">Two minutes from Grand Central stop. Street parking on Wellness Blvd and a public lot behind the building.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}