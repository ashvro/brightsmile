import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const dirMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({ children, delay = 0, dir = 'up', className = '', style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const offset = dirMap[dir] || dirMap.up;
  const clipX = offset.x !== 0;

  return (
    <div
      ref={ref}
      className={className}
      style={clipX ? { ...style, overflowX: 'clip' } : style}
    >
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
