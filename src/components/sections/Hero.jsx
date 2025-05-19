import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Cargar el script de Spline
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#050d1a] overflow-hidden">
      {/* Modelo 3D de Spline */}
      <div className="absolute inset-0 z-0">
        <spline-viewer 
          url="https://prod.spline.design/44DlCQFHT2T49ZNP/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        ></spline-viewer>
      </div>

      {/* Contenido principal */}
      <div className="relative container mx-auto px-4 h-screen flex items-center z-10">
        <div className="w-full text-center flex flex-col items-center justify-center">
          {/* Mini subtítulo */}
          <span className="uppercase tracking-widest text-xs md:text-sm text-primary font-semibold mb-4 block">SMARTCOFFEE</span>
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="block text-white">DISFRUTA DE UN BUEN CAFÉ</span>
            <span className="block text-primary">MIENTRAS CONECTAS CON EL FUTURO</span>
          </h1>
          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/carta"
              className="btn-custom px-8 py-3 rounded-lg text-center"
            >
              Ver carta
            </Link>
            <Link
              to="/contacto"
              className="btn-outline-custom px-8 py-3 rounded-lg text-center"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6 text-light-custom"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero; 