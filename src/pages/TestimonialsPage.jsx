import PageHero from '../components/layout/PageHero';
import TestimonialsStories from '../components/sections/TestimonialsStories';
import TestimonialsExtras from '../components/sections/TestimonialsExtras';
import dentalHeroTestimonials from '../assets/dental-hero-testimonials.png';

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        display="Testimonials"
        bg={dentalHeroTestimonials}
      />
      <TestimonialsStories />
      <TestimonialsExtras />
    </>
  );
}