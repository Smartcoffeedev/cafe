'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { defaultImages } from '@/utils/imageUtils';

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
        <Image
            src={imgSrc}
            alt={alt || 'Imagen'}
            width={width}
            height={height}
            className={className}
            onError={handleError}
            priority={false}
            loading="lazy"
            unoptimized={true}
        />
    );
};

export default SafeImage; 