import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Marquee from '../components/sections/Marquee';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import Faq from '../components/sections/Faq';
import Appointment from '../components/sections/Appointment';

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