'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import SafeImage from '../common/SafeImage';
import GalleryItem from './gallery/GalleryItem';

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 },
};

const ImageGallery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        let categoriesData;
        
        // Intentar cargar los datos de la galería
        try {
          if (window.electronAPI) {
            // En entorno Electron
            categoriesData = await window.electronAPI.readJson('galleryCategories.json');
          } else {
            // En navegador
            const response = await fetch('/data/galleryCategories.json');
            if (!response.ok) {
              throw new Error('Error al cargar los datos de la galería');
            }
            categoriesData = await response.json();
          }
        } catch (err) {
          console.error('Error al cargar datos:', err);
          // Si falla la carga, usar datos de respaldo
          categoriesData = [
            {
              name: "Café",
              items: [
                {
                  id: 1,
                  title: "Café & Gastronomía",
                  description: "Un espacio para disfrutar de cafés de autor y experiencias únicas.",
                  image: "/img/all-img/1745487835491.jpg",
                  icon: "bx-coffee"
                }
              ]
            }
          ];
        }
        
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
          if (categoriesData.length > 0) {
            setSelectedCategory(categoriesData[0].name);
          }
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Error al procesar datos:', err);
        setError('Error al cargar la galería');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  if (loading) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center bg-[#050d1a]">
        <div className="max-w-6xl mx-auto px-4 w-full flex flex-col flex-1 justify-center">
          <div className="text-white text-center">Cargando galería...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center bg-[#050d1a]">
        <div className="max-w-6xl mx-auto px-4 w-full flex flex-col flex-1 justify-center">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </section>
    );
  }

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-[#050d1a]">
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col flex-1 justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-2 mt-8">Nuestra Galería</h2>
        <p className="text-lg text-white/80 text-center mb-8">Descubre los momentos especiales de nuestro café</p>
        
        {/* Selector de categorías */}
        <div className="flex flex-wrap justify-start gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-2 rounded-lg font-semibold text-base transition-colors duration-200 ${
                selectedCategory === category.name 
                  ? 'bg-primary text-white' 
                  : 'bg-[#23263a] text-white/80 hover:bg-primary/80'
              }`}
            >
              <i className={`bx ${category.items[0]?.icon || 'bx-image'} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de imágenes */}
        {selectedCategoryData && (
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {selectedCategoryData.items.map(item => (
                <div 
                  key={item.id} 
                  className="w-full aspect-square overflow-hidden rounded-xl bg-[#181f2a] flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => openModal(item.image)}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full aspect-square"
                    fallbackType="gallery"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && modalImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <SafeImage
                src={modalImg}
                alt="Modal image"
                className="w-full h-auto rounded-lg"
                fallbackType="gallery"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;