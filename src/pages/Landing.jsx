import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import TeamSection from '../components/sections/team/TeamSection';
import Gallery from '../components/sections/imageGallery';
import TestimonialOne from '../components/sections/testimonial/testimonialOne';

const Landing = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TeamSection />
        <Gallery />
        <TestimonialOne />
      </main>
      <Footer />
    </>
  );
};

export default Landing; 