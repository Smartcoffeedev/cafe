import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import About from '../components/sections/About';

const SobreNosotros = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12 mt-24">
      <About />
    </main>
    <Footer />
  </>
);

export default SobreNosotros; 