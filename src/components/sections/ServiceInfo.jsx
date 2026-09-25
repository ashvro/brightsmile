import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MdHealthAndSafety,
  MdFaceRetouchingNatural,
  MdAlignHorizontalCenter,
  MdAnchor,
  MdFlashOn,
  MdOfflineBolt,
  MdExpandMore,
  MdCheck,
  MdStar,
  MdSchedule,
  MdEventAvailable,
  MdSelfImprovement,
  MdVerified,
  MdArrowForward,
} from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './ServiceInfo.css';

import svcGeneral from '../../assets/svc-general.jpg';
import svcCosmetic from '../../assets/svc-cosmetic.jpg';
import svcOrtho from '../../assets/svc-ortho.jpg';
import svcImplant from '../../assets/svc-implant.jpg';
import svcWhitening from '../../assets/svc-whitening.jpg';
import svcEmergency from '../../assets/svc-emergency.jpg';

const PHOTO = {
  general: svcGeneral,
  cosmetic: svcCosmetic,
  ortho: svcOrtho,
  implant: svcImplant,
  whitening: svcWhitening,
  emergency: svcEmergency,
};

const services = [
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    color: '#0f7d6d',
    icon: MdHealthAndSafety,
    bg: PHOTO.general,
    book: 'General Checkup',
    desc: 'Comprehensive exams, fillings, cleanings, and preventive care to keep your smile healthy. Our general dentistry is the foundation of everything we do — unhurried, thorough, and designed around you.',
    includes: [
      'Comprehensive digital exams & X-rays',
      'Professional cleaning & polishing',
      'Fillings and painless extractions',
      'Oral cancer screening',
    ],
    duration: '30 – 45 min',
    visits: '1 visit',
    comfort: 'Gentle & painless',
    insurance: 'Most plans accepted',
    rating: '4.9',
    bestFor: 'Anyone due for a routine checkup, or with a toothache they want seen fast.',
    faq: [
      { q: 'How often should I have a checkup?', a: 'Most patients benefit from a checkup and cleaning every six months, though we tailor the interval to your individual risk.' },
      { q: 'Do you treat nervous patients?', a: 'Absolutely. We offer comfort-first, unhurried care and can adapt every step to your pace.' },
    ],
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    color: '#3fb5a0',
    icon: MdFaceRetouchingNatural,
    bg: PHOTO.cosmetic,
    book: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers designed to give you the confidence you deserve. Every smile design starts with a consultation and a digital preview so you know the result before we begin.',
    includes: [
      'Smile design consultation',
      'Digital smile preview',
      'Veneers & composite bonding',
      'Complete smile makeovers',
    ],
    duration: '60 – 90 min per visit',
    visits: '2 – 3 visits',
    comfort: 'Minimal discomfort',
    insurance: 'Payment plans available',
    rating: '4.8',
    bestFor: 'Discoloured, chipped, or uneven teeth you want transformed in a few visits.',
    faq: [
      { q: 'How long do veneers last?', a: 'With good care, quality veneers typically last 10–15 years before needing attention.' },
      { q: 'Is the procedure painful?', a: 'No — it is carried out under local anaesthetic, and most patients return to normal life the same day.' },
    ],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    color: '#c9a84c',
    icon: MdAlignHorizontalCenter,
    bg: PHOTO.ortho,
    book: 'Orthodontics / Aligners',
    desc: 'Clear aligners and braces for children, teens, and adults. Straighten your smile discreetly with monthly progress checks and a treatment plan built around your goals and lifestyle.',
    includes: [
      'Invisalign clear aligners',
      'Traditional & ceramic braces',
      'Monthly progress monitoring',
      'Retainers after treatment',
    ],
    duration: '6 – 18 months',
    visits: 'Every 4 – 8 weeks',
    comfort: 'Mild, temporary soreness',
    insurance: 'Interest-free plans',
    rating: '4.9',
    bestFor: 'Crooked, crowded, or gapped teeth — at any age.',
    faq: [
      { q: 'How long does treatment take?', a: 'Most cases complete in 6–18 months depending on complexity; we give a realistic estimate up front.' },
      { q: 'Will aligners affect my everyday life?', a: 'Minimally. Aligners are removable for eating and brushing, so they fit around your routine.' },
    ],
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    color: '#4c86c0',
    icon: MdAnchor,
    bg: PHOTO.implant,
    book: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements that restore function and aesthetics. From single teeth to full-arch restorations, implants help you eat, speak, and smile with total confidence.',
    includes: [
      'Single & full-arch implants',
      '3D-guided placement',
      'Bone grafting when needed',
      'Permanent crown restoration',
    ],
    duration: '3 – 6 months overall',
    visits: '3 – 4 visits',
    comfort: 'Healing period after surgery',
    insurance: 'Payment plans available',
    rating: '4.9',
    bestFor: 'Missing one or more teeth and wanting a permanent, natural-feeling replacement.',
    faq: [
      { q: 'Are implants painful?', a: 'The procedure is done under local anaesthetic; post-operative discomfort is typically mild and manageable.' },
      { q: 'How long do implants last?', a: 'With good oral hygiene, implants can last 20+ years and often a lifetime.' },
    ],
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    color: '#26a69a',
    icon: MdFlashOn,
    bg: PHOTO.whitening,
    book: 'Teeth Whitening',
    desc: 'Professional in-office and take-home whitening treatments for a brighter smile in days. Safe, enamel-friendly formulas brighten your smile several shades — without the guesswork of retail kits.',
    includes: [
      'In-office whitening sessions',
      'Custom take-home kits',
      'Sensitive-teeth formula',
      'Enamel-safe protocol',
    ],
    duration: '60 min session',
    visits: '1 – 2 visits',
    comfort: 'Comfortable',
    insurance: 'Self-pay service',
    rating: '4.8',
    bestFor: 'Stains from coffee, tea, or ageing you want to visibly lift before a big event.',
    faq: [
      { q: 'How many shades brighter will my smile be?', a: 'Most patients see 4–8 shades brighter immediately after the in-office treatment.' },
      { q: 'Does whitening make teeth sensitive?', a: 'Some patients notice temporary sensitivity, which we minimise with desensitising formula.' },
    ],
  },
  {
id: 'emergency-care',
    title: 'Emergency Care',
    color: '#e27b6a',
    icon: MdOfflineBolt,
    bg: PHOTO.emergency,
    book: 'Emergency Care',
    desc: 'Same-day appointments for urgent dental issues. From severe pain to knocked-out teeth, we\'re here when you need us most — call ahead and we\'ll fit you in fast.',
    includes: [
      'Same-day emergency slots',
      'Rapid pain relief',
      'Trauma & broken tooth care',
      'Follow-up treatment plan',
    ],
    duration: 'Priority — same day',
    visits: '1 urgent visit',
    comfort: 'Immediate relief focus',
    insurance: 'Emergency coverage',
    rating: '4.9',
    bestFor: 'Sudden toothaches, swelling, or dental injuries that can\'t wait for a normal booking.',
    faq: [
      { q: 'How soon can I be seen?', a: 'We reserve same-day slots for emergencies — call us and we\'ll aim to see you within hours.' },
      { q: 'What should I do before I arrive?', a: 'For a knocked-out tooth, keep it in milk and call us immediately. For pain, a cold compress helps while you travel.' },
    ],
  },
];

