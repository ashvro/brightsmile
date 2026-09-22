import PageHero from '../components/PageHero';
import Services from '../components/Services';
import ServicesExtras from '../components/ServicesExtras';
import ServiceVideos from '../components/ServiceVideos';
import Appointment from '../components/Appointment';

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