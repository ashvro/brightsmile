import PageHero from '../components/layout/PageHero';
import Testimonials from '../components/sections/Testimonials';
import TestimonialsExtras from '../components/sections/TestimonialsExtras';
import Appointment from '../components/sections/Appointment';

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        tag="Patient Stories"
        title="Kind Words From"
        accent="Our Patients"
        subtitle="Real experiences from the patients we've had the privilege to care for — read how BrightSmile changed the way they think about dentistry."
      />
      <Testimonials naked />
      <TestimonialsExtras />
      <Appointment />
    </>
  );
}