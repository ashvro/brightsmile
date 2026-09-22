import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import './Stats.css';

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 8000, suffix: '+', label: 'Happy Patients' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
  { value: 12, suffix: '', label: 'Expert Dentists' },
];

function CountUp({ target, suffix, inView }) {
  const ref = useRef(null);
  const isFloat = String(target).includes('.');

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    return spring.on('change', v => {
      if (ref.current) {
        ref.current.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
      }
    });
  }, [spring, suffix, isFloat]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="stats-section" ref={ref}>
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.55 }}
          >
            <div className="stat-value">
              <CountUp target={s.value} suffix={s.suffix} inView={inView} />
            </div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
