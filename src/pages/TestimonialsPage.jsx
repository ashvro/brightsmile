import PageHero from '../components/layout/PageHero';
import Testimonials from '../components/sections/Testimonials';
import TestimonialsExtras from '../components/sections/TestimonialsExtras';

export default function TestimonialsPage() {
  return (
    <>
      <PageHero display="Testimonials" />
      <Testimonials naked />
      <TestimonialsExtras />
    </>
  );
}