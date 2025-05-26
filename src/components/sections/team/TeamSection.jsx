import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import teamData from '../../../data/team.json';

const socialIcons = {
  instagram: { icon: 'bxl-instagram' },
  linkedin: { icon: 'bxl-linkedin' },
  tiktok: { icon: 'bxl-tiktok' },
  youtube: { icon: 'bxl-youtube' },
};

const TeamSection = () => {
  const team = teamData;

  return (
    <section className="w-full py-16 md:py-24 bg-[#050d1a]">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-2 md:px-6">
          <h3 className="text-primary text-center text-sm font-semibold mb-2">Nuestro Equipo</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">Conoce a nuestro equipo de expertos creativos.</h2>
          <p className="text-lg text-white/80 text-center mb-12">Un equipo apasionado por la innovación y la excelencia en cada proyecto.</p>
          <Swiper
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            speed={1200}
            modules={[Autoplay, Pagination]}
            loop
          >
            {team.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="flex flex-col items-center bg-[#181f2a] rounded-2xl shadow-lg py-8 px-4 text-center border border-[#23263a] w-full max-w-xs mx-auto min-h-[320px]">
                  <img
                    src={member.image ? member.image : '/img/all-img/jose.jpg'}
                    alt={member.name}
                    className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-[#23263a] bg-[#23263a]"
                  />
                  <h4 className="text-lg font-bold text-white mb-1 break-words">{member.name}</h4>
                  <span className="text-[#43e97b] font-semibold mb-4 block text-base break-words">{member.position}</span>
                  <div className="flex gap-5 justify-center w-full mt-auto pt-4">
                    {Object.entries(socialIcons).map(([key, val]) => (
                      <a
                        key={key}
                        href={member[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        className=""
                        style={{ opacity: member[key] ? 1 : 0.3, pointerEvents: member[key] ? 'auto' : 'none' }}
                      >
                        <i className={`bx ${val.icon} text-2xl text-white`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 