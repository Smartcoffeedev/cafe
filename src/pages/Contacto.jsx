import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Contacto = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-4">Contacto</h1>
      <p className="text-muted-custom max-w-xl text-center mb-8">¿Tienes alguna pregunta? Ponte en contacto con nosotros.</p>
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.2353581337024!2d-64.24768412507383!3d-31.380073294495652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329f001c51bf5b%3A0x9f8200204ac19755!2sSmart%20Coffe!5e0!3m2!1ses!2sar!4v1747643703284!5m2!1ses!2sar"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Smart Coffee"
          ></iframe>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <div>
            <span className="font-bold text-lg">Ubicación:</span><br />
            Barranquitas Plaza, José Roque Funes 1145, Córdoba.
          </div>
          <div>
            <span className="font-bold text-lg">Correo:</span> <a href="mailto:info@smartcoffee.com" className="text-primary hover:underline">info@smartcoffee.com</a>
          </div>
          <div>
            <span className="font-bold text-lg">Teléfono:</span> <a href="tel:+543514567890" className="text-primary hover:underline">+54 351 456-7890</a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Contacto; 