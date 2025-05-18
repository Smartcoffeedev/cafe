import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'src', 'data', 'gallery.json');

// Datos de la galería
export const galleryData = {
    galleryItemsData: [
        {
            id: 1,
            src: "/images/gallery/gallery-1.jpg",
            category: "Café",
            title: "Nuestro café especial"
        },
        {
            id: 2,
            src: "/images/gallery/gallery-2.jpg",
            category: "Local",
            title: "Nuestro espacio"
        }
    ]
};

// GET - Obtener todas las imágenes de la galería
export async function GET() {
    try {
        const fileContent = await readFile(GALLERY_FILE, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al leer la galería:', error);
        return NextResponse.json(
            { error: 'Error al leer la galería' },
            { status: 500 }
        );
    }
}

// POST - Agregar una nueva imagen
export async function POST(request) {
    try {
        const data = await request.json();
        const { galleryItems, categories } = data;

        // Validar datos
        if (!Array.isArray(galleryItems) || !Array.isArray(categories)) {
            return NextResponse.json(
                { error: 'Datos inválidos' },
                { status: 400 }
            );
        }

        // Guardar datos
        await writeFile(GALLERY_FILE, JSON.stringify({ galleryItemsData: galleryItems, categories }, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error al guardar la galería:', error);
        return NextResponse.json(
            { error: 'Error al guardar la galería' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar una imagen
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, src, category, title, description } = body;
        if (!id || !src || !category || !title) {
            return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), { status: 400 });
        }
        const data = await readFile(GALLERY_FILE, 'utf-8');
        let galleryItemsData = JSON.parse(data);
        galleryItemsData = galleryItemsData.map(i => i.id === id ? { ...i, src, category, title, description } : i);
        await writeFile(GALLERY_FILE, JSON.stringify(galleryItemsData, null, 2));
        return new Response(JSON.stringify({ galleryItemsData }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// DELETE - Eliminar una imagen
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
        const data = await readFile(GALLERY_FILE, 'utf-8');
        let galleryItemsData = JSON.parse(data);
        galleryItemsData = galleryItemsData.filter(i => i.id !== id);
        await writeFile(GALLERY_FILE, JSON.stringify(galleryItemsData, null, 2));
        return new Response(JSON.stringify({ galleryItemsData }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 