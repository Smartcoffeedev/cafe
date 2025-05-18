'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import ImageUploader from '@/components/admin/ImageUploader';
import { useRouter } from 'next/navigation';

const GalleryPage = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategoryIndex, setEditingCategoryIndex] = useState(null);
    const [editingCategoryValue, setEditingCategoryValue] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        id: Date.now(),
        category: '',
        src: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    const handleBasicChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

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
        fetch('/api/gallery')
            .then(res => res.json())
            .then(data => {
                setItems(data.galleryItemsData || []);
                setCategories(data.categories || []);
            });
    }, []);

    const saveToJson = async (updatedItems, updatedCategories = categories) => {
        try {
            const response = await fetch('/api/gallery/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ galleryItems: updatedItems, categories: updatedCategories }),
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            toast.success('Cambios guardados correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar los cambios');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            id: item.id,
            category: item.category,
            src: item.src
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este elemento de la galería?')) {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
            await saveToJson(updatedItems);
            toast.success('Elemento eliminado correctamente');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedItems;
            let updatedCategories = [...categories];
            // Si la categoría del form no existe, agregarla
            if (formData.category && !updatedCategories.includes(formData.category)) {
                updatedCategories.push(formData.category);
            }
            // Limitar máximo 12 fotos por categoría
            const countInCategory = items.filter(item => item.category === formData.category).length;
            if (!editingItem && countInCategory >= 12) {
                toast.error('Solo puedes agregar hasta 12 fotos por categoría.');
                return;
            }
            if (editingItem) {
                updatedItems = items.map(item => 
                    item.id === editingItem.id 
                        ? { ...item, ...formData }
                        : item
                );
            } else {
                const newItem = {
                    id: Date.now(),
                    ...formData
                };
                updatedItems = [...items, newItem];
            }

            setItems(updatedItems);
            setCategories(updatedCategories);
            await saveToJson(updatedItems, updatedCategories);
            
            toast.success(editingItem ? 'Elemento actualizado correctamente' : 'Elemento agregado correctamente');
            
            setEditingItem(null);
            setShowAddModal(false);
            setFormData({
                id: Date.now(),
                category: '',
                src: ''
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar los cambios');
        }
    };

    const handleAddCategory = () => {
        const cat = newCategory.trim();
        if (!cat || categories.includes(cat)) return;
        const updated = [...categories, cat];
        setCategories(updated);
        setNewCategory('');
        saveToJson(items, updated);
    };

    const handleEditCategory = (index) => {
        setEditingCategoryIndex(index);
        setEditingCategoryValue(categories[index]);
    };

    const handleSaveEditCategory = (index) => {
        if (!editingCategoryValue.trim()) return;
        const updated = [...categories];
        updated[index] = editingCategoryValue.trim();
        setCategories(updated);
        setEditingCategoryIndex(null);
        setEditingCategoryValue('');
        saveToJson(items, updated);
    };

    const handleDeleteCategory = (index) => {
        const updated = categories.filter((_, i) => i !== index);
        setCategories(updated);
        saveToJson(items, updated);
    };

    if (!authChecked) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="dashboard-title">Gestión de Galería</h1>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className='bx bx-plus'></i>
                    Agregar Elemento
                </button>
            </div>

            <div className="masonry-admin-gallery">
                {items.map((item) => (
                    <div key={item.id} className="masonry-admin-item" style={{
                        backgroundColor: '#18192a',
                        borderRadius: '1.2rem',
                        boxShadow: '0 2px 16px rgba(37,99,235,0.07)',
                        padding: '1.5rem',
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        marginBottom: '2rem',
                        breakInside: 'avoid',
                    }}>
                        <div style={{ position: 'relative', width: '100%', height: 260, borderRadius: '1.2rem', overflow: 'hidden', background: '#151622' }}>
                            <Image 
                                src={item.src} 
                                alt={`Imagen de galería ${item.id}`}
                                fill
                                style={{ objectFit: 'cover', borderRadius: '1.2rem' }}
                            />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{
                                    color: '#fff',
                                    fontSize: '1.15rem',
                                    marginBottom: '0.3rem',
                                    fontWeight: '600'
                                }}>
                                    {item.title}
                                </h3>
                                <span style={{
                                    background: '#2563eb',
                                    color: '#fff',
                                    borderRadius: '1rem',
                                    padding: '0.18rem 0.9rem',
                                    fontSize: '0.93rem',
                                    fontWeight: 500,
                                    marginTop: '0.2rem',
                                    display: 'inline-block'
                                }}>{item.category}</span>
                                {item.description && (
                                    <p style={{ color: '#bdbdbd', fontSize: '0.98rem', marginTop: 6 }}>{item.description}</p>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '1rem'
                            }}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: '1px solid #43a5fe',
                                        backgroundColor: 'transparent',
                                        color: '#43a5fe',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <i className="bx bx-edit"></i> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: '1px solid #dc3545',
                                        backgroundColor: 'transparent',
                                        color: '#dc3545',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <i className="bx bx-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .masonry-admin-gallery {
                    column-count: 3;
                    column-gap: 2rem;
                }
                .masonry-admin-item {
                    break-inside: avoid;
                }
                @media (max-width: 1200px) {
                    .masonry-admin-gallery { column-count: 2; }
                }
                @media (max-width: 768px) {
                    .masonry-admin-gallery { column-count: 1; }
                }
            `}</style>

            <div style={{ marginBottom: 32, background: '#181828', borderRadius: 8, padding: 16 }}>
                <h3 style={{ color: '#fff', marginBottom: 12 }}>Categorías</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 12 }}>
                    {categories.map((cat, idx) => (
                        <li key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            {editingCategoryIndex === idx ? (
                                <>
                                    <input
                                        value={editingCategoryValue}
                                        onChange={e => setEditingCategoryValue(e.target.value)}
                                        style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #333', marginRight: 8 }}
                                    />
                                    <button onClick={() => handleSaveEditCategory(idx)} style={{ color: '#fff', background: '#2563eb', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Guardar</button>
                                    <button onClick={() => setEditingCategoryIndex(null)} style={{ color: '#fff', background: '#888', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <span style={{ color: '#fff', minWidth: 80 }}>{cat}</span>
                                    <button onClick={() => handleEditCategory(idx)} style={{ color: '#fff', background: '#2563eb', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Editar</button>
                                    <button onClick={() => handleDeleteCategory(idx)} style={{ color: '#fff', background: '#dc3545', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Eliminar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="Nueva categoría"
                        style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #333' }}
                    />
                    <button onClick={handleAddCategory} style={{ color: '#fff', background: '#43a5fe', border: 'none', borderRadius: 4, padding: '2px 12px', cursor: 'pointer' }}>Agregar</button>
                </div>
            </div>

            {/* Modal de Edición/Agregar */}
            {(editingItem || showAddModal) && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '2rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{
                            color: '#333',
                            marginBottom: '1.5rem',
                            fontSize: '1.5rem',
                            fontWeight: '600'
                        }}>
                            {editingItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#333',
                                    fontWeight: '500'
                                }}>Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleBasicChange('category', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <option value="" disabled>Selecciona una categoría</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#333',
                                    fontWeight: '500'
                                }}>Imagen</label>
                                <ImageUploader
                                    value={formData.src}
                                    onChange={(url) => handleBasicChange('src', url)}
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                marginTop: '2rem'
                            }}>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setEditingItem(null);
                                        setShowAddModal(false);
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#f5f5f5',
                                        color: '#333',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: 'none',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {editingItem ? 'Actualizar' : 'Agregar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage; 