'use client'

import React from 'react'

const AboutOne = ({ className }) => {
    return (
        <div className={`about-section pb-100 ${className}`}>
            <div className="container">
                <div className="about-row-custom">
                    <div className="about-video-col">
                        <div className="about-wrap" data-animation="fade-zoom-in" data-aos-offset="100">
                            <div className="about-video-wrap">
                                <video className="about-video" src="/img/all-img/video-3.mp4" playsInline controls></video>
                            </div>
                        </div>
                    </div>
                    <div className="about-content-col">
                        <div className="about-content" data-animation="fade-up" data-delay={0.2}>
                            <h2>¿QUÉ ES SMART COFFEE?</h2>
                            <p>Somos un espacio donde las ideas del futuro cobran vida hoy. Somos el primer café Web 3.0 en Córdoba, un lugar diseñado para quienes buscan crecer, aprender y conectar en un entorno que combina la calidez de un café tradicional con las posibilidades del mundo financiero y tecnológico moderno. Aquí, personas apasionadas por la tecnología, las finanzas y la innovación se reúnen para intercambiar ideas, compartir conocimientos y construir juntos el futuro.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .about-section {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 100px 0;
                    position: relative;
                    background: var(--section-bg);
                }
                .about-section .container {
                    width: 100%;
                }
                .about-row-custom {
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    gap: 80px;
                }
                .about-video-col, .about-content-col {
                    flex: 1 1 0;
                    display: flex;
                    align-items: stretch;
                }
                .about-video-wrap {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: stretch;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .about-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .about-content-col {
                    display: flex;
                    align-items: center;
                }
                .about-content {
                    width: 100%;
                }
                .about-content h2 {
                    font-size: 55px;
                    margin-bottom: 30px;
                    color: var(--whiteColor);
                    font-weight: 700;
                }
                .about-content p {
                    font-size: 20px;
                    line-height: 1.8;
                    color: var(--paragraphColorSecond);
                    margin-bottom: 30px;
                }
                @media only screen and (max-width: 991px) {
                    .about-row-custom {
                        flex-direction: column;
                        gap: 40px;
                    }
                    .about-content h2 {
                        font-size: 35px;
                    }
                    .about-content p {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    )
}

export default AboutOne