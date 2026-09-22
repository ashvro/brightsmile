import PageHero from '../components/layout/PageHero';
import Services from '../components/sections/Services';
import ServicesExtras from '../components/sections/ServicesExtras';
import ServiceVideos from '../components/sections/ServiceVideos';
import Appointment from '../components/sections/Appointment';

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Our Services"
        title="Comprehensive Dental"
        accent="Services"
        subtitle="From routine checkups to complete smile transformations, explore the treatments we offer — all delivered under one roof by our specialist team."
      />
      <Services naked />
      <ServicesExtras />
      <ServiceVideos />
      <Appointment />
    </>
  );
}