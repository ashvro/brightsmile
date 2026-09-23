import PageHero from '../components/layout/PageHero';
import Services from '../components/sections/Services';
import ServicesExtras from '../components/sections/ServicesExtras';
import ServiceVideos from '../components/sections/ServiceVideos';

export default function ServicesPage() {
  return (
    <>
      <PageHero display="Our Services" />
      <Services naked />
      <ServicesExtras />
      <ServiceVideos />
    </>
  );
}
