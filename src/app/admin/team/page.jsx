'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import TeamCard from '@/components/sections/team/teamCard';
import ImageUploader from '@/components/admin/ImageUploader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const TeamPage = () => {
    const [members, setMembers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        bio: '',
        image: '',
        socialMedia: {
            linkedin: '',
            twitter: '',
            github: '',
            instagram: ''
        }
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name.startsWith('social.')) {
            const socialPlatform = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                socialMedia: {
                    ...prev.socialMedia,
                    [socialPlatform]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }, []);

    const handleSocialMediaChange = useCallback((platform, value) => {
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [platform]: value
            }
        }));
    }, []);

    const handleBasicChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const fetchMembers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/team');
            if (!response.ok) throw new Error('No se pudo cargar el archivo de equipo');
            const data = await response.json();
            setMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
            setAlertMessage(error.message);
            setShowAlert(true);
            setMembers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin');
            if (!isAdmin) {
                router.replace('/login');
            } else {
                setAuthChecked(true);
                fetchMembers();
            }
        }
    }, [router]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            setAlertMessage('Por favor, selecciona un archivo de imagen válido');
            setShowAlert(true);
            return;
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setAlertMessage('La imagen no debe superar los 5MB');
            setShowAlert(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al subir la imagen');
            }

            const data = await response.json();
            
            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Actualizar el formData con la URL de la imagen
            setFormData(prev => ({
                ...prev,
                image: data.imageUrl
            }));

            setAlertMessage('Imagen subida correctamente');
            setShowAlert(true);
        } catch (error) {
            console.error('Error al subir imagen:', error);
            setAlertMessage(error.message || 'Error al subir la imagen');
            setShowAlert(true);
        }
    };

    const handleEdit = (member) => {
        setEditingId(member.id);
        setFormData({
            name: member.name || '',
            position: member.position || '',
            bio: member.bio || '',
            image: member.image || '',
            socialMedia: {
                linkedin: member.socialMedia?.linkedin || '',
                twitter: member.socialMedia?.twitter || '',
                github: member.socialMedia?.github || '',
                instagram: member.socialMedia?.instagram || ''
            }
        });
        setPreviewImage(member.image || null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
            try {
                const response = await fetch('/api/team', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    await fetchMembers();
                    setAlertMessage('Miembro eliminado correctamente');
                    setShowAlert(true);
                } else {
                    throw new Error('Error al eliminar el miembro');
                }
            } catch (error) {
                console.error('Error al eliminar miembro:', error);
                setAlertMessage('Error al eliminar el miembro');
                setShowAlert(true);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newId = editingId;
            if (!editingId) {
                // Calcular el id más alto actual y sumar 1
                const maxId = members.length > 0 ? Math.max(...members.map(m => m.id || 0)) : 0;
                newId = maxId + 1;
            }
            const method = editingId ? 'PUT' : 'POST';
            const response = await fetch('/api/team', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingId ? { ...formData, id: editingId } : { ...formData, id: newId }),
            });

            if (response.ok) {
                await fetchMembers();
                setAlertMessage(editingId ? 'Miembro actualizado correctamente' : 'Miembro creado correctamente');
                setShowAlert(true);
                setEditingId(null);
                setFormData({
                    name: '',
                    position: '',
                    bio: '',
                    image: '',
                    socialMedia: {
                        linkedin: '',
                        twitter: '',
                        github: '',
                        instagram: ''
                    }
                });
                setPreviewImage(null);
            } else {
                throw new Error('Error al guardar el miembro');
            }
        } catch (error) {
            console.error('Error al guardar miembro:', error);
            setAlertMessage('Error al guardar el miembro');
            setShowAlert(true);
        }
    };

    if (!authChecked) return null;

    if (isLoading) {
        return (
            <div className="loading">
                <i className="bx bx-loader-alt bx-spin"></i>
                <p>Cargando equipo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <i className="bx bx-error-circle"></i>
                <h2>Error al cargar el equipo</h2>
                <p>{error}</p>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => window.location.reload()}
                >
                    <i className="bx bx-refresh"></i>
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="team-page">
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
                <h1>Gestión de Equipo</h1>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => {
                        setEditingId(null);
                        setFormData({
                            name: '',
                            position: '',
                            bio: '',
                            image: '',
                            socialMedia: {
                                linkedin: '',
                                twitter: '',
                                github: '',
                                instagram: ''
                            }
                        });
                        setPreviewImage(null);
                        setShowAddModal(true);
                    }}
                >
                    <i className="bx bx-plus"></i>
                    Nuevo Miembro
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
                    padding: '1rem'
                }}>
                    <div style={{
                        background: '#23272f',
                        borderRadius: 16,
                        padding: '1.5rem',
                        width: '100%',
                        maxWidth: 500,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                        position: 'relative'
                    }}>
                        <button
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                fontSize: 24,
                                cursor: 'pointer',
                                zIndex: 10,
                                padding: 4
                            }}
                            onClick={() => {
                                setEditingId(null);
                                setShowAddModal(false);
                                setFormData({
                                    name: '',
                                    position: '',
                                    bio: '',
                                    image: '',
                                    socialMedia: {
                                        linkedin: '',
                                        twitter: '',
                                        github: '',
                                        instagram: ''
                                    }
                                });
                                setPreviewImage(null);
                            }}
                        >
                            <i className="bx bx-x"></i>
                        </button>
                        <form onSubmit={handleSubmit} className="admin-form" style={{ marginTop: '1rem' }}>
                            <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleBasicChange('name', e.target.value)}
                                    placeholder="Nombre del miembro"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: 8,
                                        border: '1px solid #444',
                                        background: '#1a1a1a',
                                        color: '#fff'
                                    }}
                                />
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Posición</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={(e) => handleBasicChange('position', e.target.value)}
                                    placeholder="Cargo o posición"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: 8,
                                        border: '1px solid #444',
                                        background: '#1a1a1a',
                                        color: '#fff'
                                    }}
                                />
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Biografía</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={(e) => handleBasicChange('bio', e.target.value)}
                                    placeholder="Biografía del miembro"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: 8,
                                        border: '1px solid #444',
                                        background: '#1a1a1a',
                                        color: '#fff',
                                        minHeight: '100px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Redes Sociales</label>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <input
                                        type="url"
                                        name="social.linkedin"
                                        value={formData.socialMedia.linkedin}
                                        onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                                        placeholder="URL de LinkedIn"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: 8,
                                            border: '1px solid #444',
                                            background: '#1a1a1a',
                                            color: '#fff'
                                        }}
                                    />
                                    <input
                                        type="url"
                                        name="social.twitter"
                                        value={formData.socialMedia.twitter}
                                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                        placeholder="URL de Twitter"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: 8,
                                            border: '1px solid #444',
                                            background: '#1a1a1a',
                                            color: '#fff'
                                        }}
                                    />
                                    <input
                                        type="url"
                                        name="social.github"
                                        value={formData.socialMedia.github}
                                        onChange={(e) => handleSocialMediaChange('github', e.target.value)}
                                        placeholder="URL de GitHub"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: 8,
                                            border: '1px solid #444',
                                            background: '#1a1a1a',
                                            color: '#fff'
                                        }}
                                    />
                                    <input
                                        type="url"
                                        name="social.instagram"
                                        value={formData.socialMedia.instagram}
                                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                        placeholder="URL de Instagram"
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: 8,
                                            border: '1px solid #444',
                                            background: '#1a1a1a',
                                            color: '#fff'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff' }}>Imagen</label>
                                <div style={{
                                    border: '2px dashed #444',
                                    borderRadius: 8,
                                    padding: '1rem',
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                        {previewImage ? (
                                            <Image
                                                src={previewImage}
                                                alt="Preview"
                                                width={200}
                                                height={200}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: 8,
                                                    margin: '0 auto'
                                                }}
                                            />
                                        ) : (
                                            <div style={{ color: '#fff' }}>
                                                <i className="bx bx-image-add" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                                                <p>Haz clic para subir una imagen</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setShowAddModal(false);
                                        setFormData({
                                            name: '',
                                            position: '',
                                            bio: '',
                                            image: '',
                                            socialMedia: {
                                                linkedin: '',
                                                twitter: '',
                                                github: '',
                                                instagram: ''
                                            }
                                        });
                                        setPreviewImage(null);
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 8,
                                        border: 'none',
                                        background: '#ff4444',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 8,
                                        border: 'none',
                                        background: '#43a047',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {editingId ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Lista de miembros */}
            <div className="team-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {Array.isArray(members) && members.map((member) => (
                    <TeamCard
                        key={member.id}
                        member={member}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TeamPage; 