const compareRows = [
  { label: 'Typical duration', key: 'duration', icon: MdSchedule },
  { label: 'Visits needed', key: 'visits', icon: MdEventAvailable },
  { label: 'Comfort level', key: 'comfort', icon: MdSelfImprovement },
  { label: 'Insurance', key: 'insurance', icon: MdVerified },
  { label: 'Patient rating', key: 'rating', icon: MdStar },
  { label: 'Best for', key: 'bestFor', icon: null },
];

const staggerWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const bodyAnim = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export default function ServiceInfo() {
  const [open, setOpen] = useState(null);

  const bookService = s => {
    window.dispatchEvent(new CustomEvent('book-service', { detail: { service: s.book } }));
  };

  return (
    <>
      <section className="svc-guide section-pad" id="services-guide">
        <div className="edge-rails" aria-hidden="true">
          <span className="edge-rail edge-rail-l" />
          <span className="edge-rail edge-rail-r" />
          <span className="edge-arc edge-arc-l" />
          <span className="edge-arc edge-arc-r" />
          <span className="edge-dots edge-dots-tl" />
          <span className="edge-dots edge-dots-br" />
        </div>
        <div className="container">
          <Reveal className="svc-guide-head">
            <h2 className="section-title">Service <span>Details</span></h2>
            <p className="section-subtitle">Expand each treatment for its full description, what's included, and answers to common questions.</p>
          </Reveal>

          <div className="svc-accordion">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isOpen = open === s.id;
              return (
                <Reveal key={s.id} delay={Math.min(i * 0.06, 0.25)}>
                  <div
                    id={`svc-${s.id}`}
                    className={`svc-item${isOpen ? ' is-open' : ''}${i % 2 === 1 ? ' is-reverse' : ''}`}
                    style={{ '--svc-accent': s.color }}
                  >
                    <span className="svc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <img className="svc-bg" src={s.bg} alt="" aria-hidden="true" />
                    <button
                      type="button"
                      className="svc-item-head"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : s.id)}
                    >
                      <motion.span
                        className="svc-item-ico"
                        animate={isOpen ? { scale: 1.08, rotate: 4 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                      >
                        <Icon />
                      </motion.span>
                      <span className="svc-item-title">{s.title}</span>
                      <motion.span
                        className="svc-item-chevron"
                        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        aria-hidden="true"
                      >
                        <MdExpandMore />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="svc-item-body"
                          initial={bodyAnim.initial}
                          animate={bodyAnim.animate}
                          exit={bodyAnim.exit}
                          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <motion.div
                            className="svc-item-inner"
                            variants={staggerWrap}
                            initial="hidden"
                            animate="show"
                          >
                            <motion.p variants={fadeUp} className="svc-item-desc">{s.desc}</motion.p>

                            <motion.div variants={fadeUp} className="svc-item-grid">
                              <div className="svc-col">
                                <h4>What's included</h4>
                                <ul className="svc-includes">
                                  {s.includes.map(item => (
                                    <li key={item}><MdCheck aria-hidden="true" /> {item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="svc-col">
                                <h4>At a glance</h4>
                                <ul className="svc-facts">
                                  <li><MdSchedule aria-hidden="true" /><span>Duration</span><strong>{s.duration}</strong></li>
                                  <li><MdEventAvailable aria-hidden="true" /><span>Visits</span><strong>{s.visits}</strong></li>
                                  <li><MdSelfImprovement aria-hidden="true" /><span>Comfort</span><strong>{s.comfort}</strong></li>
                                  <li><MdVerified aria-hidden="true" /><span>Insurance</span><strong>{s.insurance}</strong></li>
                                  <li><MdStar aria-hidden="true" /><span>Rating</span><strong>{s.rating} / 5</strong></li>
                                </ul>
                              </div>

                              <div className="svc-col">
                                <h4>Common questions</h4>
                                <div className="svc-faq">
                                  {s.faq.map(f => (
                                    <div className="svc-faq-item" key={f.q}>
                                      <p className="svc-faq-q">{f.q}</p>
                                      <p className="svc-faq-a">{f.a}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>

                            <motion.div variants={fadeUp} className="svc-item-cta">
                              <p className="svc-item-best">{s.bestFor}</p>
                              <div className="svc-item-actions">
                                <button type="button" className="btn-primary" onClick={() => bookService(s)}>
                                  Book this <MdArrowForward aria-hidden="true" />
                                </button>
                                <a className="svc-item-watch" href="#services-videos">Watch the procedure →</a>
                              </div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="svc-compare section-pad">
        <div className="container">
          <Reveal className="svc-compare-head">
            <h2 className="section-title">Which Service <span>Fits You?</span></h2>
            <p className="section-subtitle">A quick comparison of every treatment across the factors that matter most.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="svc-compare-scroll">
              <table className="svc-compare-table">
                <thead>
                  <tr>
                    <th className="svc-cmp-label">Compare</th>
                    {services.map(s => {
                      const Icon = s.icon;
                      return (
                        <th key={s.id} style={{ '--svc-accent': s.color }}>
                          <Icon aria-hidden="true" />
                          {s.title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(row => (
                    <tr key={row.label}>
                      <th className="svc-cmp-label" scope="row">
                        {row.icon ? <row.icon aria-hidden="true" /> : null}
                        {row.label}
                      </th>
                      {services.map(s => (
                        <td key={s.id}>{s[row.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}