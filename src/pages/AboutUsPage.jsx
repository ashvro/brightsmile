import PageHero from '../components/layout/PageHero';
import AboutExtras from '../components/sections/AboutExtras';
import AboutStats from '../components/sections/AboutStats';
import AboutTeam from '../components/sections/AboutTeam';
import dentalHeroAboutUs from '../assets/dental-hero-about-us.png';

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        display="About Us"
        bg={dentalHeroAboutUs}
      />
      <AboutExtras />
      <AboutStats />
      <AboutTeam />
    </>
  );
}