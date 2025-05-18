'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ImageUploader from '@/components/admin/ImageUploader'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [viewingId, setViewingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        image: ''
    })
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const router = useRouter()
    const MAX_QUOTE_LENGTH = 220;

    const handleBasicChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const fetchTestimonials = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/testimonials');
            if (!response.ok) throw new Error('No se pudo cargar el archivo de testimonios');
            const data = await response.json();
            setTestimonials(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
            setAlertMessage(error.message);
            setShowAlert(true);
            setTestimonials([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin')
            if (!isAdmin) {
                router.replace('/login')
            } else {
                setAuthChecked(true)
                fetchTestimonials();
            }
        }
    }, [router])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            setAlertMessage('Por favor, selecciona un archivo de imagen válido')
            setShowAlert(true)
            return
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setAlertMessage('La imagen no debe superar los 5MB')
            setShowAlert(true)
            return
        }

        try {
            // Crear FormData para enviar la imagen
            const formData = new FormData()
            formData.append('image', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Error al subir la imagen')
            }

            const data = await response.json()
            
            // Crear preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)

            // Actualizar el formData con la URL de la imagen
            handleBasicChange('image', data.imageUrl)

            setAlertMessage('Imagen subida correctamente')
            setShowAlert(true)
        } catch (error) {
            console.error('Error al subir imagen:', error)
            setAlertMessage(error.message || 'Error al subir la imagen')
            setShowAlert(true)
        }
    }

    const handleEdit = (testimonial) => {
        setEditingId(testimonial.id)
        setFormData({
            name: testimonial.name || '',
            role: testimonial.role || '',
            content: testimonial.content || '',
            image: testimonial.image || ''
        })
        setPreviewImage(testimonial.image || null)
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
                });

                if (response.ok) {
                    await fetchTestimonials();
                    setAlertMessage('Testimonio eliminado correctamente');
                    setShowAlert(true);
                } else {
                    throw new Error('Error al eliminar el testimonio');
                }
            } catch (error) {
                console.error('Error al eliminar testimonio:', error);
                setAlertMessage('Error al eliminar el testimonio');
                setShowAlert(true);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingId ? 'PUT' : 'POST';
            const response = await fetch('/api/testimonials', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
            });

            if (response.ok) {
                await fetchTestimonials();
                setAlertMessage(editingId ? 'Testimonio actualizado correctamente' : 'Testimonio creado correctamente');
                setShowAlert(true);
                setEditingId(null);
                setShowAddModal(false);
                setFormData({
                    name: '',
                    role: '',
                    content: '',
                    image: ''
                });
                setPreviewImage(null);
            } else {
                throw new Error('Error al guardar el testimonio');
            }
        } catch (error) {
            console.error('Error al guardar testimonio:', error);
            setAlertMessage('Error al guardar el testimonio');
            setShowAlert(true);
        }
    }

    const handleView = (testimonial) => {
        setViewingId(testimonial.id)
        setFormData({
            name: testimonial.name || '',
            role: testimonial.role || '',
            content: testimonial.content || '',
            image: testimonial.image || ''
        })
        setPreviewImage(testimonial.image || null)
    }

    const handleCloseView = () => {
        setViewingId(null)
        setFormData({
            name: '',
            role: '',
            content: '',
            image: ''
        })
        setPreviewImage(null)
    }

    if (!authChecked) return null;

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
                    <button 
                        className="admin-btn admin-btn-close"
                        onClick={() => setShowAlert(false)}
                    >
                        <i className="bx bx-x"></i>
                    </button>
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
                            name: '',
                            role: '',
                            content: '',
                            image: ''
                        })
                        setPreviewImage(null)
                        setShowAddModal(true)
                    }}
                >
                    <i className="bx bx-plus"></i>
                    Nuevo Testimonio
                </button>
            </div>

            {/* Modal de formulario */}
            {(editingId !== null || showAddModal) && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        background: '#23272f',
                        borderRadius: 16,
                        padding: '2rem',
                        minWidth: 340,
                        maxWidth: 420,
                        width: '100%',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                        position: 'relative',
                    }}>
                        <button
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                fontSize: 24,
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                            onClick={() => {
                                setEditingId(null);
                                setShowAddModal(false);
                                setFormData({
                                    name: '',
                                    role: '',
                                    content: '',
                                    image: ''
                                });
                                setPreviewImage(null);
                            }}
                        >
                            <i className="bx bx-x"></i>
                        </button>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-group">
                                <label>Testimonio</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={(e) => handleBasicChange('content', e.target.value)}
                                    placeholder="Escribe el testimonio..."
                                    required
                                    maxLength={MAX_QUOTE_LENGTH}
                                />
                                <div style={{ fontSize: 13, color: formData.content.length > MAX_QUOTE_LENGTH - 20 ? '#ff4800' : '#888', textAlign: 'right', marginTop: 2 }}>
                                    {formData.content.length}/{MAX_QUOTE_LENGTH} caracteres
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>Autor</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleBasicChange('name', e.target.value)}
                                    placeholder="Nombre del autor"
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={(e) => handleBasicChange('role', e.target.value)}
                                    placeholder="Título o cargo"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Imagen</label>
                                <ImageUploader
                                    value={formData.image}
                                    onChange={(url) => handleBasicChange('image', url)}
                                />
                            </div>
                            <div className="admin-form-actions" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                <button type="submit" className="admin-btn admin-btn-primary" disabled={formData.content.length > MAX_QUOTE_LENGTH}>
                                    <i className="bx bx-save"></i>
                                    {editingId ? 'Actualizar' : 'Crear'}
                                </button>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-danger"
                                    onClick={() => {
                                        setEditingId(null);
                                        setShowAddModal(false);
                                        setFormData({
                                            name: '',
                                            role: '',
                                            content: '',
                                            image: ''
                                        });
                                        setPreviewImage(null);
                                    }}
                                >
                                    <i className="bx bx-x"></i>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de testimonios */}
            <div className="testimonials-list" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
            }}>
                {Array.isArray(testimonials) && testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card" style={{
                        background: '#18192a',
                        borderRadius: '16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                        padding: '2rem 1.5rem 1.5rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 340,
                        position: 'relative'
                    }}>
                        <div className="testimonial-image" style={{
                            width: 90,
                            height: 90,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginBottom: 18,
                            background: '#23272f',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                src={testimonial.image || '/images/testimonials/default.jpg'}
                                alt={testimonial.name}
                                width={90}
                                height={90}
                                style={{ objectFit: 'cover', borderRadius: '50%' }}
                                className="testimonial-img"
                            />
                        </div>
                        <div className="testimonial-info" style={{ textAlign: 'center', width: '100%' }}>
                            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginBottom: 4 }}>{testimonial.name}</h3>
                            <p className="role" style={{ color: '#bdbdbd', fontSize: '1rem', marginBottom: 10 }}>{testimonial.role}</p>
                            <p className="content testimonial-content-admin" style={{
                                color: '#e0e0e0',
                                fontSize: '1rem',
                                marginBottom: 18,
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-line',
                                maxHeight: 72,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                            }}>{testimonial.content}</p>
                        </div>
                        <div className="testimonial-actions" style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                            <button 
                                className="admin-btn admin-btn-primary"
                                style={{ minWidth: 90, borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: '1rem', boxShadow: 'none' }}
                                onClick={() => handleEdit(testimonial)}
                            >
                                <i className="bx bx-edit"></i>
                                Editar
                            </button>
                            <button 
                                className="admin-btn admin-btn-danger"
                                style={{ minWidth: 90, borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: '1rem', boxShadow: 'none' }}
                                onClick={() => handleDelete(testimonial.id)}
                            >
                                <i className="bx bx-trash"></i>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials 