import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import SafeImage from '@/components/common/SafeImage';
import fs from 'fs';
import path from 'path';

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        categories: [],
        oldPrice: '',
        newPrice: '',
        saleTag: false,
        newTag: false
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState('');

    // Rutas de los archivos JSON
    const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/productsData.json');
    const CATEGORIES_FILE = path.join(process.cwd(), 'src/data/categories.json');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf8'));
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const saveProducts = async (newProducts) => {
        try {
            fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(newProducts, null, 2));
            setProducts(newProducts);
        } catch (error) {
            throw new Error('Error al guardar los productos');
        }
    };

    const saveCategories = async (newCategories) => {
        try {
            fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(newCategories, null, 2));
            setCategories(newCategories);
        } catch (error) {
            throw new Error('Error al guardar las categorías');
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) {
            toast.error('La categoría no puede estar vacía');
            return;
        }

        try {
            const newCategories = [...categories, newCategory.trim()];
            await saveCategories(newCategories);
            setNewCategory('');
            toast.success('Categoría agregada correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteCategory = async (category) => {
        if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

        try {
            // Primero actualizar productos que usan esta categoría
            const updatedProducts = products.map(product => ({
                ...product,
                categories: product.categories.filter(cat => cat !== category)
            }));
            await saveProducts(updatedProducts);

            // Luego eliminar la categoría
            const newCategories = categories.filter(cat => cat !== category);
            await saveCategories(newCategories);
            
            toast.success('Categoría eliminada correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newProducts;
            if (editingId) {
                // Actualizar producto existente
                newProducts = products.map(product => 
                    product.id === editingId ? { ...formData, id: editingId } : product
                );
            } else {
                // Crear nuevo producto
                const newId = Math.max(...products.map(p => p.id), 0) + 1;
                newProducts = [...products, { ...formData, id: newId }];
            }

            await saveProducts(newProducts);
            setShowAddModal(false);
            setEditingId(null);
            setFormData({
                name: '',
                description: '',
                image: '',
                categories: [],
                oldPrice: '',
                newPrice: '',
                saleTag: false,
                newTag: false
            });
            toast.success(editingId ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            const newProducts = products.filter(product => product.id !== id);
            await saveProducts(newProducts);
            toast.success('Producto eliminado correctamente');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            image: product.image || '',
            categories: product.categories || [],
            oldPrice: product.oldPrice || '',
            newPrice: product.newPrice || '',
            saleTag: product.saleTag || false,
            newTag: product.newTag || false
        });
        setShowAddModal(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-custom text-light-custom flex items-center justify-center">
                <div className="text-center">
                    <i className="bx bx-loader-alt bx-spin text-4xl mb-4"></i>
                    <p>Cargando productos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-dark-custom text-light-custom flex items-center justify-center">
                <div className="text-center">
                    <i className="bx bx-error-circle text-4xl mb-4"></i>
                    <h2 className="text-2xl font-bold mb-2">Error al cargar los productos</h2>
                    <p className="text-muted-custom mb-4">{error}</p>
                    <button 
                        onClick={fetchProducts}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        <i className="bx bx-refresh mr-2"></i>
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-custom text-light-custom p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Administrar Productos</h1>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                name: '',
                                description: '',
                                image: '',
                                categories: [],
                                oldPrice: '',
                                newPrice: '',
                                saleTag: false,
                                newTag: false
                            });
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
                    >
                        <i className="bx bx-plus mr-2"></i>
                        Nuevo Producto
                    </button>
                </div>

                {/* Panel de categorías */}
                <div className="bg-[#23263a] rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Gestión de Categorías</h2>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Nueva categoría"
                            className="flex-1 px-4 py-2 rounded-lg bg-[#18192a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                        />
                        <button
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            <i className="bx bx-plus"></i>
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="flex items-center gap-2 bg-[#18192a] px-3 py-1 rounded-lg"
                            >
                                <span>{category}</span>
                                <button
                                    onClick={() => handleDeleteCategory(category)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    <i className="bx bx-x"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid de productos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#23263a] rounded-xl overflow-hidden"
                        >
                            <div className="relative h-48">
                                <SafeImage
                                    src={product.image}
                                    alt={product.name}
                                    fallbackType="products"
                                    className="w-full h-full object-cover"
                                />
                                {product.saleTag && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                                        Oferta
                                    </span>
                                )}
                                {product.newTag && (
                                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded">
                                        Nuevo
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-300 mb-2">{product.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {product.categories?.map((category) => (
                                        <span
                                            key={category}
                                            className="bg-primary/20 text-primary px-2 py-1 rounded text-sm"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-lg font-bold text-primary">
                                            {product.newPrice}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="ml-2 text-sm text-gray-400 line-through">
                                                {product.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                    >
                                        <i className="bx bx-edit mr-2"></i>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        <i className="bx bx-trash mr-2"></i>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de formulario */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#23263a] rounded-xl p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">
                                {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <i className="bx bx-x text-2xl"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-[#18192a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-[#18192a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Imagen</label>
                                <ImageUploader
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Categorías</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {categories.map((category) => (
                                        <label
                                            key={category}
                                            className="flex items-center gap-2 bg-[#18192a] px-3 py-1 rounded-lg cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.categories.includes(category)}
                                                onChange={(e) => {
                                                    const newCategories = e.target.checked
                                                        ? [...formData.categories, category]
                                                        : formData.categories.filter((c) => c !== category);
                                                    setFormData({ ...formData, categories: newCategories });
                                                }}
                                                className="form-checkbox text-primary"
                                            />
                                            <span>{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Precio Original</label>
                                    <input
                                        type="text"
                                        value={formData.oldPrice}
                                        onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#18192a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="$0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Precio Actual</label>
                                    <input
                                        type="text"
                                        value={formData.newPrice}
                                        onChange={(e) => setFormData({ ...formData, newPrice: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#18192a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="$0.00"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.saleTag}
                                        onChange={(e) => setFormData({ ...formData, saleTag: e.target.checked })}
                                        className="form-checkbox text-primary"
                                    />
                                    <span>Es oferta</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.newTag}
                                        onChange={(e) => setFormData({ ...formData, newTag: e.target.checked })}
                                        className="form-checkbox text-primary"
                                    />
                                    <span>Es nuevo</span>
                                </label>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    {editingId ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos; 