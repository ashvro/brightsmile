import { motion } from 'framer-motion';
import { MdStar } from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './TestimonialsStories.css';

const stories = [
  {
    name: 'Sarah Mitchell',
    role: 'Patient since 2019',
    chip: 'Routine & Cosmetic Care',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=700&h=700&auto=format&fit=crop',
    quote: 'I used to dread dentist visits, but BrightSmile completely changed that. From the warm welcome at reception to the gentle cleaning itself, everything feels calm and unhurried. My teeth have honestly never looked better.',
    accent: '#0f7d6d',
  },
  {
    name: 'David Okafor',
    role: 'Invisalign Patient',
    chip: 'Invisalign Treatment',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&h=700&auto=format&fit=crop',
    quote: 'The Invisalign journey felt effortless — clear progress checks, honest timelines, and a team that actually listens. Eighteen months later my smile is straight and my confidence is through the roof. Worth every single visit.',
    accent: '#c9a84c',
  },
  {
    name: 'Emily Tan',
    role: 'Implant Patient',
    chip: 'Dental Implants',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=700&h=700&auto=format&fit=crop',
    quote: 'After an accident I needed a front implant and dreaded the process. Dr. Carter and the team made it painless, transparent, and surprisingly comfortable. The result is completely natural-looking — you can\'t even tell it\'s an implant.',
    accent: '#4c86c0',
  },
];

const gridAnim = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const photoAnim = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1, ease: [0.4, 0, 0.2, 1] } },
};

const quoteAnim = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

function Stars() {
  return (
    <span className="story-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <MdStar key={i} />)}
    </span>
  );
}

export default function TestimonialsStories() {
  return (
    <section className="stories section-pad">
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
        <Reveal className="section-header">
          <h2 className="section-title">Experiences With <span>BrightSmile Dental</span></h2>
        </Reveal>

        <motion.ul
          className="story-grid"
          variants={gridAnim}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stories.map(st => (
            <motion.li key={st.name} variants={cardAnim}>
              <article className="story-card" style={{ '--story-accent': st.accent }}>
                <motion.div className="story-photo" variants={photoAnim}>
                  <img src={st.photo} alt={`${st.name} — ${st.role}`} loading="lazy" />
                  <span className="story-chip">{st.chip}</span>
                </motion.div>

                <div className="story-body">
                  <div className="story-head">
                    <Stars />
                    <span className="story-verified">Verified</span>
                  </div>

                  <motion.blockquote className="story-quote" variants={quoteAnim}>
                    "{st.quote}"
                  </motion.blockquote>

                  <footer className="story-person">
                    <img className="story-avatar" src={st.photo} alt="" loading="lazy" />
                    <div className="story-person-meta">
                      <strong>{st.name}</strong>
                      <span>{st.role}</span>
                    </div>
                  </footer>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}