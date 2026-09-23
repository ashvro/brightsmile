import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlus, FiPhone, FiMessageCircle, FiClock, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-scroll';
import Reveal from '../layout/Reveal';
import './Faq.css';

const faqs = [
  {
    q: 'Do you accept my dental insurance?',
    a: 'Yes — we work with most major dental insurance providers and will verify your coverage before your visit. We also offer flexible in-house payment plans and financing options for uninsured patients.',
  },
  {
    q: 'How often should I get a dental checkup?',
    a: 'Most patients should visit every six months for a cleaning and exam. This lets us catch issues early and keeps your oral health on track. We\'ll recommend a personalized schedule based on your needs.',
  },
  {
    q: 'Is the treatment painful?',
    a: 'No. We use modern, gentle techniques, numbing agents, and sedation options for anxious patients. The vast majority of our patients describe their visits as completely comfortable.',
  },
  {
    q: 'What happens if I have a dental emergency?',
    a: 'Call our hotline for same-day emergency appointments. We reserve urgent slots every day and will see you as quickly as possible to relieve pain and protect your teeth.',
  },
  {
    q: 'Do you offer teeth whitening options?',
    a: 'We offer both in-office professional whitening and custom take-home kits. Your dentist will recommend the best option to achieve a lasting, natural-looking result.',
  },
];

const listVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Faq({ naked = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState(-1);

  return (
    <section className="faq section-pad" id="faq" ref={ref}>
      <div className="edge-rails" aria-hidden="true">
        <span className="edge-rail edge-rail-l" />
        <span className="edge-rail edge-rail-r" />
        <span className="edge-arc edge-arc-l" />
        <span className="edge-arc edge-arc-r" />
        <span className="edge-dots edge-dots-tl" />
        <span className="edge-dots edge-dots-br" />
      </div>
      <div className="container">
        {!naked && (
          <Reveal className="section-header">
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          </Reveal>
        )}

        <div className="faq-layout">
          <Reveal dir="left" className="faq-aside">
            <div className="faq-side-card">
              <span className="faq-side-orb" aria-hidden="true" />
              <h3>Still have questions?</h3>
              <p>Our front desk is happy to help with insurance, timing, and treatment options — no obligation.</p>
              <a className="faq-side-tel" href="tel:+15550001234">
                <FiPhone /> +1 (555) 000-1234
              </a>
              <div className="faq-side-actions">
                <Link to="appointment" spy smooth duration={700} offset={-80} className="btn-primary faq-side-cta">
                  Book a visit
                </Link>
                <a className="faq-side-ghost" href="mailto:hello@brightsmile.com">
                  <FiMessageCircle /> Email us
                </a>
              </div>
              <div className="faq-side-hours">
                <FiClock />
                <span>Mon–Fri 9am–7pm · Sat 10am–5pm</span>
              </div>
            </div>
          </Reveal>

          <motion.div
            className="faq-list"
            variants={listVariant}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {faqs.map((f, i) => (
              <motion.div
                key={f.q}
                variants={itemVariant}
                className={`faq-item${open === i ? ' open' : ''}`}
              >
                <span className="faq-item-shine" aria-hidden="true" />
                <span className="faq-item-ring" aria-hidden="true" />
                <button
                  className="faq-question"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq-q-badge" aria-hidden="true">
                    <FiHelpCircle />
                  </span>
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-icon-wrap" aria-hidden="true">
                    <FiPlus className="faq-icon" />
                  </span>
                </button>
                <div className="faq-answer" style={{ maxHeight: open === i ? '280px' : '0' }}>
                  <div className="faq-answer-inner">
                    <span className="faq-answer-bar" aria-hidden="true" />
                    <p>{f.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
