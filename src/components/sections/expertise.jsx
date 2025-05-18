'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Expertise = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => setServices((data.services || []).slice(0, 8)));
    }, []);
    return (
        <div id="expertise" className="expertise-area ptb-100">
            <div className="container">
                <div className="section-title-2 style-3" data-animation="fade-up" data-delay={0.1}>
                    <div className="sub-title-3">
                        <p>Características</p>
                    </div>
                    <h2>Nuestras características y servicios</h2>
                </div>
                <div className="expertise-grid">
                    {services.map((service, index) => (
                        <div key={service.id} className="expertise-card" data-animation="fade-up" data-delay={index * 0.1}>
                            <div className="icon">
                                <i className={`bx ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
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