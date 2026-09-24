import './PageHero.css';

export default function PageHero({ bg }) {
  return (
    <section
      className="page-hero"
      style={{ '--hero-bg': `url('${bg || ''}')` }}
      aria-label="Page banner"
    />
  );
}
