'use client'
import React, { useState, useEffect } from 'react'

const Dashboard = () => {
    const [stats, setStats] = useState([
        { 
            title: 'Testimonios', 
            value: 0, 
            icon: 'bx bx-message-square-dots', 
            color: '#43a5fe',
            path: '/admin/testimonials'
        },
        { 
            title: 'Equipo', 
            value: 0, 
            icon: 'bx bx-group', 
            color: '#4caf50',
            path: '/admin/team'
        },
        { 
            title: 'Reseñas', 
            value: 0, 
            icon: 'bx bx-star', 
            color: '#ff9800',
            path: '/admin/reviews'
        },
        { 
            title: 'Proyectos', 
            value: 0, 
            icon: 'bx bx-folder', 
            color: '#e91e63',
            path: '/admin/projects'
        },
        { 
            title: 'Productos', 
            value: 0, 
            icon: 'bx bx-shopping-bag', 
            color: '#9c27b0',
            path: '/admin/products'
        },
        { 
            title: 'Galería', 
            value: 0, 
            icon: 'bx bx-images', 
            color: '#2196f3',
            path: '/admin/gallery'
        },
        { 
            title: 'Características', 
            value: 0, 
            icon: 'bx bx-list-check', 
            color: '#00bcd4',
            path: '/admin/features'
        },
        { 
            title: 'FAQ', 
            value: 0, 
            icon: 'bx bx-help-circle', 
            color: '#ff5722',
            path: '/admin/faq'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    testimonials,
                    team,
                    reviews,
                    projects,
                    products,
                    gallery,
                    features,
                    faq
                ] = await Promise.all([
                    fetch('/api/testimonials').then(res => res.json()),
                    fetch('/api/team').then(res => res.json()),
                    fetch('/api/reviews').then(res => res.json()),
                    fetch('/api/projects').then(res => res.json()),
                    fetch('/api/products').then(res => res.json()),
                    fetch('/api/gallery').then(res => res.json()),
                    fetch('/api/features').then(res => res.json()),
                    fetch('/api/faq').then(res => res.json())
                ]);

                setStats(prevStats => prevStats.map(stat => {
                    let value = 0;
                    switch(stat.title) {
                        case 'Testimonios':
                            value = testimonials?.length || 0;
                            break;
                        case 'Equipo':
                            value = team?.teamMembers?.length || 0;
                            break;
                        case 'Reseñas':
                            value = reviews?.length || 0;
                            break;
                        case 'Proyectos':
                            value = projects?.length || 0;
                            break;
                        case 'Productos':
                            value = products?.length || 0;
                            break;
                        case 'Galería':
                            value = gallery?.length || 0;
                            break;
                        case 'Características':
                            value = features?.length || 0;
                            break;
                        case 'FAQ':
                            value = faq?.length || 0;
                            break;
                    }
                    return { ...stat, value };
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            
            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                        <div className="stat-icon" style={{ color: stat.color }}>
                            <i className={stat.icon}></i>
                        </div>
                        <div className="stat-info">
                            <h3>{stat.title}</h3>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard 