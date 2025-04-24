'use client'
import React, { useState, useEffect } from 'react'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [viewingId, setViewingId] = useState(null)
    const [formData, setFormData] = useState({
        quote: '',
        author: '',
        title: '',
        imageSrc: ''
    })
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Cargar datos iniciales
    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                setError(null)
                const response = await fetch('/api/testimonials')
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Error al cargar los testimonios')
                }
                const data = await response.json()
                if (!Array.isArray(data)) {
                    throw new Error('Los datos recibidos no tienen el formato esperado')
                }
                setTestimonials(data)
            } catch (error) {
                console.error('Error al cargar testimonios:', error)
                setError(error.message)
                setAlertMessage(error.message)
                setShowAlert(true)
                setTestimonials([])
            } finally {
                setIsLoading(false)
            }
        }

        loadTestimonials()
    }, [])

    const handleEdit = (testimonial) => {
        setEditingId(testimonial.id)
        setFormData({
            quote: testimonial.quote || '',
            author: testimonial.author || '',
            title: testimonial.title || '',
            imageSrc: testimonial.imageSrc || ''
        })
    }

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este testimonio?')) {
            try {
                const response = await fetch('/api/testimonials', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })

                if (response.ok) {
                    setTestimonials(prev => prev.filter(t => t.id !== id))
                    setAlertMessage('Testimonio eliminado correctamente')
                    setShowAlert(true)
                } else {
                    throw new Error('Error al eliminar el testimonio')
                }
            } catch (error) {
                console.error('Error al eliminar testimonio:', error)
                setAlertMessage('Error al eliminar el testimonio')
                setShowAlert(true)
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const method = editingId ? 'PUT' : 'POST'
            const response = await fetch('/api/testimonials', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
            })

            if (response.ok) {
                const updatedTestimonial = await response.json()
                if (editingId) {
                    setTestimonials(prev => prev.map(t => 
                        t.id === editingId ? updatedTestimonial : t
                    ))
                    setAlertMessage('Testimonio actualizado correctamente')
                } else {
                    setTestimonials(prev => [...prev, updatedTestimonial])
                    setAlertMessage('Testimonio creado correctamente')
                }
                setShowAlert(true)
                setEditingId(null)
                setFormData({
                    quote: '',
                    author: '',
                    title: '',
                    imageSrc: ''
                })
            } else {
                throw new Error('Error al guardar el testimonio')
            }
        } catch (error) {
            console.error('Error al guardar testimonio:', error)
            setAlertMessage('Error al guardar el testimonio')
            setShowAlert(true)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleView = (testimonial) => {
        setViewingId(testimonial.id)
        setFormData({
            quote: testimonial.quote || '',
            author: testimonial.author || '',
            title: testimonial.title || '',
            imageSrc: testimonial.imageSrc || ''
        })
    }

    const handleCloseView = () => {
        setViewingId(null)
        setFormData({
            quote: '',
            author: '',
            title: '',
            imageSrc: ''
        })
    }

    if (isLoading) {
        return (
            <div className="loading">
                <i className="bx bx-loader-alt bx-spin"></i>
                <p>Cargando testimonios...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <i className="bx bx-error-circle"></i>
                <h2>Error al cargar los testimonios</h2>
                <p>{error}</p>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => window.location.reload()}
                >
                    <i className="bx bx-refresh"></i>
                    Intentar de nuevo
                </button>
            </div>
        )
    }

    return (
        <div className="testimonials-page">
            {showAlert && (
                <div className="admin-alert">
                    <i className="bx bx-info-circle"></i>
                    <p>{alertMessage}</p>
                </div>
            )}

            <div className="page-header">
                <h1>Gestión de Testimonios</h1>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => {
                        setEditingId(null)
                        setViewingId(null)
                        setFormData({
                            quote: '',
                            author: '',
                            title: '',
                            imageSrc: ''
                        })
                    }}
                >
                    <i className="bx bx-plus"></i>
                    Nuevo Testimonio
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                    <label>Testimonio</label>
                    <textarea
                        name="quote"
                        value={formData.quote}
                        onChange={handleChange}
                        placeholder="Escribe el testimonio..."
                        required
                        disabled={viewingId !== null}
                    />
                </div>
                <div className="admin-form-group">
                    <label>Autor</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Nombre del autor"
                        required
                        disabled={viewingId !== null}
                    />
                </div>
                <div className="admin-form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Título o cargo"
                        disabled={viewingId !== null}
                    />
                </div>
                <div className="admin-form-group">
                    <label>URL de la imagen</label>
                    <input
                        type="text"
                        name="imageSrc"
                        value={formData.imageSrc}
                        onChange={handleChange}
                        placeholder="/img/all-img/testimonial-1.png"
                        disabled={viewingId !== null}
                    />
                </div>
                <div className="admin-form-actions">
                    {viewingId ? (
                        <button 
                            type="button" 
                            className="admin-btn admin-btn-primary"
                            onClick={handleCloseView}
                        >
                            <i className="bx bx-x"></i>
                            Cerrar Vista
                        </button>
                    ) : (
                        <>
                            <button type="submit" className="admin-btn admin-btn-primary">
                                <i className="bx bx-save"></i>
                                {editingId ? 'Actualizar' : 'Crear'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="admin-btn admin-btn-danger"
                                    onClick={() => {
                                        setEditingId(null)
                                        setFormData({
                                            quote: '',
                                            author: '',
                                            title: '',
                                            imageSrc: ''
                                        })
                                    }}
                                >
                                    <i className="bx bx-x"></i>
                                    Cancelar
                                </button>
                            )}
                        </>
                    )}
                </div>
            </form>

            {/* Lista de testimonios */}
            <div className="testimonials-list">
                {Array.isArray(testimonials) && testimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="testimonial-content">
                            <p className="testimonial-quote">
                                {testimonial.quote}
                            </p>
                            <div className="testimonial-author">
                                <h4>{testimonial.author}</h4>
                                {testimonial.title && <span>{testimonial.title}</span>}
                            </div>
                        </div>
                        <div className="testimonial-actions">
                            <button 
                                className="admin-btn admin-btn-info"
                                onClick={() => handleView(testimonial)}
                                title="Ver detalles"
                            >
                                <i className="bx bx-show"></i>
                            </button>
                            <button 
                                className="admin-btn admin-btn-warning"
                                onClick={() => handleEdit(testimonial)}
                                title="Editar"
                            >
                                <i className="bx bx-edit"></i>
                            </button>
                            <button 
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(testimonial.id)}
                                title="Eliminar"
                            >
                                <i className="bx bx-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials 