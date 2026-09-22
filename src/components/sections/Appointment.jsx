import { useState, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Reveal from '../layout/Reveal';
import './Appointment.css';

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
          <div className="section-tag section-tag-light">Get Started</div>
          <h2 className="section-title" style={{ color: '#fff' }}>Book Your <span style={{ color: '#7dd3fc' }}>Appointment</span></h2>
          <p className="appt-sub">Ready for a healthier, brighter smile? Schedule your visit with our friendly team today. New patients welcome!</p>
          <ul className="appt-perks">
            {['Same-day emergency bookings', 'Flexible morning & evening slots', 'Online confirmation in minutes', 'No hidden fees or surprises'].map(p => (
              <li key={p}><FiCheckCircle /> <span>{p}</span></li>
            ))}
          </ul>
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
              <div className={`form-group${errors.name && touched.name ? ' has-error' : ''}`}>
                <label htmlFor="appt-name">Full Name</label>
                <input id="appt-name" name="name" type="text" placeholder="Jane Doe" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.name} />
                {errors.name && touched.name && <span className="form-error"><FiAlertCircle /> {errors.name}</span>}
              </div>
              <div className={`form-group${errors.phone && touched.phone ? ' has-error' : ''}`}>
                <label htmlFor="appt-phone">Phone Number</label>
                <input id="appt-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.phone} />
                {errors.phone && touched.phone && <span className="form-error"><FiAlertCircle /> {errors.phone}</span>}
              </div>
              <div className={`form-group${errors.service && touched.service ? ' has-error' : ''}`}>
                <label htmlFor="appt-service">Service Needed</label>
                <select id="appt-service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.service}>
                  <option value="" disabled>Select a service…</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && touched.service && <span className="form-error"><FiAlertCircle /> {errors.service}</span>}
              </div>
              <div className={`form-group${errors.date && touched.date ? ' has-error' : ''}`}>
                <label htmlFor="appt-date">Preferred Date</label>
                <input id="appt-date" name="date" type="date" value={form.date} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split('T')[0]} aria-invalid={!!errors.date} />
                {errors.date && touched.date && <span className="form-error"><FiAlertCircle /> {errors.date}</span>}
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
