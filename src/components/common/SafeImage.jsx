'use client';
import React, { useState, useEffect } from 'react';
import { defaultImages, getImagePath } from '../../utils/imageUtils';

const SafeImage = ({ src, alt, width, height, className, fallbackType = 'default' }) => {
    const [imgSrc, setImgSrc] = useState(getImagePath(src));
    const [error, setError] = useState(false);

    useEffect(() => {
        setImgSrc(getImagePath(src));
        setError(false);
    }, [src]);

    const handleError = () => {
        if (!error) {
            console.warn(`Error al cargar imagen: ${src}`);
            setError(true);
            setImgSrc(defaultImages[fallbackType] || defaultImages.default);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt || 'Imagen'}
            width={width}
            height={height}
            className={className}
            onError={handleError}
            loading="lazy"
            style={{ objectFit: 'cover' }}
        />
    );
};

export default SafeImage; 