import { useState, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Reveal from '../layout/Reveal';
import './Appointment.css';

const perkList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const perkItem = {
  hidden: { opacity: 0, x: -28, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 75, damping: 14, mass: 0.7 },
  },
};

const services = ['General Checkup', 'Cosmetic Dentistry', 'Orthodontics / Aligners', 'Dental Implants', 'Teeth Whitening', 'Emergency Care'];

const validate = form => {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^\s*\+?[\d\s()-]{7,15}\s*$/.test(form.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!form.service) errors.service = 'Please select a service.';
  if (!form.date) errors.date = 'Please choose a preferred date.';
  else if (form.date < new Date().toISOString().split('T')[0]) errors.date = 'Date must be in the future.';
  return errors;
};

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '' });
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const handler = e => {
      const { service } = e.detail || {};
      if (!service || !services.includes(service)) return;
      setSubmitted(false);
      setForm(prev => ({ ...prev, service }));
      setErrors(prev => ({ ...prev, service: undefined }));
    };
    window.addEventListener('book-service', handler);
    return () => window.removeEventListener('book-service', handler);
  }, []);

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
    setTouched({ name: true, phone: true, service: true, date: true });
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <section className="appointment-section section-pad" id="appointment">
      <div className="container appointment-inner">
        <Reveal dir="left" className="appt-text">
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>Book Your <span style={{ color: 'var(--primary)' }}>Appointment</span></h2>
          <motion.ul
            className="appt-perks"
            variants={perkList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {['Same-day emergency bookings', 'Flexible morning & evening slots', 'Online confirmation in minutes', 'No hidden fees or surprises'].map(p => (
              <motion.li key={p} variants={perkItem}>
                <span className="appt-perk-check"><FiCheckCircle /></span>
                <span>{p}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>

        <Reveal dir="right" delay={0.1} className="appt-form-card">
          {submitted ? (
            <div className="appt-success">
              <FiCheckCircle className="success-icon" />
              <h3>Appointment Requested!</h3>
              <p>Thank you, <strong>{form.name}</strong>! We'll confirm your appointment shortly via phone or email.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Book Another</button>
            </div>
          ) : (
            <form className="appt-form" onSubmit={handleSubmit} noValidate>
              <h3><FiCalendar /> Schedule a Visit</h3>
              <div className="appt-form-grid">
                <div className={`form-group${errors.name && touched.name ? ' has-error' : ''}${form.name ? ' is-filled' : ''}`}>
                  <div className="form-field">
                    <input id="appt-name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.name} autoComplete="name" />
                    <label htmlFor="appt-name">Full Name</label>
                  </div>
                  {errors.name && touched.name && <span className="form-error"><FiAlertCircle /> {errors.name}</span>}
                </div>
                <div className={`form-group${errors.phone && touched.phone ? ' has-error' : ''}${form.phone ? ' is-filled' : ''}`}>
                  <div className="form-field">
                    <input id="appt-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.phone} autoComplete="tel" />
                    <label htmlFor="appt-phone">Phone Number</label>
                  </div>
                  {errors.phone && touched.phone && <span className="form-error"><FiAlertCircle /> {errors.phone}</span>}
                </div>
                <div className={`form-group${errors.service && touched.service ? ' has-error' : ''}${form.service ? ' is-filled' : ''}`}>
                  <div className="form-field">
                    <select id="appt-service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.service}>
                      <option value="" disabled aria-hidden="true" />
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <label htmlFor="appt-service" className={form.service || undefined}>Service Needed</label>
                  </div>
                  {errors.service && touched.service && <span className="form-error"><FiAlertCircle /> {errors.service}</span>}
                </div>
                <div className={`form-group${errors.date && touched.date ? ' has-error' : ''}${form.date ? ' is-filled' : ''}`}>
                  <div className="form-field">
                    <input id="appt-date" name="date" type="date" value={form.date} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split('T')[0]} aria-invalid={!!errors.date} />
                    <label htmlFor="appt-date" className={form.date || undefined}>Preferred Date</label>
                  </div>
                  {errors.date && touched.date && <span className="form-error"><FiAlertCircle /> {errors.date}</span>}
                </div>
              </div>
              <button type="submit" className="btn-primary appt-submit">
                <FiCalendar /> Confirm Appointment
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
