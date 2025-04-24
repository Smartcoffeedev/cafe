'use client'
import React from 'react'
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import ProjectCard from './projectCard';
import data from '@/db/projectsData.json';
import 'swiper/css';

const ProjectsSlider = () => {
    return (
        <div className="project-section pb-100">
            <div className="container">
                <div className="section-title-2 style-3" data-animation="fade-up" >
                    <div className="sub-title-3">
                        <p>Projects</p>
                    </div>
                    <h2>Unveil New Creative Horizons with Models</h2>
                </div>
            </div>
            <div className="container-fluid">
                <Swiper
                    spaceBetween={20}
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },
                        576: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 2
                        },
                        992: {
                            slidesPerView: 3
                        },
                        1200: {
                            slidesPerView: 3
                        }
                    }}
                    navigation={{
                        nextEl: ".next-nav",
                        prevEl: ".prev-nav",
                    }}
                    autoplay={{
                        delay: 5000
                    }}
                    speed={2000}
                    modules={[Navigation, Autoplay]}
                    loop
                    data-animation="fade-zoom-in" data-delay={0.2}
                >
                    {data.projectsData.map((project, index) => (
                        <SwiperSlide key={project.id}>
                            <ProjectCard project={project} index={index} height={424} width={636} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='navigation'>
                    <button className='prev-nav'>
                        <i className="fi fi-tr-arrow-small-left"></i>
                    </button>
                    <button className='next-nav '>
                        <i className="fi fi-tr-arrow-small-right"></i>
                    </button>
                </div>
                <div className="section-link-regular" data-animation="fade-zoom-in" data-delay={0.1}>
                    <p>Explore Our Amazing Projects. <Link href="/portfolio">View More</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSlider