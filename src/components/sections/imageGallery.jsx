'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import SafeImage from '@/components/common/SafeImage';
import { getGallery, getGalleryByCategory } from '@/utils/dataUtils';
import GalleryItem from './gallery/GalleryItem';

const itemVariants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 },
};

const ImageGallery = ({ className, isTitleShow }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryData, setGalleryData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setGalleryData(data.galleryItemsData || []);
        setCategories(data.categories || []);
      } catch {
        setGalleryData([]);
        setCategories([]);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? galleryData.slice(0, 12)
    : galleryData.filter(item => item.category === activeFilter).slice(0, 12);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  return (
    <div className={`gallery-section ${className}`}>
      <div className="container">
        {isTitleShow && (
          <div className="section-title text-center mb-5">
            <h2>Nuestra Galería</h2>
            <p className="text-muted">Descubre los momentos especiales de nuestro café</p>
          </div>
        )}
        <div className="gallery-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="item-grid">
          {filteredItems.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .gallery-section {
          background: #0a0a1a;
          padding: 0;
          margin: 0;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          width: 100%;
        }
        .section-title {
          padding: 2rem 0 1.5rem 0;
        }
        .section-title p {
          color: #fff !important;
        }
        .gallery-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .filter-btn {
          background: #18192a;
          color: #bdbdbd;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          outline: none;
        }
        .filter-btn.active, .filter-btn:hover {
          background: #2563eb;
          color: #fff;
        }
        .item-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: 1.2rem;
          row-gap: 0;
          margin-top: 40px;
          box-sizing: border-box;
          width: 100%;
        }
        .gallery-item {
          background: #18192a;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(37,99,235,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
          aspect-ratio: 1/1;
          width: 100%;
          box-sizing: border-box;
        }
        .gallery-item:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 32px rgba(37,99,235,0.18);
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 0;
          transition: filter 0.2s;
        }
        @media (max-width: 1100px) {
          .item-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 600px) {
          .item-grid {
            grid-template-columns: 1fr;
            gap: 0;
            justify-items: center;
          }
          .gallery-item {
            grid-column: auto;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
          .gallery-img {
            height: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default ImageGallery