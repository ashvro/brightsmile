import { MdStar } from 'react-icons/md';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';
import './PageExtras.css';

const breakdown = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
];

export default function TestimonialsExtras() {
  const barsRef = useRef(null);
  const inView = useInView(barsRef, { once: true, margin: '-60px' });

  return (
    <section className="fx-band">
      <div className="container">
        <Reveal className="fx-head">
          <div className="section-tag">In Numbers</div>
          <h2>Ratings That <span>Speak for Themselves</span></h2>
        </Reveal>

        <div className="fx-rating">
          <Reveal dir="left">
            <div className="fx-rating-score">
              <strong>4.9</strong>
              <div className="fx-stars">
                {Array.from({ length: 5 }).map((_, i) => <MdStar key={i} />)}
              </div>
              <p>Based on 2,300+ verified reviews</p>
            </div>
          </Reveal>

          <Reveal dir="right" delay={0.1}>
            <div className="fx-bars" ref={barsRef}>
              {breakdown.map((b, i) => (
                <div className="fx-bar-row" key={b.stars}>
                  <span>{b.stars}★</span>
                  <div className="fx-bar-track">
                    <motion.div
                      className={`fx-bar-fill${b.stars === 5 ? ' gold' : ''}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.pct}%` } : {}}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.12 }}
                    />
                  </div>
                  <span>{b.pct}%</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}