import React from 'react';
import Expertise from './expertise'
import WorkProcess from './workProcess'
import Skills from './skills'

const About = () => (
  <section className="about-section w-full py-16 md:py-24 bg-[#050d1a]">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Video */}
      <div className="w-full flex justify-center">
        <video
          src="/img/Video/video.mp4"
          controls
          className="rounded-2xl shadow-lg w-full max-w-md bg-black"
        />
      </div>
      {/* Texto */}
      <div className="w-full text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">¿QUÉ ES SMART COFFEE?</h2>
        <p className="text-lg md:text-xl text-white leading-relaxed">
          Somos un espacio donde las ideas del futuro cobran vida hoy. Somos el primer café Web 3.0 en Córdoba, un lugar diseñado para quienes buscan crecer, aprender y conectar en un entorno que combina la calidez de un café tradicional con las posibilidades del mundo financiero y tecnológico moderno. Aquí, personas apasionadas por la tecnología, las finanzas y la innovación se reúnen para intercambiar ideas, compartir conocimientos y construir juntos el futuro.
        </p>
      </div>
    </div>
  </section>
);

export default About; 