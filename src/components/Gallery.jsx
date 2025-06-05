import React, { useState, useEffect } from 'react';
import SafeImage from './common/SafeImage';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (window.electronAPI) {
          const data = await window.electronAPI.readJson('galleryCategories.json');
          setCategories(data || []);
          if (data && data.length > 0) {
            setSelectedCategory(data[0].name);
          }
        }
      } catch (err) {
        console.error('Error al cargar categorías:', err);
        setError('Error al cargar la galería');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181f2a] flex items-center justify-center">
        <div className="text-white text-xl">Cargando galería...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#181f2a] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  return (
    <div className="min-h-screen bg-[#181f2a] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Nuestra Galería
        </h2>

        {/* Selector de categorías */}
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-[#23263a] text-gray-300 hover:bg-[#2d3142]'
              }`}
            >
              <i className={`bx ${category.items[0]?.icon || 'bx-image'} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de imágenes de la categoría seleccionada */}
        {selectedCategoryData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedCategoryData.items.map(item => (
              <div
                key={item.id}
                className="bg-[#23263a] rounded-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="relative h-64">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery; 