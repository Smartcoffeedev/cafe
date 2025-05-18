'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './portfolio.css';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []));
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h1>Nuestros Proyectos</h1>
        <p>Descubre nuestros trabajos más recientes</p>
      </div>
      
      <div className="projects-grid" style={{
        display: 'grid',
        gap: '1.5rem',
        marginTop: '2rem',
        gridTemplateColumns: '1fr',
      }}>
        {projects.map((project, index) => (
          project.link ? (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card"
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  minHeight: 'unset',
                  background: '#18192a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  alignItems: 'stretch',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                }}
                whileHover={{ boxShadow: '0 6px 24px rgba(67, 165, 254, 0.18)', scale: 1.03 }}
              >
                <div className="project-image-container" style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '10px', marginBottom: '0.7rem' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={400}
                    className="project-image"
                    priority={index < 2}
                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px', display: 'block' }}
                  />
                </div>
                <div className="project-content" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div className="project-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                    <div className="tech-tags" style={{ marginBottom: 0 }}>
                      {project.benefits?.map((benefit, i) => (
                        <span key={i} className="tech-tag" style={{ fontSize: '0.7rem', marginRight: 4 }}>{benefit}</span>
                      ))}
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h2>
                    <p style={{ fontSize: '0.95rem', margin: 0, color: '#bdbdbd' }}>{project.description}</p>
                    <div className="project-meta" style={{ fontSize: '0.8rem', color: '#888', display: 'flex', gap: 8 }}>
                      <span className="project-category">{project.category}</span>
                      <span className="project-date">{new Date(project.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          ) : (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card"
              style={{
                padding: '1rem',
                borderRadius: '14px',
                minHeight: 'unset',
                background: '#18192a',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                alignItems: 'stretch',
                height: '100%',
              }}
            >
              <div className="project-image-container" style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '10px', marginBottom: '0.7rem' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={400}
                  className="project-image"
                  priority={index < 2}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px', display: 'block' }}
                />
              </div>
              <div className="project-content" style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div className="project-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
                  <div className="tech-tags" style={{ marginBottom: 0 }}>
                    {project.benefits?.map((benefit, i) => (
                      <span key={i} className="tech-tag" style={{ fontSize: '0.7rem', marginRight: 4 }}>{benefit}</span>
                    ))}
                  </div>
                  <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h2>
                  <p style={{ fontSize: '0.95rem', margin: 0, color: '#bdbdbd' }}>{project.description}</p>
                  <div className="project-meta" style={{ fontSize: '0.8rem', color: '#888', display: 'flex', gap: 8 }}>
                    <span className="project-category">{project.category}</span>
                    <span className="project-date">{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </div>
      <style jsx>{`
        @media (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;