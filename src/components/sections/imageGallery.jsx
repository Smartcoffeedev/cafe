'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import SafeImage from '../common/SafeImage';
import GalleryItem from './gallery/GalleryItem';
import galleryData from '../../data/gallery.json';

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 },
};

const ImageGallery = () => {
  const [active, setActive] = useState('Todos');
  const [filtered, setFiltered] = useState(galleryData.slice(0, 12));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const categories = ['Todos', ...Array.from(new Set(galleryData.map(item => item.category)))]

  const EXAMPLE_IMG = '/img/all-img/jose.jpg';

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-[#050d1a]">
      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col flex-1 justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-2 mt-8">Nuestra Galería</h2>
        <p className="text-lg text-white/80 text-center mb-8">Descubre los momentos especiales de nuestro café</p>
        <div className="flex flex-wrap justify-start gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-lg font-semibold text-base transition-colors duration-200 ${active === cat ? 'bg-primary text-white' : 'bg-[#23263a] text-white/80 hover:bg-primary/80'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {filtered.map(item => (
              <div key={item.id} className="w-full aspect-square overflow-hidden rounded-xl bg-[#181f2a] flex items-center justify-center">
                <img
                  src={item.src ? item.src : '/img/all-img/jose.jpg'}
                  alt={item.title}
                  className="object-cover w-full h-full aspect-square"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeModal}>
          <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80 transition"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              &times;
            </button>
            <img src={modalImg} alt="Vista ampliada" className="rounded-lg max-h-[80vh] w-auto object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}

export default ImageGallery