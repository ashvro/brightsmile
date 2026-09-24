import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './ServiceVideos.css';

const videos = [
  {
    id: 'YKF7W8nVjpY',
    service: 'General Dentistry',
    title: 'A Routine Dental Checkup, Step by Step',
    duration: '22 min',
  },
  {
    id: 'jEQH0eZV6ww',
    service: 'Cosmetic Dentistry',
    title: 'How Veneers Are Placed',
    duration: '2 min',
  },
  {
    id: '-KizNvn8G0g',
    service: 'Orthodontics',
    title: 'How Clear Aligners Straighten Teeth',
    duration: '1 min',
  },
  {
    id: 'g-i3P-D6p7M',
    service: 'Dental Implants',
    title: 'Dental Implant Procedure — Medical Animation',
    duration: '3 min',
  },
  {
    id: 'fax049OwZpo',
    service: 'Teeth Whitening',
    title: 'Professional Teeth Whitening at the Dentist',
    duration: '15 min',
  },
  {
    id: 'rl_8bJeeGwM',
    service: 'Emergency Care',
    title: 'Dental Emergencies: What You Need to Know',
    duration: '2 min',
  },
];

export default function ServiceVideos() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const activeVideo = videos.find(v => v.id === active);

  return (
    <section className="videos section-pad" id="services-videos">
      <div className="container">
        <Reveal className="section-header">
          <h2 className="section-title">See Each Procedure <span>in Action</span></h2>
          <p className="section-subtitle">Not sure what a treatment involves? Watch a short, easy-to-follow guide for the service you're interested in before booking.</p>
        </Reveal>

        <div className="videos-grid">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 0.1}>
              <button
                type="button"
                className="video-card"
                onClick={() => setActive(v.id)}
                aria-label={`Watch: ${v.title}`}
              >
                <div className="video-thumb">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={`${v.title} — ${v.service}`}
                    loading="lazy"
                  />
                  <span className="video-play" aria-hidden="true" />
                  <span className="video-duration">{v.duration}</span>
                </div>
                <div className="video-body">
                  <span className="video-service">{v.service}</span>
                  <h3>{v.title}</h3>
                  <span className="video-watch">Watch video <span className="video-watch-arrow">→</span></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="videos-note">
          <p>External educational videos hosted on YouTube. They are shown to help you understand each procedure — always confirm details with our team.</p>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && activeVideo && (
          <motion.div
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeVideo.title} video`}
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="video-modal-frame"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.88, y: 28 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 18 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActive(null)}
                aria-label="Close video"
              >
                <MdClose />
              </button>
              <iframe
                className="video-modal-iframe"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="video-modal-meta">
                <span className="video-service">{activeVideo.service}</span>
                <h3>{activeVideo.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}