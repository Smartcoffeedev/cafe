'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';

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
                
                <div className="projects-container">
                    {projectsData.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                {project.image && (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={600}
                                        height={400}
                                        className="main-image"
                                    />
                                )}
                            </div>
                            <div className="project-info">
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                <div className="tech-tags">
                                    {project.benefits?.map((benefit, i) => (
                                        <span key={i} className="tech-tag">{benefit}</span>
                                    ))}
                                </div>
                                <div className="project-meta">
                                    <span className="project-category">{project.category}</span>
                                    <span className="project-date">{new Date(project.date).toLocaleDateString()}</span>
                                </div>
                                <a 
                                    href={project.url} 
                                    className="view-project"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver Proyecto
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .project-section {
                    padding: 80px 0;
                    background: #0a0b1a;
                    min-height: 100vh;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .main-title {
                    font-size: 48px;
                    font-weight: 700;
                    text-align: center;
                    color: #ffffff;
                    margin-bottom: 10px;
                }

                .subtitle {
                    text-align: center;
                    color: #8b8b8b;
                    margin-bottom: 60px;
                }

                .projects-container {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .project-card {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .project-card:hover {
                    transform: translateY(-5px);
                }

                .project-image {
                    width: 100%;
                    height: 400px;
                    position: relative;
                    overflow: hidden;
                }

                .main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .project-card:hover .main-image {
                    transform: scale(1.05);
                }

                .project-info {
                    padding: 30px;
                }

                .project-info h2 {
                    font-size: 28px;
                    color: #ffffff;
                    margin-bottom: 15px;
                }

                .project-info p {
                    color: #8b8b8b;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .tech-tags {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }

                .tech-tag {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ffffff;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }

                .project-card:hover .tech-tag {
                    background: rgba(37, 99, 235, 0.2);
                    color: #2563eb;
                }

                .project-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .project-category, .project-date {
                    color: #8b8b8b;
                    font-size: 14px;
                    transition: color 0.3s ease;
                }

                .project-card:hover .project-category,
                .project-card:hover .project-date {
                    color: #ffffff;
                }

                .view-project {
                    display: inline-block;
                    background: #2563eb;
                    color: #ffffff;
                    padding: 12px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .view-project:hover {
                    background: #1d4ed8;
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .main-title {
                        font-size: 36px;
                    }

                    .project-image {
                        height: 300px;
                    }

                    .project-info h2 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProjectsSlider