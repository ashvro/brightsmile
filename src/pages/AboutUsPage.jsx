import PageHero from '../components/PageHero';
import About from '../components/About';
import AboutExtras from '../components/AboutExtras';
import AboutTeam from '../components/AboutTeam';
import Appointment from '../components/Appointment';

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