import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
// import Logo from '@/components/common/Logo'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Nosotros' },
    { path: '/services', label: 'Servicios' },
    { path: '/contact', label: 'Contacto' },
  ]

  return (
    <header 
      className={`fixed-top w-100 z-3 transition-all duration-500 ${
        isScrolled 
          ? 'bg-dark-custom bg-opacity-95 shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
            <img 
              src="/img/all-img/logo/logotipo w.png" 
              alt="Logo" 
              className="h-12 transition-transform duration-300 hover-scale-110" 
            />
            <span className="fw-bold fs-3 text-light-custom">
              SmartCoffee
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="d-none d-md-flex align-items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-decoration-none text-light-custom position-relative ${
                  location.pathname === link.path ? 'text-primary fw-semibold' : ''
                }`}
              >
                {link.label}
                <span className={`position-absolute bottom-0 start-0 w-0 h-1 bg-primary transition-all duration-300 ${
                  location.pathname === link.path ? 'w-100' : 'hover-w-100'
                }`}></span>
              </Link>
            ))}
            <a 
              href="#contact" 
              className="btn btn-custom rounded-pill px-4 py-2 shadow-sm hover-shadow-lg transition"
            >
              Contactar
            </a>
          </nav>

          {/* Botón menú móvil */}
          <button 
            className="d-md-none btn btn-link text-light-custom p-0" 
            onClick={toggleMenu} 
            aria-label="Abrir menú"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <nav className="d-md-none position-absolute top-100 start-0 w-100 bg-card-custom shadow-sm rounded-bottom-3 py-3 px-4 animate__animated animate__fadeInDown">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`d-block py-2 text-decoration-none text-light-custom ${
                  location.pathname === link.path ? 'text-primary fw-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="#contact" 
              className="d-block mt-3 btn btn-custom rounded-pill text-center"
              onClick={() => setIsOpen(false)}
            >
              Contactar
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header 