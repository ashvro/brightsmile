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

const filters = [
  { id: 'all', label: 'All Services' },
  { id: 'preventive', label: 'Preventive' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'ortho', label: 'Orthodontics' },
  { id: 'restorative', label: 'Restorative' },
  { id: 'emergency', label: 'Emergency' },
];

const services = [
  {
    title: 'General Dentistry', color: '#0f7d6d', img: slide1, cat: 'preventive', price: 'From $99',
    book: 'General Checkup',
    desc: 'Comprehensive exams, fillings, cleanings, and preventive care to keep your smile healthy.',
    tags: ['Routine Checkups', 'Fillings & Extractions'],
  },
  {
    title: 'Cosmetic Dentistry', color: '#3fb5a0', img: slide2, cat: 'cosmetic', price: 'From $149',
    book: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers designed to give you the confidence you deserve.',
    tags: ['Veneers & Bonding', 'Smile Design'],
  },
  {
    title: 'Orthodontics', color: '#c9a84c', img: slide4, cat: 'ortho', price: 'From $199',
    book: 'Orthodontics / Aligners',
    desc: 'Clear aligners and braces for children, teens, and adults. Straighten your smile discreetly.',
    tags: ['Invisalign', 'Braces'],
  },
  {
    title: 'Dental Implants', color: '#4c86c0', img: slide5, cat: 'restorative', price: 'From $899',
    book: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements that restore function and aesthetics.',
    tags: ['Single & Full Arch', 'Bone Grafting'],
  },
  {
    title: 'Teeth Whitening', color: '#26a69a', img: slide3, cat: 'cosmetic', price: 'From $79',
    book: 'Teeth Whitening',
    desc: 'Professional in-office and take-home whitening treatments for a brighter smile in days.',
    tags: ['In-Office Whitening', 'Home Kits'],
  },
  {
    title: 'Emergency Care', color: '#ef5350', img: doctor2, cat: 'emergency', price: '24/7',
    book: 'Emergency Care',
    desc: 'Same-day appointments for urgent dental issues. We\'re here when you need us most.',
    tags: ['Same-Day Visits', 'Pain Relief'],
  },
];

const STEP = 390;
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
          <span className="service-price" style={{ '--gentle-accent': data.color }}>{data.price}</span>
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
  const [active, setActive] = useState('all');
  const [cs, setCs] = useState(0);

  const visible = active === 'all' ? services : services.filter(s => s.cat === active);

  useEffect(() => {
    const id = setInterval(() => setCs(c => c + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const changeFilter = id => {
    setActive(id);
    setCs(0);
  };

  return (
    <section className="services section-pad" id="services">
      <div className="ambient-blobs" aria-hidden="true">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
      </div>
      <div className="container">
        {!naked && (
          <Reveal className="section-header">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Comprehensive Dental <span>Services</span></h2>
            <p className="section-subtitle">From routine checkups to complete smile transformations, we provide every service you need under one roof.</p>
          </Reveal>
        )}

        <Reveal delay={0.05} className="filter-row">
          {filters.map(f => (
            <button
              key={f.id}
              className={`filter-pill${active === f.id ? ' active' : ''}`}
              onClick={() => changeFilter(f.id)}
              aria-pressed={active === f.id}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="services-carousel">
          <button className="carousel-arrow carousel-arrow-left" onClick={() => setCs(c => c - 1)} aria-label="Previous services">
            <MdChevronLeft />
          </button>
          <div className="services-track ring-track">
            {visible.map((s, j) => {
              const { dist, x } = slot(j, cs);
              return (
                <Card
                  key={active + '-' + j}
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