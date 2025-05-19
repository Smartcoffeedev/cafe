'use client'
import React from 'react'
import { Link } from 'react-router-dom'
import './projectCard.css'

const ProjectGrid = ({ projects }) => {
    return (
        <div className="row">
            {projects.map((project, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                    <div className="project-card">
                        <div className="project-image-container">
                            <img
                                src={project.image}
                                alt={project.title}
                                width={370}
                                height={250}
                                className="project-image"
                                style={{objectFit: 'cover', borderRadius: '16px'}}
                            />
                            <div className="project-overlay">
                                <div className="project-content">
                                    <div className="project-tags">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                    <h3 className="project-title">
                                        <Link to={`/portfolio/${project.id}`}>
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="project-category">{project.category}</p>
                                    <div className="project-meta">
                                        <span className="client">{project.client}</span>
                                        <span className="date">{new Date(project.date).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/portfolio/${project.id}`} className="view-project-btn">
                                        Ver Proyecto
                                        <i className="bx bx-right-arrow-alt"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <style jsx>{`
                .project-card {
                    position: relative;
                    margin-bottom: 30px;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .project-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                }

                .project-image-container {
                    position: relative;
                    width: 100%;
                    height: 250px;
                }

                .project-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .project-card:hover .project-image {
                    transform: scale(1.1);
                }

                .project-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    display: flex;
                    align-items: flex-end;
                    padding: 20px;
                }

                .project-card:hover .project-overlay {
                    opacity: 1;
                }

                .project-content {
                    color: white;
                    width: 100%;
                }

                .project-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                .tech-tag {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    backdrop-filter: blur(5px);
                }

                .project-title {
                    font-size: 1.5rem;
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                .project-title a {
                    color: white;
                    text-decoration: none;
                }

                .project-category {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 10px;
                }

                .project-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 15px;
                }

                .view-project-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: white;
                    text-decoration: none;
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 25px;
                    transition: all 0.3s ease;
                }

                .view-project-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateX(5px);
                }

                .view-project-btn i {
                    transition: transform 0.3s ease;
                }

                .view-project-btn:hover i {
                    transform: translateX(5px);
                }
            `}</style>
        </div>
    )
}

export default ProjectGrid