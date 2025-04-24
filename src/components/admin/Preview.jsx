'use client'
import React, { useState } from 'react'

const Preview = ({ data, type }) => {
    const [viewMode, setViewMode] = useState('desktop')

    const renderPreview = () => {
        switch(type) {
            case 'navigation':
                return (
                    <nav className="preview-nav">
                        <ul>
                            {data.map(item => (
                                <li key={item.id}>
                                    <a href={item.path}>
                                        {item.icon && <i className={item.icon}></i>}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            case 'testimonials':
                return (
                    <div className="preview-testimonials">
                        {data.map(item => (
                            <div key={item.id} className="preview-testimonial">
                                <div className="preview-testimonial-content">
                                    <p>{item.content}</p>
                                </div>
                                <div className="preview-testimonial-author">
                                    <h4>{item.name}</h4>
                                    <p>{item.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            // Añadir más casos según los tipos de datos
            default:
                return <div>Vista previa no disponible</div>
        }
    }

    return (
        <div className="preview-container">
            <div className="preview-header">
                <h3>Vista Previa</h3>
                <button 
                    className="preview-toggle"
                    onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}
                >
                    <i className={`bx bx-${viewMode === 'desktop' ? 'desktop' : 'mobile'}`}></i>
                </button>
            </div>
            <div className={`preview-content ${viewMode}`}>
                {renderPreview()}
            </div>
        </div>
    )
}

export default Preview 