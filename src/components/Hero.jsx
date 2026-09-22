import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import slide5 from '../assets/slide5.jpg';
import './Hero.css';

const slides = [
  {
    src: slide1,
    alt: 'Dentist examining a patient\'s teeth in a modern clinic',
    title: 'Precision Diagnostics',
    desc: 'Digital X-rays and 3D imaging catch issues early — before they become painful or costly.',
  },
  {
    src: slide2,
    alt: 'Dentist performing a dental procedure with instruments',
    title: 'Gentle, Modern Treatments',
    desc: 'Minimally invasive techniques with the latest dental equipment, so every visit is comfortable.',
  },
  {
    src: slide3,
    alt: 'Dental cleaning and hygiene treatment',
    title: 'Professional Cleanings',
    desc: 'Deep cleaning removes plaque and tartar for healthier gums and a brighter, fresher smile.',
  },
  {
    src: slide4,
    alt: 'Caring dental team with a patient',
    title: 'A Team That Cares',
    desc: 'From reception to chairside, you\'re welcomed by a warm team dedicated to your comfort.',
  },
  {
    src: slide5,
    alt: 'Dental instruments and equipment',
    title: 'State-of-the-Art Equipment',
    desc: 'Sterile, modern tools and technologies that deliver safer treatments and better results.',
  },
];

const SLIDE_MS = 2000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIndex(i => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index]);

  const go = i => setIndex((i + slides.length) % slides.length);

  return (
    <section className="hero" id="hero" style={{ '--slide-ms': `${SLIDE_MS}ms` }}>
      <AnimatePresence>
        {slides.map((slide, i) =>
          i === index ? (
            <motion.figure
              key={index}
              className="hero-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <img src={slide.src} alt={slide.alt} />
              <div className="hero-slide-overlay" />
              <figcaption className="hero-caption">
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>
              </figcaption>
            </motion.figure>
          ) : null
        )}
      </AnimatePresence>

      <button className="hero-arrow hero-arrow-left" onClick={() => go(index - 1)} aria-label="Previous image">
        <FiChevronLeft />
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={() => go(index + 1)} aria-label="Next image">
        <FiChevronRight />
      </button>

      <div className="hero-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === index ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Show image ${i + 1}: ${slides[i].title}`}
          />
        ))}
      </div>
    </section>
  );
}