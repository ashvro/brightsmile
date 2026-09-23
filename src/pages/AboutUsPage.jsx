import PageHero from '../components/layout/PageHero';
import About from '../components/sections/About';
import AboutExtras from '../components/sections/AboutExtras';
import AboutTeam from '../components/sections/AboutTeam';

export default function AboutUsPage() {
  return (
    <>
      <PageHero display="About Us" />
      <About />
      <AboutExtras />
      <AboutTeam />
    </>
  );
}