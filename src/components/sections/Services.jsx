import React, { useEffect, useState } from 'react';
import servicesData from '../../data/services.json';

const Services = () => {
  const features = servicesData;

  return (
    <section className="w-full bg-[#050d1a]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h3 className="text-primary text-sm font-semibold mb-2">Características</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Nuestras características y servicios</h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8"
          style={{ gridAutoRows: '1fr' }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#10162a] rounded-2xl shadow-lg flex flex-col items-center p-8 text-center transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#181f36]">
                <i className={`bx ${feature.icon} text-4xl text-primary`}></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-base text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 