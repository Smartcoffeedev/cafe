'use client';
import React from 'react';
import SafeImage from '../../common/SafeImage';

const GalleryItem = ({ item }) => {
    return (
        <div className="gallery-item">
            <SafeImage
                src={item.src}
                alt={item.category}
                width={300}
                height={300}
                className="gallery-img"
                fallbackType="gallery"
            />
        </div>
    );
};

export default GalleryItem; 