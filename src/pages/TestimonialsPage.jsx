import PageHero from '../components/PageHero';
import Testimonials from '../components/Testimonials';
import TestimonialsExtras from '../components/TestimonialsExtras';
import Appointment from '../components/Appointment';

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