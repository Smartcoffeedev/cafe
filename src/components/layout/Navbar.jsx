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
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-custom shadow-lg' : 'bg-dark-custom'
    }`}>
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center" style={{height: '56px', width: '120px', minWidth: '90px'}}>
              <img src="/img/all-img/LogotipoW.png" alt="SmartCoffee Logo" className="h-8 w-auto mx-auto" style={{maxWidth: '80px'}} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
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
            <div className="relative group">
              <button className="text-light-custom hover:text-white transition-colors text-lg py-2 flex items-center gap-1 focus:outline-none">
                Nosotros
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute left-0 mt-2 w-44 bg-[#181f2a] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-50">
                <Link to="/sobre-nosotros" className="block px-4 py-2 text-light-custom hover:bg-[#14325c] hover:text-white transition-colors">Sobre Nosotros</Link>
                <Link to="/faq" className="block px-4 py-2 text-light-custom hover:bg-[#14325c] hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <Link to="/contacto" className="text-light-custom hover:text-white transition-colors text-lg py-2">
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-light-custom"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
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
              <div className="relative">
                <button
                  className="text-light-custom hover:text-white transition-colors text-lg py-2 flex items-center gap-1 focus:outline-none w-full text-left"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  Nosotros
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="ml-4 mt-1 bg-[#181f2a] rounded-lg shadow-lg">
                  <Link to="/sobre-nosotros" className="block px-4 py-2 text-light-custom hover:bg-[#14325c] hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</Link>
                  <Link to="/faq" className="block px-4 py-2 text-light-custom hover:bg-[#14325c] hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                </div>
              </div>
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