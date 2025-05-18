'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import '@/assets/css/admin.css'

const AdminLayout = ({ children }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [authChecked, setAuthChecked] = React.useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin')
            if (!isAdmin) {
                router.replace('/login')
            } else {
                setAuthChecked(true);
            }
        }
    }, [])

    if (!authChecked) {
        return null; // O un loader si prefieres
    }

    const menuItems = [
        { name: 'Testimonios', path: '/admin/testimonials', icon: 'bx bx-message-square-dots' },
        { name: 'Equipo', path: '/admin/team', icon: 'bx bx-group' },
        { name: 'Proyectos', path: '/admin/projects', icon: 'bx bx-folder' },
        { name: 'Productos', path: '/admin/products', icon: 'bx bx-shopping-bag' },
        { name: 'Galería', path: '/admin/gallery', icon: 'bx bx-images' },
        { name: 'Servicios', path: '/admin/features', icon: 'bx bx-list-check' },
        { name: 'FAQ', path: '/admin/faq', icon: 'bx bx-help-circle' },
    ]

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Smart Coffee</h2>
                    <button
                        className="admin-btn admin-btn-danger"
                        style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
                        onClick={() => {
                            if (typeof window !== 'undefined') {
                                localStorage.removeItem('isAdmin');
                            }
                            router.replace('/login');
                        }}
                    >
                        <i className="bx bx-log-out" style={{ fontSize: '20px' }}></i>
                        Cerrar sesión
                    </button>
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