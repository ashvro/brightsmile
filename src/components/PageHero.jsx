import Reveal from './Reveal';
import './PageHero.css';

export default function PageHero({ tag, title, accent, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero-blob page-hero-blob-1" aria-hidden="true" />
      <div className="page-hero-blob page-hero-blob-2" aria-hidden="true" />
      <div className="container">
        <Reveal dir="up" className="page-hero-inner">
          <div className="section-tag section-tag-light">{tag}</div>
          <h1>{title} <span>{accent}</span></h1>
          <p>{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}