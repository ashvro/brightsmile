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
  return (
    <section className="videos section-pad">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag">Watch How It Works</div>
          <h2 className="section-title">See Each Procedure <span>in Action</span></h2>
          <p className="section-subtitle">Not sure what a treatment involves? Watch a short, easy-to-follow guide for the service you're interested in before booking.</p>
        </Reveal>

        <div className="videos-grid">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 0.1}>
              <a
                className="video-card"
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="videos-note">
          <p>External educational videos hosted on YouTube. They are shown to help you understand each procedure — always confirm details with our team.</p>
        </Reveal>
      </div>
    </section>
  );
}