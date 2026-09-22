import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/index.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const showFloatingContact = pathname !== '/contact';

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {showFloatingContact && <FloatingContact />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}