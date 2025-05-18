// Utilidad para manejar rutas de imágenes de forma consistente
export const getImagePath = (imagePath) => {
    if (!imagePath) {
        return '/uploads/default-placeholder.jpg'; // Imagen por defecto
    }
    
    // Si la ruta ya comienza con /, no agregarla
    if (imagePath.startsWith('/')) {
        return imagePath;
    }
    
    // Si la ruta no comienza con /, agregarla
    return `/${imagePath}`;
};

// Imágenes por defecto para cada sección
export const defaultImages = {
    testimonials: '/uploads/1745487877256.jpg',
    team: '/uploads/1745487869689.jpg',
    projects: '/uploads/1745487857208.jpg',
    gallery: '/uploads/1745494893472.jpg',
    products: '/uploads/1745494838408.jpg',
    logo: '/uploads/1745487615621.png',
    hero: '/uploads/1747225255955-69947770-viktor-savior-arcane-series-skin-lol-splash-art-8k-wallpaper-uhdpaper.com-239-2-c.jpg',
    default: '/uploads/1745487593161.jpg'
}; 