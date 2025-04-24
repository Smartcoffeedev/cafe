'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import ResponsiveNavbar from './offcanvasNavbar'
import Image from 'next/image'

const Header = () => {
    const ref = useRef()
    const pathName = usePathname()
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Check initial size
        checkMobile();

        // Add event listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.classList.remove("style-2", "style-3");

        if (pathName === "/home-two") {
            ref.current.classList.add("style-2");
        } else if (pathName === "/home-three") {
            ref.current.classList.add("style-3");
        }
    }, [pathName]);

    // Handle sticky class on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 120);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apply sticky class dynamically
    useEffect(() => {
        if (!ref.current) return;

        if (isSticky) {
            ref.current.classList.add("sticky");
        } else {
            ref.current.classList.remove("sticky");
        }
    }, [isSticky]);

    return (
        <>
            <div ref={ref} className="navbar-area" id="navbar">
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <Link className="navbar-brand" href="/">
                            <Image 
                                src={isMobile ? "/img/all-img/Logo/Simbolo W.png" : "/img/all-img/Logo/Logotipo W.png"}
                                alt="SmartCoffee Logo" 
                                width={isMobile ? 70 : 250}
                                height={isMobile ? 70 : 70}
                                priority
                            />
                        </Link>
                        <div className="other-all-option">
                            <a className="navbar-toggler" data-bs-toggle="offcanvas" href="#navbarOffcanvas" role="button" aria-controls="navbarOffcanvas">
                                <span className="burger-menu">
                                    <span className="top-bar" />
                                    <span className="middle-bar" />
                                    <span className="bottom-bar" />
                                </span>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <Navbar />
                        </div>
                    </nav>
                </div>
            </div>
            <ResponsiveNavbar />
        </>
    )
}

export default Header