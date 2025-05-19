'use client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProjectsSlider = () => {
    const [projectsData, setProjectsData] = useState([]);
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => setProjectsData(data.projects || []));
    }, []);

    return (
        <div className="project-section">
            <div className="container">
                <h1 className="main-title">Nuestros Proyectos</h1>
                <p className="subtitle">Descubre nuestros trabajos más recientes</p>
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                >
                    {projectsData.map((project, index) => (
                        <SwiperSlide key={project.id}>
                            <div className="project-slide">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={250}
                                    style={{objectFit: 'cover', borderRadius: '10px', width: '100%', height: '250px'}}
                                />
                                <h3>{project.title}</h3>
                                <Link to={`/portfolio/${project.id}`}>Ver Proyecto</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ProjectsSlider