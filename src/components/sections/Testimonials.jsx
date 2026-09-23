import { useState, useEffect } from 'react';
import { MdStar, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { motion } from 'framer-motion';
import Reveal from '../layout/Reveal';
import './Testimonials.css';

const reviews = [
  { name: 'Emma Rodriguez', init: 'ER', role: 'Patient since 2019', text: 'Absolutely the best dental clinic I\'ve ever been to. Dr. Carter is incredibly gentle and the whole team makes you feel at ease. My teeth have never looked better!' },
  { name: 'James Thornton', init: 'JT', role: 'Patient since 2021', text: 'I used to dread going to the dentist, but BrightSmile changed everything. The office is beautiful, staff is friendly, and the results are amazing.' },
  { name: 'Priya Patel', init: 'PP', role: 'Invisalign Patient', text: 'My Invisalign treatment with Dr. Hayes was smooth and the results exceeded my expectations. Highly recommend to anyone considering orthodontics.' },
  { name: 'Lucas Meyer', init: 'LM', role: 'Implant Patient', text: 'Got two implants done here and the process was painless and professional. Worth every penny. The follow-up care is exceptional too.' },
  { name: 'Olivia Chen', init: 'OC', role: 'Patient since 2018', text: 'I\'ve been coming here for 6 years and the quality has never wavered. Dr. Johnson\'s cosmetic work gave me the smile I\'ve always wanted.' },
];

const STEP = 500;
const N = reviews.length;
const HALF = Math.floor(N / 2);
const MOVE = { duration: 0.5, ease: [0.35, 0.8, 0.2, 1] };

const slot = (j, cs) => {
  const d = (((cs - j) % N) + N) % N;
  const off = d <= HALF ? d : d - N;
  return { dist: Math.abs(off), x: off * STEP };
};

function Stars() {
  return (
    <div className="review-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <MdStar key={i} />)}
    </div>
  );
}

function ReviewCard({ data, off, dist }) {
  const scale = Math.max(0.86, 1.06 - dist * 0.08);
  const opacity = Math.max(0.4, 1 - dist * 0.18);
  const blurPx = Math.min(5, dist * 2.6);

  return (
    <motion.div className="glide-card" initial={false} animate={{ x: off }} transition={MOVE}>
      <figure
        className={`review-card${dist === 0 ? ' is-focused' : ''}`}
        style={{ '--cblur': `${blurPx}px`, scale, opacity }}
      >
        <div className="review-head">
          <Stars />
          <span className="review-verified">Verified</span>
        </div>
        <blockquote className="review-text">"{data.text}"</blockquote>
        <figcaption className="reviewer">
          <span className="reviewer-avatar" aria-hidden="true">{data.init}</span>
          <span className="reviewer-meta">
            <span className="reviewer-name">{data.name}</span>
            <span className="reviewer-role">{data.role}</span>
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
}

export default function Testimonials({ naked = false }) {
  const [cs, setCs] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCs(c => c + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="testimonials section-pad" id="testimonials">
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
            <h2 className="section-title">Kind Words From <span>Our Patients</span></h2>
          </Reveal>
        )}

        <Reveal delay={0.05} className="testimonials-meta">
          <Stars />
          <span><strong>4.9 / 5</strong> average across 2,300+ verified reviews</span>
        </Reveal>

        <div className="testimonials-carousel">
          <span className="edge-fade edge-fade-l" aria-hidden="true" />
          <span className="edge-fade edge-fade-r" aria-hidden="true" />
          <button className="carousel-arrow carousel-arrow-left" onClick={() => setCs(c => c - 1)} aria-label="Previous reviews">
            <MdChevronLeft />
          </button>
          <div className="testimonials-track">
            {reviews.map((r, j) => {
              const { dist, x } = slot(j, cs);
              return <ReviewCard key={r.name} data={r} off={x} dist={dist} />;
            })}
          </div>
          <button className="carousel-arrow carousel-arrow-right" onClick={() => setCs(c => c + 1)} aria-label="Next reviews">
            <MdChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}