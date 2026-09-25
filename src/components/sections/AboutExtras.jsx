import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Reveal from '../layout/Reveal';
import './PageExtras.css';

const milestones = [
  {
    year: '2009',
    title: 'The Practice Opens',
    text: 'Dr. Michael Carter founds BrightSmile with one surgery room and a promise of unhurried care.',
    accent: '#0f7d6d',
  },
  {
    year: '2015',
    title: 'Growing Our Team',
    text: 'Cosmetic and orthodontic specialists join, bringing implants and smile design under one roof.',
    accent: '#6d5bd0',
  },
  {
    year: '2020',
    title: 'Fully Digital Practice',
    text: 'We go paperless with digital X-rays, 3D imaging, and same-day treatment planning.',
    accent: '#c9a84c',
  },
  {
    year: '2026',
    title: '20,000+ Smiles',
    text: 'One of the region\'s most trusted dental clinics, still family-owned and community-first.',
    accent: '#e2725b',
  },
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const mile = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const cardAnim = {
  hidden: { opacity: 0, x: 44, scale: 0.97 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const dotAnim = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 320, damping: 15 } },
};

export default function AboutExtras() {
  const railRef = useRef(null);
  const railIn = useInView(railRef, { once: true, margin: '-80px' });

  return (
    <section className="fx-band">
      <div className="container">
        <Reveal className="fx-head">
          <h2>Sixteen Years of Trust, <span>Milestone by Milestone</span></h2>
        </Reveal>

        <div className="fx-timeline" ref={railRef}>
          <motion.span
            className="fx-timeline-rail"
            initial={{ scaleY: 0 }}
            animate={railIn ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            aria-hidden="true"
          />

          {railIn && <span className="fx-timeline-beam" aria-hidden="true" />}

          <motion.ul
            className="fx-milestones"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {milestones.map((m, i) => (
              <motion.li
                className={`fx-mile${i % 2 === 1 ? ' is-flip' : ''}`}
                key={m.year}
                variants={mile}
                style={{ '--fx-accent': m.accent }}
              >
                <motion.span
                  className="fx-mile-dot"
                  variants={dotAnim}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  aria-hidden="true"
                />

                <div className="fx-mile-side fx-mile-side--year">
                  <motion.span
                    className="fx-mile-year-card"
                    variants={mile}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                  >{m.year}</motion.span>
                </div>

                <motion.div className="fx-mile-side fx-mile-side--card" variants={cardAnim}>
                  <div className="fx-mile-card">
                    <div className="fx-mile-copy">
                      <h3>{m.title}</h3>
                      <p>{m.text}</p>
                      <span className="fx-mile-more">Journey <span aria-hidden="true">→</span></span>
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}