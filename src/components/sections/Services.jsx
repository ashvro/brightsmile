import { useState, useEffect } from 'react';
import { MdArrowForward, MdCheck, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import Reveal from '../layout/Reveal';
import slide1 from '../../assets/slide1.jpg';
import slide2 from '../../assets/slide2.jpg';
import slide3 from '../../assets/slide3.jpg';
import slide4 from '../../assets/slide4.jpg';
import slide5 from '../../assets/slide5.jpg';
import doctor2 from '../../assets/doctor2.png';
import './Services.css';

const services = [
  {
    title: 'General Dentistry', color: '#0f7d6d', img: slide1, cat: 'preventive',
    book: 'General Checkup',
    desc: 'Comprehensive exams, fillings, cleanings, and preventive care to keep your smile healthy.',
    tags: ['Routine Checkups', 'Fillings & Extractions'],
  },
  {
    title: 'Cosmetic Dentistry', color: '#3fb5a0', img: slide2, cat: 'cosmetic',
    book: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers designed to give you the confidence you deserve.',
    tags: ['Veneers & Bonding', 'Smile Design'],
  },
  {
    title: 'Orthodontics', color: '#c9a84c', img: slide4, cat: 'ortho',
    book: 'Orthodontics / Aligners',
    desc: 'Clear aligners and braces for children, teens, and adults. Straighten your smile discreetly.',
    tags: ['Invisalign', 'Braces'],
  },
  {
    title: 'Dental Implants', color: '#4c86c0', img: slide5, cat: 'restorative',
    book: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements that restore function and aesthetics.',
    tags: ['Single & Full Arch', 'Bone Grafting'],
  },
  {
    title: 'Teeth Whitening', color: '#26a69a', img: slide3, cat: 'cosmetic',
    book: 'Teeth Whitening',
    desc: 'Professional in-office and take-home whitening treatments for a brighter smile in days.',
    tags: ['In-Office Whitening', 'Home Kits'],
  },
  {
    title: 'Emergency Care', color: '#ef5350', img: doctor2, cat: 'emergency',
    book: 'Emergency Care',
    desc: 'Same-day appointments for urgent dental issues. We\'re here when you need us most.',
    tags: ['Same-Day Visits', 'Pain Relief'],
  },
];

const STEP = 360;
const N = services.length;
const HALF = Math.floor(N / 2);
const MOVE = { duration: 0.5, ease: [0.35, 0.8, 0.2, 1] };

const prefillService = title => {
  window.dispatchEvent(new CustomEvent('book-service', { detail: { service: title } }));
};

const slot = (j, cs) => {
  const d = (((cs - j) % N) + N) % N;
  const off = d <= HALF ? d : d - N;
  return { dist: Math.abs(off), x: off * STEP };
};

function Card({ data, off, dist }) {
  const scale = Math.max(0.82, 1.08 - dist * 0.09);
  const opacity = Math.max(0.55, 1 - dist * 0.16);
  const blurPx = Math.min(5, dist * 2.6);

  return (
    <motion.div className="glide-card" initial={false} animate={{ x: off }} transition={MOVE}>
      <article
        className={`service-card${dist === 0 ? ' is-focused' : ''}`}
        style={{ '--gentle-accent': data.color, '--cblur': `${blurPx}px`, scale, opacity }}
      >
        <div className="service-img-wrap">
          <img className="service-img" src={data.img} alt={data.title} loading="lazy" />
          <div className="service-img-shade" />
        </div>

        <div className="service-body">
          <h3>{data.title}</h3>
          <p className="service-desc">{data.desc}</p>

          <ul className="service-tags">
            {data.tags.map(t => (
              <li key={t}><MdCheck /> {t}</li>
            ))}
          </ul>

          <Link
            to="appointment"
            spy smooth duration={700}
            offset={-80}
            className="service-link"
            onClick={() => prefillService(data.book)}
          >
            Book this
            <span className="service-link-arrow"><MdArrowForward /></span>
          </Link>
        </div>

        <div className="service-card-gradation" />
      </article>
    </motion.div>
  );
}

export default function Services({ naked = false }) {
  const [cs, setCs] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCs(c => c + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="services section-pad" id="services">
      <div className="ambient-blobs" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
      </div>
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
            <h2 className="section-title">Comprehensive Dental <span>Services</span></h2>
            <p className="section-subtitle">From routine checkups to complete smile transformations, we provide every service you need under one roof.</p>
          </Reveal>
        )}

        <div className="services-carousel">
          <span className="edge-fade edge-fade-l" aria-hidden="true" />
          <span className="edge-fade edge-fade-r" aria-hidden="true" />
          <button className="carousel-arrow carousel-arrow-left" onClick={() => setCs(c => c - 1)} aria-label="Previous services">
            <MdChevronLeft />
          </button>
          <div className="services-track ring-track">
            {services.map((s, j) => {
              const { dist, x } = slot(j, cs);
              return (
                <Card
                  key={j}
                  data={s}
                  off={x}
                  dist={dist}
                />
              );
            })}
          </div>
          <button className="carousel-arrow carousel-arrow-right" onClick={() => setCs(c => c + 1)} aria-label="Next services">
            <MdChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}