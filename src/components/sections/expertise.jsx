'use client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Expertise = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className={`expertise-section ${isVisible ? 'visible' : ''}`}>
            <div className="container">
                <div className="section-title-2 style-3" data-animation="fade-up" data-delay={0.1}>
                    <div className="sub-title-3">
                        <p>Características</p>
                    </div>
                    <h2>Nuestras características y servicios</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="expertise-content">
                            <h2>Nuestra Experiencia</h2>
                            <p>
                                Más de 10 años creando soluciones tecnológicas innovadoras para el sector cafetero.
                            </p>
                            <Link to="/about" className="btn btn-primary">
                                Conoce más
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="expertise-stats">
                            <div className="stat-item">
                                <h3>1000+</h3>
                                <p>Cafeteras Vendidas</p>
                            </div>
                            <div className="stat-item">
                                <h3>50+</h3>
                                <p>Países</p>
                            </div>
                            <div className="stat-item">
                                <h3>98%</h3>
                                <p>Satisfacción</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .expertise-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2.2rem 1.5rem;
                    margin-top: 2.5rem;
                }
                .expertise-card {
                    background: linear-gradient(135deg, #18192a 0%, #23263a 60%, #18192a 100%);
                    border-radius: 1.5rem;
                    box-shadow: 0 4px 24px rgba(37,99,235,0.08);
                    padding: 2.2rem 1.5rem 1.7rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: box-shadow 0.2s, transform 0.2s;
                    min-height: 260px;
                    max-width: 340px;
                    margin: 0 auto;
                }
                .expertise-card:hover {
                    box-shadow: 0 8px 32px rgba(37,99,235,0.18);
                    transform: translateY(-6px) scale(1.03);
                }
                .expertise-card .icon {
                    font-size: 3.2rem;
                    color: #2563eb;
                    margin-bottom: 1.2rem;
                    background: #151622;
                    border-radius: 50%;
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 12px rgba(37,99,235,0.10);
                }
                .expertise-card h3 {
                    color: #fff;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.7rem;
                }
                .expertise-card p {
                    color: #bdbdbd;
                    font-size: 1.08rem;
                    font-weight: 400;
                }
                @media (max-width: 1100px) {
                    .expertise-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 700px) {
                    .expertise-grid {
                        grid-template-columns: 1fr;
                    }
                    .expertise-card {
                        max-width: 100%;
                    }
                }
            `}</style>
        </div>
    )
}

export default Expertise