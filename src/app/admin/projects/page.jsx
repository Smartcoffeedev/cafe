'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import ImageUploader from '@/components/admin/ImageUploader';
import { useRouter } from 'next/navigation';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        benefits: [],
        date: new Date().toISOString().split('T')[0],
        featured: false,
        link: ''
    });
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newBenefit, setNewBenefit] = useState('');
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

    const handleBenefitsChange = useCallback((benefits) => {
        setFormData(prev => ({
            ...prev,
            benefits
        }));
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== 'undefined') {
                const isAdmin = localStorage.getItem('isAdmin');
                if (!isAdmin) {
                    router.replace('/login');
                } else {
                    setAuthChecked(true);
                }
            }
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) throw new Error('Error al cargar proyectos');
                const data = await response.json();
                setProjects(data.projects || []);
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                toast.error('Error al cargar los proyectos');
            } finally {
                setIsLoading(false);
            }
        };
        if (authChecked) loadData();
    }, [authChecked]);

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            category: project.category || '',
            benefits: project.benefits || [],
            date: project.date || new Date().toISOString().split('T')[0],
            featured: project.featured || false,
            link: project.link || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;

        try {
            const response = await fetch('/api/projects', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (!response.ok) throw new Error('Error al eliminar el proyecto');
            
            const data = await response.json();
            setProjects(data.projects);
            toast.success('Proyecto eliminado correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al eliminar el proyecto');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingProject ? 'PUT' : 'POST';
            const response = await fetch('/api/projects', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProject ? { ...formData, id: editingProject.id } : formData)
            });

            if (!response.ok) throw new Error('Error al guardar el proyecto');
            
            const data = await response.json();
            setProjects(data.projects);
            toast.success(editingProject ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente');
            
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar el proyecto');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            category: '',
            benefits: [],
            date: new Date().toISOString().split('T')[0],
            featured: false,
            link: ''
        });
    };

    const handleAddBenefit = () => {
        if (!newBenefit.trim()) return;
        handleBenefitsChange([...formData.benefits, newBenefit.trim()]);
        setNewBenefit('');
    };

    const handleRemoveBenefit = (index) => {
        const newBenefits = [...formData.benefits];
        newBenefits.splice(index, 1);
        handleBenefitsChange(newBenefits);
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            toast.error('El nombre de la categoría no puede estar vacío');
            return;
        }

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al agregar categoría');
            }
            
            setCategories(data.categories);
            setNewCategory('');
            toast.success('Categoría agregada correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Error al agregar categoría');
        }
    };

    const handleEditCategory = async (oldName, newName) => {
        if (!newName.trim()) {
            toast.error('El nombre de la categoría no puede estar vacío');
            return;
        }

        try {
            const response = await fetch('/api/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldName, newName: newName.trim() })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al editar categoría');
            }
            
            setCategories(data.categories);
            setEditingCategory(null);
            setNewCategory('');
            toast.success('Categoría actualizada correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Error al editar categoría');
        }
    };

    const handleDeleteCategory = async (name) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const response = await fetch('/api/categories', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al eliminar categoría');
            }
            
            setCategories(data.categories);
            toast.success('Categoría eliminada correctamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Error al eliminar categoría');
        }
    };

    if (!authChecked) return null;

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando proyectos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <i className="bx bx-error-circle"></i>
                <h2>Error al cargar los proyectos</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    <i className="bx bx-refresh"></i>
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="projects-page">
            <div className="page-header">
                <h1>Gestión de Proyectos</h1>
                <button 
                    className="add-button"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bx bx-plus"></i>
                    Nuevo Proyecto
                </button>
            </div>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            <Image
                                src={project.image || '/images/projects/default-project.jpg'}
                                alt={project.title}
                                fill
                                className="project-thumbnail"
                            />
                            {project.featured && (
                                <div className="featured-badge">
                                    <i className="bx bxs-star"></i>
                                    Destacado
                                </div>
                            )}
                        </div>
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-meta">
                                <span className="category">{project.category}</span>
                                <span className="date">{new Date(project.date).toLocaleDateString()}</span>
                            </div>
                            <div className="benefits-list">
                                {project.benefits?.map((benefit, index) => (
                                    <span key={index} className="benefit-tag">
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <button 
                                    className="edit-button"
                                    onClick={() => handleEdit(project)}
                                >
                                    <i className="bx bx-edit"></i>
                                    Editar
                                </button>
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(project.id)}
                                >
                                    <i className="bx bx-trash"></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
                            <button className="close-button" onClick={handleCloseModal}>
                                <i className="bx bx-x"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="project-form">
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleBasicChange('title', e.target.value)}
                                    required
                                    placeholder="Título del proyecto"
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleBasicChange('description', e.target.value)}
                                    required
                                    rows="4"
                                    placeholder="Descripción del proyecto"
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoría</label>
                                <div className="category-selector">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleBasicChange('category', e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="manage-categories-button"
                                        onClick={() => setShowCategoryModal(true)}
                                    >
                                        <i className="bx bx-cog"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Beneficios</label>
                                <div className="benefits-container">
                                    <div className="benefits-list">
                                        {formData.benefits.map((benefit, index) => (
                                            <div key={index} className="benefit-item">
                                                <span>{benefit}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveBenefit(index)}
                                                >
                                                    <i className="bx bx-x"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="add-benefit">
                                        <input
                                            type="text"
                                            value={newBenefit}
                                            onChange={(e) => setNewBenefit(e.target.value)}
                                            placeholder="Agregar beneficio"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddBenefit();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddBenefit}
                                        >
                                            <i className="bx bx-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Fecha</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleBasicChange('date', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Imagen</label>
                                <ImageUploader
                                    value={formData.image}
                                    onChange={(url) => handleBasicChange('image', url)}
                                />
                            </div>
                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => handleBasicChange('featured', e.target.checked)}
                                    />
                                    Proyecto Destacado
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Enlace del Proyecto</label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={(e) => handleBasicChange('link', e.target.value)}
                                    placeholder="https://tuproyecto.com"
                                    pattern="https?://.+"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    <i className="bx bx-save"></i>
                                    {editingProject ? 'Actualizar' : 'Crear'}
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={handleCloseModal}
                                >
                                    <i className="bx bx-x"></i>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showCategoryModal && (
                <div className="modal-overlay">
                    <div className="modal-content category-modal">
                        <div className="modal-header">
                            <h2>Gestionar Categorías</h2>
                            <button className="close-button" onClick={() => {
                                setShowCategoryModal(false);
                                setEditingCategory(null);
                                setNewCategory('');
                            }}>
                                <i className="bx bx-x"></i>
                            </button>
                        </div>
                        <div className="category-form">
                            <div className="add-category">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Nueva categoría"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (editingCategory) {
                                                handleEditCategory(editingCategory, newCategory);
                                            } else {
                                                handleAddCategory();
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (editingCategory) {
                                            handleEditCategory(editingCategory, newCategory);
                                        } else {
                                            handleAddCategory();
                                        }
                                    }}
                                    className="add-button"
                                >
                                    <i className={`bx ${editingCategory ? 'bx-check' : 'bx-plus'}`}></i>
                                </button>
                            </div>
                            <div className="categories-list">
                                {categories.length === 0 ? (
                                    <div className="empty-state">
                                        <i className="bx bx-category"></i>
                                        <p>No hay categorías disponibles</p>
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <div key={category} className="category-item">
                                            {editingCategory === category ? (
                                                <div className="edit-category">
                                                    <input
                                                        type="text"
                                                        value={newCategory}
                                                        onChange={(e) => setNewCategory(e.target.value)}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleEditCategory(category, newCategory);
                                                            }
                                                        }}
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditCategory(category, newCategory)}
                                                        className="save-button"
                                                    >
                                                        <i className="bx bx-check"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingCategory(null);
                                                            setNewCategory('');
                                                        }}
                                                        className="cancel-button"
                                                    >
                                                        <i className="bx bx-x"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>{category}</span>
                                                    <div className="category-actions">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEditingCategory(category);
                                                                setNewCategory(category);
                                                            }}
                                                            className="edit-button"
                                                            title="Editar categoría"
                                                        >
                                                            <i className="bx bx-edit"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteCategory(category)}
                                                            className="delete-button"
                                                            title="Eliminar categoría"
                                                        >
                                                            <i className="bx bx-trash"></i>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .projects-page {
                    padding: 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .page-header h1 {
                    font-size: 2rem;
                    color: #ffffff;
                    margin: 0;
                }
                .add-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #2563eb;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .add-button:hover {
                    background: #1d4ed8;
                }
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }
                .project-card {
                    background: #20222b;
                    border-radius: 1.25rem;
                    border: 1.5px solid #23263a;
                    overflow: hidden;
                    transition: border 0.2s, transform 0.2s;
                    display: flex;
                    flex-direction: column;
                    min-height: 420px;
                    box-shadow: none;
                }
                .project-card:hover {
                    border: 1.5px solid #2563eb;
                    transform: translateY(-2px) scale(1.01);
                    box-shadow: none;
                }
                .project-image {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    flex-shrink: 0;
                    border-radius: 1.25rem 1.25rem 0 0;
                }
                .project-thumbnail {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    border-radius: 1.25rem 1.25rem 0 0;
                }
                .featured-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(37, 99, 235, 0.9);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .project-content {
                    flex: 1 1 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 1.5rem;
                    gap: 0.75rem;
                    background: #23263a;
                }
                .project-content h3 {
                    color: #fff;
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin: 0 0 0.25rem 0;
                }
                .project-content p {
                    color: #bdbdbd;
                    font-size: 1rem;
                    margin: 0 0 0.5rem 0;
                    line-height: 1.5;
                }
                .project-meta {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                }
                .category {
                    color: #2563eb;
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                .date {
                    color: #8b8b8b;
                    font-size: 0.95rem;
                }
                .benefits-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .benefit-tag {
                    background: #23263a;
                    color: #2563eb;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.85rem;
                    border: 1px solid #2563eb33;
                }
                .project-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: auto;
                }
                .edit-button, .delete-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.2rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 0.95rem;
                    transition: background 0.2s, color 0.2s;
                    font-weight: 500;
                    box-shadow: none;
                }
                .edit-button {
                    background: #23263a;
                    color: #2563eb;
                    border: 1.5px solid #2563eb;
                }
                .edit-button:hover {
                    background: #2563eb;
                    color: #fff;
                }
                .delete-button {
                    background: #23263a;
                    color: #dc2626;
                    border: 1.5px solid #dc2626;
                }
                .delete-button:hover {
                    background: #dc2626;
                    color: #fff;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    overflow-y: auto;
                }
                .modal-content {
                    background: #23272f;
                    border-radius: 1.25rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .modal-header {
                    background: #1a1d23;
                    border-bottom: 1px solid #2563eb33;
                    padding: 1.5rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .modal-header h2 {
                    color: #fff;
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin: 0;
                }
                .close-button {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .close-button:hover {
                    color: #dc2626;
                }
                .project-form {
                    flex: 1 1 auto;
                    overflow-y: auto;
                    min-height: 0;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    color: #bdbdbd;
                    font-size: 1rem;
                    font-weight: 500;
                }
                .form-group input[type="text"],
                .form-group input[type="url"],
                .form-group input[type="date"],
                .form-group textarea,
                .form-group select {
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                    padding: 0.75rem 1rem;
                    transition: border 0.2s;
                }
                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #2563eb;
                }
                .form-group textarea {
                    min-height: 90px;
                    resize: vertical;
                }
                .category-selector {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .manage-categories-button {
                    background: #2563eb;
                    color: #fff;
                    border: none;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .manage-categories-button:hover {
                    background: #1d4ed8;
                }
                .benefits-container {
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 0.5rem;
                }
                .benefits-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                .benefit-item {
                    background: #2563eb22;
                    color: #2563eb;
                    border-radius: 1rem;
                    padding: 0.25rem 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.95rem;
                }
                .benefit-item button {
                    background: none;
                    border: none;
                    color: #dc2626;
                    font-size: 1rem;
                    cursor: pointer;
                    padding: 0;
                }
                .add-benefit {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .add-benefit input {
                    flex: 1;
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    padding: 0.5rem 1rem;
                }
                .add-benefit button {
                    background: #2563eb;
                    color: #fff;
                    border: none;
                    border-radius: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .add-benefit button:hover {
                    background: #1d4ed8;
                }
                .form-group.checkbox {
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .form-group.checkbox input[type="checkbox"] {
                    width: 1.25rem;
                    height: 1.25rem;
                    accent-color: #2563eb;
                }
                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                }
                .submit-button, .cancel-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                .submit-button {
                    background: #2563eb;
                    color: white;
                }
                .cancel-button {
                    background: #dc2626;
                    color: white;
                }
                .submit-button:hover, .cancel-button:hover {
                    opacity: 0.9;
                }
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    color: #ffffff;
                }
                .loading-spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2563eb;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin-bottom: 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    color: #ffffff;
                    text-align: center;
                }
                .error-container i {
                    font-size: 3rem;
                    color: #dc2626;
                    margin-bottom: 1rem;
                }
                .error-container button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #2563eb;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    cursor: pointer;
                    margin-top: 1rem;
                }
                @media (max-width: 768px) {
                    .projects-page {
                        padding: 1rem;
                    }
                    .page-header {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }
                    .projects-grid {
                        grid-template-columns: 1fr;
                    }
                    .modal-content {
                        width: 95%;
                    }
                }
                @media (max-width: 600px) {
                    .modal-content {
                        width: 98%;
                        max-width: 98vw;
                        max-height: 98vh;
                    }
                    .modal-header, .project-form {
                        padding: 1rem;
                    }
                }
                .form-group select {
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                    padding: 0.75rem 1rem;
                    transition: border 0.2s;
                    appearance: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
                    background-image: url('data:image/svg+xml;utf8,<svg fill="%232563eb" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"/></svg>');
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    cursor: pointer;
                }
                .form-group select:focus {
                    outline: none;
                    box-shadow: 0 4px 16px #2563eb33;
                    border: 1.5px solid #2563eb;
                }
                .category-modal {
                    max-width: 400px;
                    width: 100%;
                    background: #23272f;
                    border-radius: 1.25rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                    overflow: hidden;
                }
                .category-form {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .add-category {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }
                .add-category input {
                    flex: 1;
                    padding: 0.75rem;
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                }
                .add-category button {
                    background: #2563eb;
                    color: #fff;
                    border: none;
                    border-radius: 0.5rem;
                    padding: 0.75rem;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .add-category button:hover {
                    background: #1d4ed8;
                }
                .categories-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    max-height: 200px;
                    overflow-y: auto;
                }
                .category-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #23272f;
                    border-radius: 0.5rem;
                    padding: 0.5rem 1rem;
                    color: #fff;
                    transition: background 0.2s;
                }
                .category-item:hover {
                    background: #2563eb22;
                }
                .edit-category input {
                    width: 100%;
                    padding: 0.5rem;
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                }
                .edit-category input:focus {
                    outline: none;
                    border-color: #2563eb;
                }
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    color: #8b8b8b;
                    text-align: center;
                }
                .empty-state i {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                .empty-state p {
                    font-size: 1rem;
                    margin: 0;
                }
                /* Scrollbar global moderno y fino */
                ::-webkit-scrollbar {
                    width: 8px;
                    background: #23263a;
                }
                ::-webkit-scrollbar-thumb {
                    background: #2563eb;
                    border-radius: 8px;
                }
                ::-webkit-scrollbar-corner {
                    background: #23263a;
                }
                /* Firefox */
                html {
                    scrollbar-width: thin;
                    scrollbar-color: #2563eb #23263a;
                }
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

export default ProjectsPage; 