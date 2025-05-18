'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import ImageUploader from '@/components/admin/ImageUploader';
import { useRouter } from 'next/navigation';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        categories: [],
        oldPrice: '',
        newPrice: '',
        saleTag: ''
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCategoryValue, setEditingCategoryValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBasicChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleCategoriesChange = useCallback((categories) => {
        setFormData(prev => ({
            ...prev,
            categories
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
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
                setCategoryOptions(data.categories || []);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const saveToJson = async (updatedProducts, updatedCategories) => {
        try {
            const response = await fetch('/api/products/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productsData: updatedProducts, categories: updatedCategories }),
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

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            categories: product.categories || [],
            oldPrice: product.oldPrice || '',
            newPrice: product.newPrice || '',
            saleTag: product.saleTag || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch('/api/products', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.productsData);
                    toast.success('Producto eliminado correctamente');
                } else {
                    throw new Error('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error al eliminar el producto');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editingProduct ? 'PUT' : 'POST';
            const response = await fetch('/api/products', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingProduct ? { ...formData, id: editingProduct.id } : formData),
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.products || []);
                setCategoryOptions(data.categories || []);
                toast.success(editingProduct ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
                
                setEditingProduct(null);
                setShowAddModal(false);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    categories: [],
                    oldPrice: '',
                    newPrice: '',
                    saleTag: ''
                });
                setPreviewImage(null);
            } else {
                throw new Error('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al guardar los cambios');
        }
    };

    const handleAddCategory = async () => {
        const cat = newCategory.trim().toLowerCase();
        if (cat && !categoryOptions.includes(cat)) {
            const updatedCategories = [...categoryOptions, cat];
            setCategoryOptions(updatedCategories);
            setNewCategory('');
            await saveToJson(products, updatedCategories);
            toast.success('Categoría agregada');
        }
    };

    const handleEditCategory = (cat) => {
        setEditingCategory(cat);
        setEditingCategoryValue(cat);
    };

    const handleSaveEditCategory = async (oldCat) => {
        const newCat = editingCategoryValue.trim().toLowerCase();
        if (!newCat || categoryOptions.includes(newCat)) {
            setEditingCategory(null);
            setEditingCategoryValue('');
            return;
        }
        // Actualizar categorías
        const updatedCategories = categoryOptions.map(c => c === oldCat ? newCat : c);
        setCategoryOptions(updatedCategories);
        // Actualizar productos
        const updatedProducts = products.map(p => ({
            ...p,
            categories: Array.isArray(p.categories) ? p.categories.map(cat => cat === oldCat ? newCat : cat) : []
        }));
        setProducts(updatedProducts);
        await saveToJson(updatedProducts, updatedCategories);
        setEditingCategory(null);
        setEditingCategoryValue('');
        toast.success('Categoría editada');
    };

    const handleRemoveCategory = async (cat) => {
        const updatedCategories = categoryOptions.filter(c => c !== cat);
        setCategoryOptions(updatedCategories);
        // Eliminar la categoría de los productos que la tenían asignada
        const updatedProducts = products.map(p => ({
            ...p,
            categories: Array.isArray(p.categories) ? p.categories.filter(c => c !== cat) : []
        }));
        setProducts(updatedProducts);
        await saveToJson(updatedProducts, updatedCategories);
        if (formData.categories.includes(cat)) setFormData({ ...formData, categories: formData.categories.filter(c => c !== cat) });
        toast.success('Categoría eliminada');
    };

    const handleSelectCategory = (cat) => {
        if (!formData.categories.includes(cat)) {
            setFormData({ ...formData, categories: [...formData.categories, cat] });
        }
    };

    const handleRemoveProductCategory = (cat) => {
        setFormData({ ...formData, categories: formData.categories.filter(c => c !== cat) });
    };

    if (!authChecked) return null;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="dashboard-title">Gestión de Productos</h1>
                <button 
                    className="admin-btn admin-btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className='bx bx-plus'></i>
                    Agregar Producto
                </button>
            </div>

            <div className="products-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                padding: '1rem'
            }}>
                {Array.isArray(products) && products.map((product) => (
                    <div key={product.id} style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem',
                        transition: 'transform 0.2s ease-in-out',
                        ':hover': {
                            transform: 'translateY(-5px)'
                        }
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                                <Image 
                                    src={product.image || '/img/all-img/product.jpg'}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                {(product.saleTag || product.newTag) && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        display: 'flex',
                                        gap: '0.5rem'
                                    }}>
                                        {product.saleTag && (
                                            <span style={{
                                                backgroundColor: '#dc3545',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {product.saleTag}
                                            </span>
                                        )}
                                        {product.newTag && (
                                            <span style={{
                                                backgroundColor: '#28a745',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {product.newTag}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 style={{
                                    color: '#333',
                                    fontSize: '1.25rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600'
                                }}>
                                    {product.name}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{
                                        color: '#28a745',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}>
                                        {product.newPrice}
                                    </span>
                                    {product.oldPrice && (
                                        <span style={{
                                            color: '#6c757d',
                                            textDecoration: 'line-through',
                                            fontSize: '0.9rem'
                                        }}>
                                            {product.oldPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '1rem'
                            }}>
                                <button
                                    onClick={() => handleEdit(product)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        border: '1px solid #007bff',
                                        backgroundColor: 'transparent',
                                        color: '#007bff',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <i className="bx bx-edit"></i> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
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

            {/* Modal de Edición/Agregar */}
            {(editingProduct || showAddModal) && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
                            <button className="close-button" onClick={() => { setEditingProduct(null); setShowAddModal(false); }}>
                                <i className="bx bx-x"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleBasicChange('name', e.target.value)}
                                    required
                                    placeholder="Nombre del producto..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleBasicChange('description', e.target.value)}
                                    required
                                    rows="4"
                                    placeholder="Descripción del producto"
                                />
                            </div>
                            <div className="form-group">
                                <label>Categorías</label>
                                <div className="category-selector" ref={dropdownRef}>
                                    <div
                                        className="category-dropdown-trigger"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        {formData.categories.length === 0 && <span className="placeholder">Selecciona o agrega categorías...</span>}
                                        {formData.categories.map(cat => (
                                            <span key={cat} className="category-tag">
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                <button type="button" onClick={e => { e.stopPropagation(); handleRemoveProductCategory(cat); }} title="Quitar">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    {dropdownOpen && (
                                        <div className="category-dropdown">
                                            {categoryOptions.map(opt => (
                                                <div key={opt} className={`category-option${formData.categories.includes(opt) ? ' selected' : ''}`}> 
                                                    {editingCategory === opt ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={editingCategoryValue}
                                                                onChange={e => setEditingCategoryValue(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <button type="button" onClick={() => handleSaveEditCategory(opt)} className="save-btn">✔</button>
                                                            <button type="button" onClick={() => { setEditingCategory(null); setEditingCategoryValue(''); }} className="cancel-btn" title="Cancelar">×</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span onClick={() => handleSelectCategory(opt)}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                                                            <button type="button" onClick={e => { e.stopPropagation(); handleEditCategory(opt); }} className="edit-btn" title="Editar">✎</button>
                                                            <button type="button" onClick={e => { e.stopPropagation(); handleRemoveCategory(opt); }} className="delete-btn" title="Eliminar">×</button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="add-category-row">
                                                <input
                                                    type="text"
                                                    placeholder="Agregar nueva categoría..."
                                                    value={newCategory}
                                                    onChange={e => setNewCategory(e.target.value)}
                                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory(); } }}
                                                />
                                                <button type="button" onClick={handleAddCategory} className="add-btn">+</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Imagen</label>
                                <ImageUploader 
                                    value={formData.image}
                                    onChange={(url) => handleBasicChange('image', url)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Anterior</label>
                                <input 
                                    type="text" 
                                    value={formData.oldPrice}
                                    onChange={(e) => handleBasicChange('oldPrice', e.target.value)}
                                    placeholder="Opcional"
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Actual</label>
                                <input 
                                    type="text" 
                                    value={formData.newPrice}
                                    onChange={(e) => handleBasicChange('newPrice', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Etiqueta de Oferta</label>
                                <input 
                                    type="text" 
                                    value={formData.saleTag}
                                    onChange={(e) => handleBasicChange('saleTag', e.target.value)}
                                    placeholder="Ej: Sale!"
                                />
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setEditingProduct(null);
                                        setShowAddModal(false);
                                    }}
                                >
                                    <i className="bx bx-x"></i>
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="submit-button"
                                >
                                    <i className="bx bx-save"></i>
                                    {editingProduct ? 'Actualizar' : 'Agregar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style jsx>{`
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
                .product-form {
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
                .form-group textarea {
                    background: #23272f;
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    color: #fff;
                    font-size: 1rem;
                    padding: 0.75rem 1rem;
                    transition: border 0.2s;
                }
                .form-group input:focus,
                .form-group textarea:focus {
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
                    position: relative;
                }
                .category-dropdown-trigger {
                    border: 1.5px solid #2563eb33;
                    border-radius: 0.5rem;
                    padding: 0.7rem 1.2rem;
                    background: #23272f;
                    color: #fff;
                    cursor: pointer;
                    min-height: 48px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .category-tag {
                    background: #2563eb22;
                    color: #2563eb;
                    border-radius: 1rem;
                    padding: 0.25rem 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 0.98rem;
                }
                .category-tag button {
                    background: none;
                    border: none;
                    color: #dc2626;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1.1em;
                    line-height: 1;
                }
                .placeholder {
                    color: #888;
                }
                .category-dropdown {
                    position: absolute;
                    top: 110%;
                    left: 0;
                    width: 100%;
                    background: #23272f;
                    border: 1.5px solid #2563eb;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 16px rgba(37,99,235,0.07);
                    z-index: 10;
                    padding: 0.5rem 0;
                    max-height: 220px;
                    overflow-y: auto;
                    color: #fff;
                }
                .category-option {
                    display: flex;
                    align-items: center;
                    padding: 0.3rem 1rem;
                    cursor: pointer;
                    background: transparent;
                    color: #fff;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                }
                .category-option.selected {
                    background: #2563eb22;
                }
                .category-option:hover {
                    background: #2563eb33;
                }
                .category-option input {
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    padding: 0.2rem 0.5rem;
                    font-size: 0.95rem;
                    min-width: 80px;
                }
                .edit-btn, .delete-btn, .save-btn, .cancel-btn, .add-btn {
                    background: none;
                    border: none;
                    color: #2563eb;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1.1em;
                    line-height: 1;
                    margin-left: 0.3rem;
                    transition: color 0.2s;
                }
                .delete-btn {
                    color: #dc2626;
                }
                .save-btn {
                    background: #2563eb;
                    color: #fff;
                    border-radius: 6px;
                    padding: 0.2rem 0.6rem;
                    font-weight: 600;
                }
                .cancel-btn {
                    color: #dc2626;
                }
                .add-category-row {
                    display: flex;
                    align-items: center;
                    padding: 0.3rem 1rem;
                    border-top: 1px solid #2563eb33;
                    margin-top: 0.3rem;
                }
                .add-category-row input {
                    border-radius: 6px;
                    border: 1px solid #2563eb33;
                    padding: 0.2rem 0.5rem;
                    font-size: 0.95rem;
                    min-width: 120px;
                    background: #23272f;
                    color: #fff;
                }
                .add-btn {
                    background: #2563eb;
                    color: #fff;
                    border-radius: 6px;
                    padding: 0.2rem 0.8rem;
                    font-weight: 600;
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
                @media (max-width: 600px) {
                    .modal-content {
                        width: 98%;
                        max-width: 98vw;
                        max-height: 98vh;
                    }
                    .modal-header, .product-form {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductsPage; 