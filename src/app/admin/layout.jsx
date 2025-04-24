'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '@/assets/css/admin.css'

const AdminLayout = ({ children }) => {
    const pathname = usePathname()
    
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: 'bx bxs-dashboard' },
        { name: 'Testimonios', path: '/admin/testimonials', icon: 'bx bx-message-square-dots' },
        { name: 'Equipo', path: '/admin/team', icon: 'bx bx-group' },
        { name: 'Reseñas', path: '/admin/reviews', icon: 'bx bx-star' },
        { name: 'Proyectos', path: '/admin/projects', icon: 'bx bx-folder' },
        { name: 'Productos', path: '/admin/products', icon: 'bx bx-shopping-bag' },
        { name: 'Galería', path: '/admin/gallery', icon: 'bx bx-images' },
        { name: 'Características', path: '/admin/features', icon: 'bx bx-list-check' },
        { name: 'FAQ', path: '/admin/faq', icon: 'bx bx-help-circle' },
    ]

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Smart Coffee</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link 
                                    href={item.path}
                                    className={pathname === item.path ? 'active' : ''}
                                >
                                    <i className={item.icon}></i>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout 