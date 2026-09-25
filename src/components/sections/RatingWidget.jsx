import { useState } from 'react';
import { MdStar } from 'react-icons/md';
import Reveal from '../layout/Reveal';
import './RatingWidget.css';

const DEFAULT_COUNTS = [0, 0, 0, 0, 0, 0];

function loadCounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem('bs-ratings') || 'null');
    if (parsed && typeof parsed === 'object') {
      const counts = [...DEFAULT_COUNTS];
      for (let s = 1; s <= 5; s++) counts[s] = Number(parsed[s]) || 0;
      return counts;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_COUNTS;
}

export default function RatingWidget() {
  const [counts, setCounts] = useState(loadCounts);
  const [my, setMy] = useState(() => Number(localStorage.getItem('bs-my-rating')) || 0);
  const [hover, setHover] = useState(0);
  const [note, setNote] = useState(() => localStorage.getItem('bs-rating-note') || '');

  const total = counts.reduce((a, b) => a + b, 0);
  const avg = total ? (counts.reduce((a, c, s) => a + s * c, 0) / total).toFixed(1) : '0';

  const adjust = (from, to) => {
    setCounts(prev => {
      const next = [...prev];
      if (from > 0 && next[from] > 0) next[from] -= 1;
      next[to] += 1;
      localStorage.setItem('bs-ratings', JSON.stringify(next));
      return next;
    });
  };

  const rate = n => {
    adjust(my, n);
    setMy(n);
    localStorage.setItem('bs-my-rating', String(n));
  };

  const updateNote = e => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem('bs-rating-note', value);
  };

  const clear = () => {
    if (!my) return;
    setCounts(prev => {
      const next = [...prev];
      if (next[my] > 0) next[my] -= 1;
      localStorage.setItem('bs-ratings', JSON.stringify(next));
      return next;
    });
    setMy(0);
    setNote('');
    localStorage.removeItem('bs-my-rating');
    localStorage.removeItem('bs-rating-note');
  };

  return (
    <section className="rating-band section-pad">
      <div className="container">
        <Reveal>
          <div className="rating-widget">
            <div className="rating-head">
              <h2 className="rating-title">
                {my ? 'Thanks for your feedback!' : 'Rate Your Experience'}
              </h2>
              <p>
                {my
                  ? `You rated BrightSmile ${my}/5. Tap a star to update your rating.`
                  : 'Tap a star to rate your experience — no account needed.'}
              </p>
            </div>
            <div
              className="rating-stars"
              role="radiogroup"
              aria-label="Rate your experience"
              onMouseLeave={() => setHover(0)}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`rating-star${i < (hover || my) ? ' filled' : ''}`}
                  aria-label={`Rate ${i + 1} ${i === 0 ? 'star' : 'stars'}`}
                  aria-pressed={i < my}
                  onMouseEnter={() => setHover(i + 1)}
                  onFocus={() => setHover(i + 1)}
                  onClick={() => rate(i + 1)}
                >
                  <MdStar />
                </button>
              ))}
            </div>

            <div className="rating-message">
              <textarea
                className="rating-message-input"
                rows={3}
                maxLength={240}
                value={note}
                placeholder="Share a few words about your visit..."
                aria-label="Review message"
                onChange={updateNote}
              />
              <span className="rating-message-count">{note.length}/240</span>
            </div>

            {my && note.trim() && (
              <div className="rating-quote">&ldquo;{note.trim()}&rdquo;</div>
            )}

            <div className="rating-feedback">
              {my ? (
                <>
                  <span className="rating-note" role="status">
                    {note.trim() ? 'Review saved' : `You rated ${my}/5`}
                  </span>
                  <button type="button" className="rating-clear" onClick={clear}>Clear review</button>
                </>
              ) : (
                <span className="rating-note" role="status">
                  {hover ? `${hover}/5 — click to confirm` : ' '}
                </span>
              )}
            </div>
            <span className="rating-total">
              {total
                ? `${avg}/5 average from ${total} ${total === 1 ? 'on-site rating' : 'on-site ratings'}`
                : 'No on-site ratings yet — be the first!'}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}