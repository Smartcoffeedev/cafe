import navigationData from '@/db/navigationData.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
    const pathname = usePathname();

    const checkIsActive = (item, currentPathname) => {
        if (item.href === currentPathname) return true;
        return false;
    };

    return (
        <ul className="navbar-nav">
            {navigationData.navigationData.map((item) => {
                const isActive = checkIsActive(item, pathname);

                return (
                    <li key={item.label} className={`nav-item ${item.hasDropdown ? 'dropdown' : ''}`}>
                        <Link
                            href={item.href}
                            className={`nav-link ${item.hasDropdown ? 'dropdown-toggle' : ''} ${isActive ? 'active' : ''}`}
                        >
                            {item.label}
                            {item.hasDropdown && <i className="bx bx-down-arrow-alt" />}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Navbar;