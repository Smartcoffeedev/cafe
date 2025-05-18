'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
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
            
            // Verificar la estructura correcta del JSON
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

    if (loading) {
        return (
            <ul className="navbar-nav">
                <li>Cargando...</li>
            </ul>
        );
    }

    return (
        <ul className="navbar-nav">
            {Array.isArray(navigationData) && navigationData.map((item, index) => {
                const isActive = checkIsActive(item, pathname);

                return (
                    <li key={item.label || index} className={`nav-item ${isActive ? 'active' : ''}`}>
                        <Link href={item.href} className="nav-link">
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Navbar;