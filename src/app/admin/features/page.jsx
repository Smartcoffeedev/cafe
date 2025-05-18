'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import IconSelector from '@/components/admin/IconSelector';
import { useRouter } from 'next/navigation';

const MAX_FEATURES = 8;

const FeaturesPage = () => {
    const [features, setFeatures] = useState([]);
    const [editingFeature, setEditingFeature] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        icon: '',
        description: ''
    });
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdmin = localStorage.getItem('isAdmin');
            if (!isAdmin) {
                router.replace('/login');
            } else {
                setAuthChecked(true);
            }
        }
    }, []);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => setFeatures(data.services || []));
    }, []);

    const handleEdit = (feature) => {
        setEditingFeature(feature);
        setFormData({
            title: feature.title,
            icon: feature.icon,
            description: feature.description
        });
        setShowAddModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta característica?')) {
            try {
                const response = await fetch('/api/services', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setFeatures(data.services);
                    toast.success('Característica eliminada correctamente');
                } else {
                    throw new Error('Error al eliminar la característica');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error al eliminar la característica');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!editingFeature && features.length >= MAX_FEATURES) {
                toast.error(`No se pueden crear más de ${MAX_FEATURES} características`);
                return;
            }

            const method = editingFeature ? 'PUT' : 'POST';
            const response = await fetch('/api/services', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingFeature ? { ...formData, id: editingFeature.id } : formData),
            });

            if (response.ok) {
                const data = await response.json();
                setFeatures(data.services);
                toast.success(editingFeature ? 'Característica actualizada correctamente' : 'Característica agregada correctamente');
                
                setEditingFeature(null);
                setShowAddModal(false);
                setFormData({
                    title: '',
                    icon: '',
                    description: ''
                });
            } else {
                throw new Error('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar los cambios');
        }
    };

    if (!authChecked) return null;

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1 className="dashboard-title">
                    Gestión de Características 
                    <span className="feature-count">
                        ({features.length}/{MAX_FEATURES})
                    </span>
                </h1>
                {features.length < MAX_FEATURES ? (
                    <button 
                        className="admin-btn admin-btn-primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className='bx bxs-plus-circle'></i>
                        Agregar Característica
                    </button>
                ) : (
                    <button 
                        className="admin-btn admin-btn-disabled"
                        disabled
                        title={`Máximo ${MAX_FEATURES} características permitidas`}
                    >
                        <i className='bx bxs-plus-circle'></i>
                        Límite Alcanzado
                    </button>
                )}
            </div>

            <div className="dashboard-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-header">
                            <div className="feature-icon">
                                <i className={`bx ${feature.icon}`}></i>
                            </div>
                        </div>
                        <div className="feature-actions">
                            <button
                                onClick={() => handleEdit(feature)}
                                className="admin-btn admin-btn-info btn-icon"
                                title="Editar"
                            >
                                <i className='bx bxs-edit'></i>
                            </button>
                            <button
                                onClick={() => handleDelete(feature.id)}
                                className="admin-btn admin-btn-danger btn-icon"
                                title="Eliminar"
                            >
                                <i className='bx bxs-trash'></i>
                            </button>
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingFeature ? 'Editar Característica' : 'Nueva Característica'}</h2>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingFeature(null);
                                    setFormData({
                                        title: '',
                                        icon: '',
                                        description: ''
                                    });
                                }}
                                className="admin-btn"
                                title="Cerrar"
                            >
                                <i className='bx bx-x'></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                    placeholder="Ingrese el título"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Icono</label>
                                <IconSelector
                                    value={formData.icon}
                                    onChange={(icon) => setFormData({...formData, icon})}
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows="4"
                                    required
                                    placeholder="Ingrese la descripción"
                                />
                            </div>
                            <div className="admin-form-actions">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingFeature(null);
                                        setFormData({
                                            title: '',
                                            icon: '',
                                            description: ''
                                        });
                                    }}
                                    className="admin-btn"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="admin-btn admin-btn-primary"
                                >
                                    {editingFeature ? 'Actualizar' : 'Agregar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturesPage; 