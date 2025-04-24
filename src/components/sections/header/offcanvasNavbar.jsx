import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navigationData from '@/db/navigationData.json';

const ResponsiveNavbar = () => {
    return (
        <div className="responsive-navbar offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id="navbarOffcanvas">
            <div className="offcanvas-header">
                <Link className="logo d-inline-block" href="/">
                    <Image 
                        src="/img/all-img/Logo/Logotipo W.png"
                        alt="SmartCoffee Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </Link>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="accordion" id="navbarAccordion">
                    {navigationData.navigationData.map((item, index) => (
                        <div className="accordion-item" key={index}>
                            <Link href={item.href} className="accordion-link without-icon">
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="offcanvas-contact-info">
                    <h4>Follow On</h4>
                    <ul className="social-profile list-style">
                        <li><a href="#"><i className='bx bxl-facebook'></i></a></li>
                        <li><a href="#"><i className='bx bxl-instagram'></i></a></li>
                        <li><a href="#"><i className='bx bxl-linkedin'></i></a></li>
                        <li><a href="#"><i className='bx bxl-dribbble'></i></a></li>
                        <li><a href="#"><i className='bx bxl-pinterest'></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveNavbar;