import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import Appointment from '../components/Appointment';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <Services />
      <About />
      <Testimonials />
      <Faq />
      <Appointment />
    </>
  );
}