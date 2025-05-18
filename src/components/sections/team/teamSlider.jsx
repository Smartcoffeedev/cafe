'use client'
import React, { useEffect, useState } from 'react'
import LandingTeamCard from './landingTeamCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';

const TeamSlider = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('/api/team')
      .then(res => res.json())
      .then(data => setTeamMembers(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="team-section">
      <div className="container-fluid">
        <div className="team-content" data-animation="fade-up" data-delay={0.1}>
          <div className="sub-title-2">
            <p>Nuestro Equipo</p>
          </div>
          <h2>Conoce a nuestro equipo de expertos creativos.</h2>
          <p>Un equipo apasionado por la innovación y la excelencia en cada proyecto.</p>
        </div>
        <div className="team-slider-container">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 1 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 }
            }}
            navigation={false}
            autoplay={{ delay: 8000, disableOnInteraction: true }}
            speed={2000}
            modules={[Autoplay]}
            loop
            data-animation="fade-zoom-in" data-delay={0.2}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <LandingTeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style jsx>{`
        .team-section {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
          background: var(--section-bg);
        }
        .container-fluid {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .team-content {
          padding: 30px 0 10px 0;
          width: 100%;
          text-align: center;
        }
        .team-content h2 { color: var(--whiteColor); font-size: 2.5rem; margin-bottom: 20px; }
        .team-content p { color: var(--whiteColor); font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; }
        .sub-title-2 p { color: var(--mainColor2); font-size: 1.2rem; margin-bottom: 15px; }
        .team-slider-container {
          width: 100%;
          position: relative;
          overflow: visible;
          padding-top: 24px;
          padding-bottom: 24px;
        }
        @media (max-width: 768px) {
          .team-section { padding: 40px 0; min-height: auto; }
          .team-content { padding: 20px 0 10px 0; text-align: center; }
          .team-content h2 { font-size: 2rem; }
          .team-content p { font-size: 1rem; }
        }
      `}</style>
    </div>
  )
}

export default TeamSlider