import ServicesExtras from '../components/sections/ServicesExtras';
import ServiceInfo from '../components/sections/ServiceInfo';
import ServiceVideos from '../components/sections/ServiceVideos';
import PageHero from '../components/layout/PageHero';
import dentalHeroServices from '../assets/dental-hero-services.png';

export default function ServicesPage() {
  return (
    <>
      <PageHero display="Our Services" bg={dentalHeroServices} />
      <ServiceInfo />
      <ServiceVideos />
      <ServicesExtras />
    </>
  );
}
