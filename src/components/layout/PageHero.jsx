import Reveal from './Reveal';
import './PageHero.css';

function DisplayTitle({ text }) {
  const chars = text.split('');

  return (
    <h1 className="page-hero-display" aria-label={text}>
      <span className="page-hero-display-text" aria-hidden="true">
        {chars.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className={`page-hero-char${ch === ' ' ? ' is-space' : ''}`}
            style={{ '--i': i }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
      <span className="page-hero-shine" aria-hidden="true" />
    </h1>
  );
}

export default function PageHero({ tag, title, accent, subtitle, display }) {
  const isDisplay = Boolean(display);

  return (
    <section className={`page-hero${isDisplay ? ' page-hero-display-mode' : ''}`}>
      <div className="page-hero-blob page-hero-blob-1" aria-hidden="true" />
      <div className="page-hero-blob page-hero-blob-2" aria-hidden="true" />
      {isDisplay && (
        <>
          <div className="page-hero-ring page-hero-ring-1" aria-hidden="true" />
          <div className="page-hero-ring page-hero-ring-2" aria-hidden="true" />
          <div className="page-hero-orb page-hero-orb-1" aria-hidden="true" />
          <div className="page-hero-orb page-hero-orb-2" aria-hidden="true" />
          <div className="page-hero-grid" aria-hidden="true" />
        </>
      )}
      <div className="container page-hero-display-wrap">
        {isDisplay ? (
          <DisplayTitle text={display} />
        ) : (
          <Reveal dir="up" className="page-hero-inner">
            <div className="section-tag section-tag-light">{tag}</div>
            <h1>{title} <span>{accent}</span></h1>
            <p>{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
