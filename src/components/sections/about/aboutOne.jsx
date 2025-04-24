import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const AboutOne = ({ className }) => {
    return (
        <div className={`about-section pb-100 ${className}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="about-wrap" data-animation="fade-zoom-in" data-aos-offset="100">
                            <div className="about-video-wrap">
                                <video className="about-video" src="/img/all-img/video-3.mp4" playsInline autoPlay loop controls>
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="about-content" data-animation="fade-up" data-delay={0.2}>
                            <h2>¿QUÉ ES SMART COFFEE?</h2>
                            <p>Somos un espacio donde las ideas del futuro cobran vida hoy. Somos el primer café Web 3.0 en Córdoba, un lugar diseñado para quienes buscan crecer, aprender y conectar en un entorno que combina la calidez de un café tradicional con las posibilidades del mundo financiero y tecnológico moderno. Aquí, personas apasionadas por la tecnología, las finanzas y la innovación se reúnen para intercambiar ideas, compartir conocimientos y construir juntos el futuro.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutOne