import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
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

export default function Faq({ naked = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState(-1);

  return (
    <section className="faq section-pad" id="faq" ref={ref}>
      <div className="container">
        {!naked && (
          <Reveal className="section-header">
            <div className="section-tag">Common Questions</div>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <p className="section-subtitle">Everything you need to know before your visit. Can't find an answer? Call us anytime.</p>
          </Reveal>
        )}

        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <FiPlus className="faq-icon" />
              </button>
              <div className="faq-answer" style={{ maxHeight: open === i ? '240px' : '0' }}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}