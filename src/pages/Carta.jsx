import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import productsData from '../data/productsData.json';

// Función de utilidad para formatear y validar precios
const formatPrice = (price) => {
    if (!price) return 0;
    // Remover símbolos de moneda y espacios
    const cleanPrice = price.toString().replace(/[^\d.,]/g, '').trim();
    // Convertir coma a punto si existe
    const normalizedPrice = cleanPrice.replace(',', '.');
    // Convertir a número
    const numericPrice = parseFloat(normalizedPrice);
    return isNaN(numericPrice) ? 0 : numericPrice;
};

const Carta = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Default');
  const [selectedCategory, setSelectedCategory] = useState('All category');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Obtener categorías únicas
  const categories = ['All category', ...new Set(productsData.flatMap(p => p.categories || []))];

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...productsData];

    // Filtrar por búsqueda
    if (search) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'All category') {
      result = result.filter(product => 
        product.categories?.includes(selectedCategory)
      );
    }

    // Ordenar
    if (sort === 'Price: low to high') {
      result.sort((a, b) => {
        const priceA = formatPrice(a.newPrice);
        const priceB = formatPrice(b.newPrice);
        return priceA - priceB;
      });
    } else if (sort === 'Price: high to low') {
      result.sort((a, b) => {
        const priceA = formatPrice(a.newPrice);
        const priceB = formatPrice(b.newPrice);
        return priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [search, sort, selectedCategory]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12 mt-24">
        <h1 className="text-4xl font-bold mb-8">Carta</h1>
        <p className="text-muted-custom max-w-xl text-center mb-10">
          Descubre nuestra carta de cafés y especialidades SmartCoffee.
        </p>

        {/* Filtros y búsqueda */}
        <div className="w-full max-w-5xl mb-8 flex flex-col sm:flex-row gap-4">
          {/* Buscador */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filtro de categorías */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Ordenamiento */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Default">Ordenar por</option>
            <option value="Price: low to high">Precio: menor a mayor</option>
            <option value="Price: high to low">Precio: mayor a menor</option>
          </select>
        </div>
        
        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-5">
              <p className="text-muted-custom text-lg">No se encontraron productos con esos criterios.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="card-custom p-6 rounded-xl flex flex-col items-center">
                <img
                  src={product.image || '/img/all-img/jose.jpg'}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-light-custom">{product.name}</h3>
                <p className="text-muted-custom mb-2 text-center">{product.description}</p>
                <span className="text-primary font-bold text-lg">{product.newPrice}</span>
                {product.oldPrice && (
                  <span className="text-muted-custom line-through ml-2">{product.oldPrice}</span>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Carta; 