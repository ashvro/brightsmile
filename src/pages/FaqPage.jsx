import PageHero from '../components/layout/PageHero';
import Faq from '../components/sections/Faq';
import FaqExtras from '../components/sections/FaqExtras';

export default function FaqPage() {
  return (
    <>
      <PageHero
        tag="Common Questions"
        title="Frequently Asked"
        accent="Questions"
        subtitle="Everything you need to know before your visit. Can't find an answer? Call us anytime and a member of our team will help."
      />
      <Faq naked />
      <FaqExtras />
    </>
  );
}