'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [navigationData, setNavigationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Datos por defecto actualizados con las rutas correctas
    const defaultNavigation = [
        { label: "Inicio", href: "/", hasDropdown: false, isActive: true },
        { label: "Ecosistema", href: "/portfolio", hasDropdown: false },
        { label: "Carta", href: "/products-list", hasDropdown: false },
        { label: "Servicios", href: "/services", hasDropdown: false },
        { label: "Nosotros", href: "/sobre-nosotros", hasDropdown: false },
        { label: "FAQ", href: "/faq", hasDropdown: false },
        { label: "Contacto", href: "/contact", hasDropdown: false }
    ];

    useEffect(() => {
        setNavigationData(defaultNavigation);
        setLoading(false);
    }, []);

    const checkIsActive = (item, pathname) => {
        if (item.href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(item.href);
    };

    if (loading) {
        return (
            <ul className="navbar-nav">
                <li>Cargando...</li>
            </ul>
        );
    }

    return (
        <nav className="w-full bg-[#050d1a] shadow-lg" style={{ minHeight: '96px' }}>
            <ul className="navbar-nav flex flex-row items-center justify-center gap-8 py-6 text-lg md:text-xl font-semibold">
                {Array.isArray(navigationData) && navigationData.map((item, index) => {
                    const isActive = checkIsActive(item, location.pathname);

                    return (
                        <li key={item.label || index} className={`nav-item ${isActive ? 'active' : ''}`}>
                            <Link
                                to={item.href}
                                className={`nav-link px-4 py-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-[#2196f3] text-white shadow-md' : 'text-white/80 hover:bg-[#14325c] hover:text-white'}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;