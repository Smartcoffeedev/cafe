import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-custom shadow-lg' : 'bg-dark-custom'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="relative flex items-center w-full h-16">
          {/* Logo absolutamente centrado en mobile, a la izquierda en desktop */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none md:left-0 md:top-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center" style={{height: '56px', width: '120px', minWidth: '90px'}}>
                <img src="/img/all-img/LogotipoW.png" alt="SmartCoffee Logo" className="h-8 w-auto mx-auto" style={{maxWidth: '80px'}} />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center ml-auto">
            <Link to="/" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Inicio
            </Link>
            <Link to="/ecosistema" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Ecosistema
            </Link>
            <Link to="/carta" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Carta
            </Link>
            <Link to="/servicios" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Servicios
            </Link>
            <Link to="/sobre-nosotros" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Sobre Nosotros
            </Link>
            <Link to="/faq" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              FAQ
            </Link>
            <Link to="/contacto" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="ml-auto md:hidden">
            <button
              className="text-light-custom flex items-center justify-center"
              style={{ height: '56px', width: '56px' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-dark-custom rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/ecosistema"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ecosistema
              </Link>
              <Link
                to="/carta"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Carta
              </Link>
              <Link
                to="/servicios"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                to="/sobre-nosotros"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/faq"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/contacto"
                className="text-light-custom hover:text-white transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar; 