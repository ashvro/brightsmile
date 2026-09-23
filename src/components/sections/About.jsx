import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../layout/Reveal';
import doctor1 from '../../assets/doctor1.png';
import './About.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

const pointVariant = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const points = [
  { num: '01', text: '3D digital diagnostics' },
  { num: '02', text: 'Comfort-first visits' },
  { num: '03', text: 'Transparent pricing' },
  { num: '04', text: 'Same-day emergencies' },
];

export default function About() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return undefined;
    const id = setInterval(() => setActive(i => (i + 1) % points.length), 1800);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <section className="about section-pad" id="about">
      <div className="edge-rails" aria-hidden="true">
        <span className="edge-rail edge-rail-l" />
        <span className="edge-rail edge-rail-r" />
        <span className="edge-arc edge-arc-l" />
        <span className="edge-arc edge-arc-r" />
        <span className="edge-dots edge-dots-tl" />
        <span className="edge-dots edge-dots-br" />
      </div>
      <div className="container about-inner">
        <Reveal dir="left" className="about-image">
          <div className="about-gallery">
            <figure className="about-fig about-fig-main">
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1400&auto=format&fit=crop" alt="Modern dental treatment room" loading="lazy" />
            </figure>
            <figure className="about-fig about-fig-small">
              <img src={doctor1} alt="BrightSmile dentist at work" loading="lazy" />
            </figure>
            <div className="about-card">
              <strong>15+</strong>
              <span>Years of care</span>
            </div>
          </div>
        </Reveal>

        <Reveal dir="up" delay={0.12} className="about-content">
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.h2 className="section-title" variants={item}>
              Dedicated to Your <span>Dental Health</span>
            </motion.h2>

            <motion.ul
              className="about-points"
              variants={container}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
            >
              <motion.li className="about-point-slot" variants={item}>
                <div className="about-point is-constant">
                  <span className="about-lead-orb" aria-hidden="true" />
                  <span className="about-point-text">
                    Gentle, Modern Dentistry for the whole Family since 2009 with Practices Like,
                  </span>
                  <span className="about-lead-chevron" aria-hidden="true">↓</span>
                </div>
              </motion.li>
              {points.map(({ num, text }, i) => (
                <motion.li key={text} className="about-point-slot" variants={pointVariant}>
                  <div className={`about-point${i === active ? ' is-active' : ''}`}>
                    <span className="about-point-num">{num}</span>
                    <span className="about-point-text">{text}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.blockquote className="about-founder" variants={item}>
              <span className="about-quote-mark" aria-hidden="true">“</span>
              <div className="about-founder-text">
                <p className="about-founder-quote">We listen first, then build a plan around you.</p>
                <footer className="about-founder-name">Dr. Michael Carter — Clinical Director</footer>
              </div>
              <div className="about-founder-avatar">
                <img src={doctor1} alt="Dr. Michael Carter" loading="lazy" />
              </div>
            </motion.blockquote>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
