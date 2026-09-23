import { useCallback, useRef } from 'react';
import Reveal from './Reveal';
import './PageHero.css';

function DisplayTitle({ text }) {
  const chars = text.split('');
  const rootRef = useRef(null);
  const frame = useRef(0);

  const onMove = useCallback(e => {
    const root = rootRef.current;
    if (!root) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      root.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      root.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
      root.style.setProperty('--tilt-x', `${(-py * 6).toFixed(2)}deg`);
      root.style.setProperty('--tilt-y', `${(px * 8).toFixed(2)}deg`);
      root.style.setProperty('--shift-x', `${(px * 12).toFixed(1)}px`);
      root.style.setProperty('--shift-y', `${(py * 8).toFixed(1)}px`);
    });
  }, []);

  const onLeave = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    cancelAnimationFrame(frame.current);
    root.style.setProperty('--mx', '50%');
    root.style.setProperty('--my', '50%');
    root.style.setProperty('--tilt-x', '0deg');
    root.style.setProperty('--tilt-y', '0deg');
    root.style.setProperty('--shift-x', '0px');
    root.style.setProperty('--shift-y', '0px');
  }, []);

  return (
    <div
      className="page-hero-stage"
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
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
      </h1>
    </div>
  );
}

export default function PageHero({ tag, title, accent, subtitle, display }) {
  const isDisplay = Boolean(display);
  const sectionRef = useRef(null);
  const frame = useRef(0);

  const onSectionMove = useCallback(e => {
    const el = sectionRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });
  }, []);

  const onSectionLeave = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '40%');
  }, []);

  return (
    <section
      className={`page-hero${isDisplay ? ' page-hero-display-mode' : ''}`}
      ref={sectionRef}
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
      style={{ '--mx': '50%', '--my': '40%' }}
    >
      <div className="page-hero-glass-layer" aria-hidden="true">
        <span className="page-hero-glass-sheen" />
        <span className="page-hero-glass-edge" />
      </div>
      <div className="page-hero-blob page-hero-blob-1" aria-hidden="true" />
      <div className="page-hero-blob page-hero-blob-2" aria-hidden="true" />
      <div className="page-hero-noise" aria-hidden="true" />
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
