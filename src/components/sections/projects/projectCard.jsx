'use client';
import React from 'react'
import Link from 'next/link'
import SafeImage from '@/components/common/SafeImage'

const ProjectCard = ({project, index, width, height}) => {
    return (
        <div className="project-card">
            <div className="project-image">
                <SafeImage
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="project-img"
                    fallbackType="projects"
                />
                <div className="project-status">
                    <span className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                    </span>
                </div>
            </div>
            <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                {project.categories && (
                    <div className="project-categories">
                        {project.categories.map((category, index) => (
                            <span key={index} className="category-tag">
                                {category}
                            </span>
                        ))}
                    </div>
                )}
                {project.benefits && (
                    <div className="project-benefits">
                        <h5>Beneficios:</h5>
                        <ul>
                            {project.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectCard