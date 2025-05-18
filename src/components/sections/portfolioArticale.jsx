'use client'
import React, { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import SafeImage from '@/components/common/SafeImage'

const PortfolioArticale = () => {
    const [isOpen, setOpen] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    
    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => setProjectsData(data.projects || []));
    }, []);

    const project = projectsData[0]; // Por ahora usamos el primer proyecto
    
    return (
        <div className="portfolio-details ptb-100">
            <div className="container">
                <div className="row align-items-top">
                    <div className="col-lg-4">
                        <div className="portfolio-content">
                            <div className="sub-title">
                                Detalles del Proyecto
                            </div>
                            <ul>
                                <li> <span className="title">Fecha:</span> <span>{project.date}</span></li>
                                <li> <span className="title">Cliente:</span> <span>{project.client}</span></li>
                                <li> <span className="title">Servicios:</span> <span>{project.category}</span></li>
                                <li>
                                    <span className="title dtl">Descripción:</span>
                                    <p>{project.description}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="project-dec">
                            <div className="project-wrap">
                                <div className="project-video-wrap">
                                    <video className="project-video" src="/img/all-img/project-video.mp4" playsInline controls>
                                    </video>
                                </div>
                            </div>
                            <p>{project.description}</p>
                            <div className="project-image-waper">
                                <div className="row">
                                    <PhotoProvider>
                                        <div className="col-xl-6 col-md-6">
                                            <div className="image">
                                                <PhotoView src={project.image}>
                                                    <SafeImage 
                                                        width={416} 
                                                        height={377} 
                                                        sizes='100vw' 
                                                        src={project.image} 
                                                        alt={project.title} 
                                                        className="popup-img"
                                                        fallbackType="projects"
                                                    />
                                                </PhotoView>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6">
                                            <div className="image">
                                                <PhotoView src={project.image}>
                                                    <SafeImage 
                                                        width={416} 
                                                        height={377} 
                                                        sizes='100vw' 
                                                        src={project.image} 
                                                        alt={project.title} 
                                                        className="popup-img"
                                                        fallbackType="projects"
                                                    />
                                                </PhotoView>
                                            </div>
                                        </div>
                                    </PhotoProvider>
                                </div>
                            </div>
                            <p>{project.description}</p>
                            <a onClick={(e) => { setOpen(true), e.preventDefault() }} className="popup-youtube" href="#">
                                <div className="image-video">
                                    <SafeImage 
                                        width={856} 
                                        height={467} 
                                        sizes='100vw' 
                                        src={project.image} 
                                        alt={project.title}
                                        fallbackType="projects"
                                    />
                                    <div className="video-btn">
                                        <i className="bx bx-play" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo
                channel="youtube"
                youtube={{ mute: 0, autoplay: 0 }}
                isOpen={isOpen}
                videoId="vFINPUJDkS8"
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default PortfolioArticale