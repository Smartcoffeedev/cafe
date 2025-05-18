import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'src', 'data', 'gallery.json');

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