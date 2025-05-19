'use client';
import React, { useState } from 'react';
import { defaultImages } from '../../utils/imageUtils';

const SafeImage = ({ src, alt, width, height, className, fallbackType = 'default' }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [error, setError] = useState(false);

    const handleError = () => {
        if (!error) {
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