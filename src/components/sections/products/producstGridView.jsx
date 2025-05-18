'use client'
import React, { useState, useEffect } from 'react'
import ProductCard from './productCard'
import Pagination from '../../ui/pagination'
import { FaSearch } from 'react-icons/fa'

const SelectOptions = [
    { value: 'Default', label: 'Por defecto' },
    { value: 'Price: low to high', label: 'Precio: menor a mayor' },
    { value: 'Price: high to low', label: 'Precio: mayor a menor' }
];

const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }} onClick={onClose}>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                background: 'transparent',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                zIndex: 10000,
                maxHeight: '95vh',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>
                <button style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(37,99,235,0.12)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    zIndex: 10001,
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                }} onClick={onClose}>&times;</button>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(135deg, #23263a 0%, #23263a 60%, #23305a 100%)',
                    opacity: 0.95
                }}></div>
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '1.2rem 1.2rem 1.2rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxHeight: '90vh',
                    overflow: 'auto'
                }}>
                    <div style={{
                        width: '220px',
                        height: '220px',
                        borderRadius: '1.25rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(37,99,235,0.13)',
                        marginBottom: '1.2rem',
                        background: '#18192a',
                        flexShrink: 0
                    }}>
                        <img 
                            src={product.image || '/img/all-img/product.jpg'} 
                            alt={product.name} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <h2 style={{
                        color: '#fff',
                        fontSize: '1.7rem',
                        fontWeight: 800,
                        margin: '0 0 0.5rem 0',
                        textAlign: 'center'
                    }}>{product.name}</h2>
                    {(product.saleTag || product.newTag) && (
                        <div style={{
                            display: 'flex',
                            gap: '0.7rem',
                            marginBottom: '0.7rem'
                        }}>
                            {product.saleTag && (
                                <span style={{
                                    padding: '7px 18px',
                                    borderRadius: '1.2rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
                                    letterSpacing: '0.5px',
                                    background: 'linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)',
                                    color: '#fff'
                                }}>{typeof product.saleTag === 'string' ? product.saleTag : 'Oferta'}</span>
                            )}
                            {product.newTag && (
                                <span style={{
                                    padding: '7px 18px',
                                    borderRadius: '1.2rem',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
                                    letterSpacing: '0.5px',
                                    background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                                    color: '#fff'
                                }}>{typeof product.newTag === 'string' ? product.newTag : 'Nuevo'}</span>
                            )}
                        </div>
                    )}
                    <div style={{
                        display: 'flex',
                        gap: '1.2rem',
                        alignItems: 'center',
                        marginBottom: '0.7rem'
                    }}>
                        <span style={{
                            color: '#43e97b',
                            fontSize: '1.35rem',
                            fontWeight: 800
                        }}>{product.newPrice}</span>
                        {product.oldPrice && (
                            <span style={{
                                color: '#bdbdbd',
                                textDecoration: 'line-through',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}>{product.oldPrice}</span>
                        )}
                    </div>
                    {product.categories && product.categories.length > 0 && (
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '0.7rem',
                            justifyContent: 'center'
                        }}>
                            {product.categories.map((cat, idx) => (
                                <span key={idx} style={{
                                    background: '#2563eb22',
                                    color: '#2563eb',
                                    borderRadius: '1rem',
                                    padding: '0.25rem 0.85rem',
                                    fontSize: '1.02rem',
                                    fontWeight: 600
                                }}>{cat}</span>
                            ))}
                        </div>
                    )}
                    {product.description && (
                        <p style={{
                            color: '#e5e5e5',
                            fontSize: '1.13rem',
                            margin: '1.1rem 0 0.7rem 0',
                            textAlign: 'center',
                            lineHeight: 1.6,
                            fontWeight: 400,
                            maxHeight: '350px',
                            overflowY: 'auto',
                            padding: '0 0.5rem',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#2563eb rgba(37,99,235,0.1)'
                        }}>{product.description}</p>
                    )}
                    <div style={{
                        color: '#bdbdbd',
                        fontSize: '1rem',
                        marginTop: '0.7rem',
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        {Object.entries(product).map(([key, value]) => {
                            if ([
                                'id', 'name', 'image', 'description', 'categories', 'oldPrice', 'newPrice', 'saleTag', 'newTag'
                            ].includes(key)) return null;
                            if (typeof value === 'boolean' && value === false) return null;
                            if (value === null || value === undefined || value === '') return null;
                            return (
                                <div key={key}><b>{key}:</b> {typeof value === 'object' ? JSON.stringify(value) : value.toString()}</div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProducstGridView = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Default');
    const [selectedCategory, setSelectedCategory] = useState('All category');
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const productsPerPage = 6;
    const [modalProduct, setModalProduct] = useState(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
                setCategories(data.categories || []);
            });
    }, []);

    // Obtener categorías únicas de todos los arrays 'categories' de los productos y de categories
    const categoriesFromProducts = products
        .flatMap(p => Array.isArray(p.categories) ? p.categories : [])
        .filter(Boolean);
    const allCategories = Array.from(new Set([
        ...categories.map(c => c && c.trim().toLowerCase()),
        ...categoriesFromProducts.map(c => c && c.trim().toLowerCase())
    ])).filter(Boolean);

    const handleSelect = (e) => {
        setSort(e.target.value);
    };

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Filtrado y búsqueda
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const prodCategories = Array.isArray(product.categories) ? product.categories.map(c => c.trim().toLowerCase()) : [];
        const matchesCategory = selectedCategory === 'All category' || prodCategories.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    // Resetear página si cambia el filtro o búsqueda
    useEffect(() => { setCurrentPage(1); }, [search, sort, selectedCategory]);

    // Ordenamiento
    if (sort === 'Price: low to high') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseFloat((a.newPrice || '').toString().replace(/[^\d.,]/g, '').replace(',', '.'));
            const priceB = parseFloat((b.newPrice || '').toString().replace(/[^\d.,]/g, '').replace(',', '.'));
            return (isNaN(priceA) ? Infinity : priceA) - (isNaN(priceB) ? Infinity : priceB);
        });
    } else if (sort === 'Price: high to low') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseFloat((a.newPrice || '').toString().replace(/[^\d.,]/g, '').replace(',', '.'));
            const priceB = parseFloat((b.newPrice || '').toString().replace(/[^\d.,]/g, '').replace(',', '.'));
            return (isNaN(priceB) ? -Infinity : priceB) - (isNaN(priceA) ? -Infinity : priceA);
        });
    } else if (sort === 'Latest') {
        filteredProducts = [...filteredProducts].slice().reverse();
    }

    // Paginación
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <div className="products-area ptb-100">
            <div className="container">
                <div className="row g-3 align-items-center flex-wrap justify-content-between filters-row" style={{ marginBottom: '2.5rem' }}>
                    <div className="col-12 col-md-8 d-flex align-items-center search-col" style={{ justifyContent: 'flex-start' }}>
                        <div className="search-bar search-bar-centered" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                            <input
                                type="text"
                                className="form-control search-input search-input-centered"
                                placeholder="Buscar producto..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ paddingLeft: '2.5rem', textAlign: 'left', width: '100%', maxWidth: '420px', margin: '0' }}
                            />
                            <FaSearch className="search-icon" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#2563eb', fontSize: '1.35rem', zIndex: 2, opacity: 0.85, pointerEvents: 'none' }} />
                        </div>
                    </div>
                    <div className="col-12 col-md-2 d-flex align-items-center justify-content-md-end mt-2 mt-md-0">
                        <div className="selectbox-wrapper w-100">
                            <select
                                className="order-select"
                                value={selectedCategory}
                                onChange={handleCategory}
                            >
                                <option value="All category">Todas las categorías</option>
                                {allCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 d-flex align-items-center justify-content-md-end mt-2 mt-md-0">
                        <div className="selectbox-wrapper w-100">
                            <select
                                className="order-select"
                                value={sort}
                                onChange={handleSelect}
                            >
                                {SelectOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="grid-sorting row align-items-center mb-3">
                    <div className="col-12 result-count">
                        <p>Se encontraron <span className="count">{filteredProducts.length}</span> productos disponibles</p>
                    </div>
                </div>
                <div className="row products-row">
                    {paginatedProducts.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <p style={{color: '#888', fontSize: '1.2rem'}}>No se encontraron productos con esos criterios.</p>
                        </div>
                    ) : (
                        paginatedProducts.map((product) => (
                            <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                                <div onClick={() => setModalProduct(product)} style={{ cursor: 'pointer', height: '100%' }}>
                                    <ProductCard product={product} />
                                </div>
                            </div>
                        ))
                    )}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
                {modalProduct && <ProductDetailModal product={modalProduct} onClose={() => setModalProduct(null)} />}
            </div>
            <style jsx>{`
                .filters-row {
                    align-items: center !important;
                    display: flex;
                    flex-wrap: wrap;
                }
                .order-select {
                    width: 100%;
                    height: 48px;
                    border-radius: 12px;
                    background: #18192a;
                    color: #fff;
                    border: none;
                    font-size: 1.08rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
                    padding: 0 2.5rem 0 1rem;
                    appearance: none;
                    background-image: url('data:image/svg+xml;utf8,<svg fill=\"%232563eb\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\"/></svg>');
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    cursor: pointer;
                    transition: box-shadow 0.2s, border 0.2s;
                    max-width: 100vw;
                    display: flex;
                    align-items: center;
                    margin-top: 0;
                }
                .order-select:focus {
                    outline: none;
                    box-shadow: 0 4px 16px #2563eb33;
                    border: 1.5px solid #2563eb;
                }
                .selectbox-wrapper {
                    width: 100%;
                    max-width: 100vw;
                    display: flex;
                    align-items: center;
                }
                .search-bar input {
                    height: 48px;
                    border-radius: 12px;
                    font-size: 1.08rem;
                    display: flex;
                    align-items: center;
                    margin-top: 0;
                }
                .row.g-3 {
                    align-items: center !important;
                }
                .products-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem 1.2rem;
                }
                .products-row > div {
                    width: 100%;
                }
                @media (max-width: 1100px) {
                    .products-row {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .order-select {
                        height: 44px;
                        font-size: 1rem;
                        max-width: 100vw;
                    }
                    .selectbox-wrapper {
                        margin: 0.5rem 0;
                        width: 100%;
                        max-width: 100vw;
                    }
                    .col-12 {
                        width: 100%;
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                    .row {
                        margin-right: 0;
                        margin-left: 0;
                    }
                    .search-col {
                        margin-bottom: 1rem;
                    }
                    .products-row {
                        grid-template-columns: 1fr;
                        gap: 1.1rem 0.7rem;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProducstGridView