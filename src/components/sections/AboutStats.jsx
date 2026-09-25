import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MdMood,
  MdHistory,
  MdWorkspacePremium,
} from 'react-icons/md';
import './AboutStats.css';

const stats = [
  { value: '20,000+', label: 'Smiles crafted', icon: MdMood },
  { value: '12+', label: 'Avg doctor experience', icon: MdHistory },
  { value: '16', label: 'Years of trust', icon: MdWorkspacePremium },
];

export default function AboutStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="fx-stats">
      <div className="container">
        <div className="fx-stats-band" ref={ref}>
          <div className="fx-stats-sheen" aria-hidden="true" />
          <motion.div
            className="fx-stats-grid"
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            {stats.map(s => (
              <motion.div
                key={s.label}
                className="fx-stat"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
                }}
              >
                <span className="fx-stat-ico" aria-hidden="true"><s.icon /></span>
                <div className="fx-stat-num">{s.value}</div>
                <div className="fx-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}