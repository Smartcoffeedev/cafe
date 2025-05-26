import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FaqSection from '../components/sections/faqSection';

const FAQ = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center justify-center mt-24">
      <FaqSection />
    </main>
    <Footer />
  </>
);

export default FAQ; 