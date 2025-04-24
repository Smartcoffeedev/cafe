import data from '@/db/projectsData.json'
import React from 'react'
import ProjectCard from './projectCard'

const ProjectGrid = () => {
    return (
        <div className="project-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    {data.projectsData.slice(0, 4).map((project, index) => (
                        <div key={project.id} className="col-lg-6 col-sm-6" data-animation="fade-up">
                            <ProjectCard project={project} index={index} height={424} width={636}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectGrid