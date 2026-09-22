import PageHero from '../components/PageHero';
import Faq from '../components/Faq';
import FaqExtras from '../components/FaqExtras';
import Appointment from '../components/Appointment';

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
      <Appointment />
    </>
  );
}