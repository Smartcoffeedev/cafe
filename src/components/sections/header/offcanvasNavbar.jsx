'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ResponsiveNavbar = () => {
    const [navigationData, setNavigationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    // Datos por defecto actualizados con las rutas correctas
    const defaultNavigation = [
        { label: "Inicio", href: "/", hasDropdown: false, isActive: true },
        { label: "Ecosistema", href: "/portfolio", hasDropdown: false },
        { label: "Sobre nosotros", href: "/about", hasDropdown: false },
        { label: "Servicios", href: "/services", hasDropdown: false },
        { label: "Carta", href: "/products-list", hasDropdown: false },
        { label: "FAQ", href: "/faq", hasDropdown: false },
        { label: "Contacto", href: "/contact", hasDropdown: false }
    ];

    useEffect(() => {
        fetchNavigationData();
    }, []);

    const fetchNavigationData = async () => {
        try {
            const response = await fetch('/api/navigation');
            const data = await response.json();
            
            if (data && data.navigation && Array.isArray(data.navigation)) {
                setNavigationData(data.navigation);
            } else if (data && data.navigationData && Array.isArray(data.navigationData)) {
                setNavigationData(data.navigationData);
            } else if (Array.isArray(data)) {
                setNavigationData(data);
            } else {
                console.log('Using default navigation');
                setNavigationData(defaultNavigation);
            }
        } catch (error) {
            console.error('Error fetching navigation data:', error);
            setNavigationData(defaultNavigation);
        } finally {
            setLoading(false);
        }
    };

    const checkIsActive = (item, pathname) => {
        if (item.href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(item.href);
    };

    const handleLinkClick = () => {
        const offcanvasElement = document.getElementById('navbar-offcanvas');
        if (offcanvasElement && window.bootstrap) {
            const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
                offcanvas.hide();
            }
        }
    };

    if (loading) {
        return (
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-offcanvas" aria-labelledby="navbar-offcanvas-label">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="navbar-offcanvas-label">Menú</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                </div>
                <div className="offcanvas-body">
                    <p>Cargando menú...</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="offcanvas offcanvas-start" 
            tabIndex="-1" 
            id="navbar-offcanvas" 
            aria-labelledby="navbar-offcanvas-label"
            data-bs-scroll="true"
            data-bs-backdrop="true"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="navbar-offcanvas-label">Menú</h5>
                <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Cerrar"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div className="accordion" id="navbarAccordion">
                    {Array.isArray(navigationData) && navigationData.map((item, index) => {
                        const isActive = checkIsActive(item, pathname);
                        
                        return (
                            <div className="accordion-item" key={item.label || index}>
                                <Link 
                                    href={item.href} 
                                    className={`accordion-link without-icon ${isActive ? 'active' : ''}`}
                                    onClick={handleLinkClick}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveNavbar;