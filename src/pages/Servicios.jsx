import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Services from '../components/sections/Services';

const Servicios = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center justify-center">
      <Services />
    </main>
    <Footer />
  </>
);

export default Servicios; 