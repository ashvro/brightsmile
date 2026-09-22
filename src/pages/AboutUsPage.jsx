import PageHero from '../components/layout/PageHero';
import About from '../components/sections/About';
import AboutExtras from '../components/sections/AboutExtras';
import AboutTeam from '../components/sections/AboutTeam';
import Appointment from '../components/sections/Appointment';

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        tag="About Us"
        title="Dedicated to Your"
        accent="Dental Health"
        subtitle="Since 2009, BrightSmile Dental has delivered compassionate, modern dental care — building a practice where patients feel heard, respected, and at ease."
      />
      <About naked />
      <AboutExtras />
      <AboutTeam />
      <Appointment />
    </>
  );
}