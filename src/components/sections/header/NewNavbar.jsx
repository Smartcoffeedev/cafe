'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NewNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const pathname = usePathname();

    // Datos de navegación
    const navigationItems = [
        { label: "Inicio", href: "/" },
        { label: "Ecosistema", href: "/portfolio" },
        { label: "Sobre nosotros", href: "/about" },
        { label: "Servicios", href: "/services" },
        { label: "Carta", href: "/products-list" },
        { label: "FAQ", href: "/faq" },
        { label: "Contacto", href: "/contact" }
    ];

    // Manejar el scroll para el efecto sticky
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar el menú al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            <nav className={`new-navbar ${isSticky ? 'sticky' : ''}`}>
                <div className="nav-container">
                    <Link href="/" className="nav-logo">
                        <Image 
                            src="/img/all-img/Logo/Logotipo W.png"
                            alt="SmartCoffee Logo" 
                            width={110}
                            height={36}
                            priority
                        />
                    </Link>

                    <button 
                        className={`nav-toggle ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            <style jsx>{`
                .new-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: var(--DarkBg);
                    z-index: 1000;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid #1A243D;
                }

                .new-navbar.sticky {
                    background: rgba(5, 5, 30, 0.95);
                    backdrop-filter: blur(10px);
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-logo {
                    z-index: 1001;
                }

                .nav-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 30px;
                    height: 21px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 1001;
                }

                .nav-toggle span {
                    width: 100%;
                    height: 3px;
                    background: var(--whiteColor);
                    border-radius: 3px;
                    transition: all 0.3s ease;
                }

                .nav-toggle.active span:nth-child(1) {
                    transform: translateY(9px) rotate(45deg);
                }

                .nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .nav-toggle.active span:nth-child(3) {
                    transform: translateY(-9px) rotate(-45deg);
                }

                .nav-menu {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }

                .nav-link {
                    color: var(--whiteColor);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }

                .nav-link:hover,
                .nav-link.active {
                    color: var(--mainColor2);
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--mainColor2);
                    transition: width 0.3s ease;
                }

                .nav-link:hover::after,
                .nav-link.active::after {
                    width: 100%;
                }

                @media (max-width: 768px) {
                    .nav-toggle {
                        display: flex;
                    }

                    .nav-menu {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 100%;
                        height: 100vh;
                        background: var(--DarkBg);
                        flex-direction: column;
                        justify-content: center;
                        gap: 2rem;
                        transition: right 0.3s ease;
                        padding: 2rem;
                    }

                    .nav-menu.active {
                        right: 0;
                    }

                    .nav-link {
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </>
    );
};

export default NewNavbar; 