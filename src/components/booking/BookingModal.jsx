import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose, MdCheckCircle, MdCalendarMonth } from 'react-icons/md';
import './BookingModal.css';

const services = [
  'General Checkup',
  'Cosmetic Dentistry',
  'Orthodontics / Aligners',
  'Dental Implants',
  'Teeth Whitening',
  'Emergency Care',
];

const validate = form => {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^\s*\+?[\d\s()-]{7,15}\s*$/.test(form.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!form.service) errors.service = 'Please select a service.';
  if (!form.date) errors.date = 'Please choose a preferred date.';
  else if (form.date < new Date().toISOString().split('T')[0]) errors.date = 'Date must be in the future.';
  return errors;
};

const emptyForm = () => ({ name: '', phone: '', service: '', date: '' });

export default function BookingModal() {
  const [isOpen, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const openWith = service => {
      setForm({ ...emptyForm(), service: service || '' });
      setErrors({});
      setTouched({});
      setSubmitted(false);
      setOpen(true);
      window.dispatchEvent(new CustomEvent('booking-open'));
    };

    const onBookService = e => openWith((e.detail && e.detail.service) || '');

    const onDocClick = e => {
      const el = e.target.closest('a[href*="appointment"], [data-open-booking], [data-book]');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      openWith(el.getAttribute('data-book') || '');
    };

    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('book-service', onBookService);
    document.addEventListener('click', onDocClick, true);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('book-service', onBookService);
      document.removeEventListener('click', onDocClick, true);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = () => setOpen(false);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <motion.div
            className="bm-card"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            <button type="button" className="bm-close" onClick={close} aria-label="Close booking form">
              <MdClose />
            </button>

            {submitted ? (
              <div className="bm-success">
                <motion.span
                  className="bm-success-icon"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <MdCheckCircle />
                </motion.span>
                <h3>Request Received!</h3>
                <p>
                  Thank you, <strong>{form.name}</strong>! Our team will confirm your{' '}
                  <strong>{form.service}</strong> appointment shortly.
                </p>
                <button className="bm-submit" onClick={() => { setSubmitted(false); setForm(emptyForm()); }}>
                  Book Another
                </button>
              </div>
            ) : (
              <form className="bm-form" onSubmit={handleSubmit} noValidate>
                <div className="bm-head">
                  <span className="bm-kicker"><MdCalendarMonth aria-hidden="true" /> Book Appointment</span>
                  <h2>Schedule Your Visit</h2>
                  <p>Tell us when suits you — we'll confirm within minutes.</p>
                </div>

                <div className="bm-grid">
                  <div className={`bm-group${errors.name && touched.name ? ' has-error' : ''}${form.name ? ' is-filled' : ''}`}>
                    <div className="bm-field">
                      <input id="bm-name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.name} autoComplete="name" />
                      <label htmlFor="bm-name">Full Name</label>
                    </div>
                    {errors.name && touched.name && <span className="bm-error">{errors.name}</span>}
                  </div>

                  <div className={`bm-group${errors.phone && touched.phone ? ' has-error' : ''}${form.phone ? ' is-filled' : ''}`}>
                    <div className="bm-field">
                      <input id="bm-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.phone} autoComplete="tel" />
                      <label htmlFor="bm-phone">Phone Number</label>
                    </div>
                    {errors.phone && touched.phone && <span className="bm-error">{errors.phone}</span>}
                  </div>

                  <div className={`bm-group${errors.service && touched.service ? ' has-error' : ''}${form.service ? ' is-filled' : ''}`}>
                    <div className="bm-field">
                      <select id="bm-service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.service}>
                        <option value="" disabled aria-hidden="true" />
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <label htmlFor="bm-service" className={form.service || undefined}>Service Needed</label>
                    </div>
                    {errors.service && touched.service && <span className="bm-error">{errors.service}</span>}
                  </div>

                  <div className={`bm-group${errors.date && touched.date ? ' has-error' : ''}${form.date ? ' is-filled' : ''}`}>
                    <div className="bm-field">
                      <input id="bm-date" name="date" type="date" value={form.date} onChange={handleChange} onBlur={handleBlur} min={new Date().toISOString().split('T')[0]} aria-invalid={!!errors.date} />
                      <label htmlFor="bm-date" className={form.date || undefined}>Preferred Date</label>
                    </div>
                    {errors.date && touched.date && <span className="bm-error">{errors.date}</span>}
                  </div>
                </div>

                <button type="submit" className="bm-submit"><MdCalendarMonth aria-hidden="true" /> Confirm Appointment</button>
                <p className="bm-trust"><MdCheckCircle aria-hidden="true" /> No booking fees · No obligation, cancel anytime</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}