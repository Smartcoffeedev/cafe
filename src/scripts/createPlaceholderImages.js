// Script para crear imágenes placeholder si no existen
const fs = require('fs');
const path = require('path');

const imageFolders = [
    'public/images/default',
    'public/images/testimonials',
    'public/images/team',
    'public/images/projects',
    'public/images/gallery',
    'public/images/products',
    'public/images/logo',
    'public/images/hero'
];

// Crear carpetas si no existen
imageFolders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`Carpeta creada: ${folder}`);
    }
});

// Crear archivo README con información sobre las imágenes
const readmeContent = `# Imágenes de Smart Coffee

## Estructura de carpetas:

- \`default/\` - Imágenes placeholder por defecto
- \`testimonials/\` - Fotos de clientes para testimonios
- \`team/\` - Fotos del equipo de trabajo
- \`projects/\` - Imágenes de proyectos
- \`gallery/\` - Galería de imágenes del café
- \`products/\` - Imágenes de productos/bebidas
- \`logo/\` - Logo de la empresa
- \`hero/\` - Imágenes para secciones hero

## Formato recomendado:
- Testimonios: 200x200px (cuadrado)
- Equipo: 300x300px (cuadrado)
- Proyectos: 400x250px (rectangular)
- Galería: 300x200px (rectangular)
- Productos: 250x250px (cuadrado)

## Tipos de archivo soportados:
- .jpg
- .jpeg
- .png
- .webp
`;

fs.writeFileSync('public/images/README.md', readmeContent);
console.log('README de imágenes creado'); 