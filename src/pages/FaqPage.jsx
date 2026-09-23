import PageHero from '../components/layout/PageHero';
import Faq from '../components/sections/Faq';
import FaqExtras from '../components/sections/FaqExtras';

export default function FaqPage() {
  return (
    <>
      <PageHero display="Frequently Asked Questions" />
      <Faq naked />
      <FaqExtras />
    </>
  );
}