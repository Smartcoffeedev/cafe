import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');
        
        if (!file) {
            return NextResponse.json(
                { error: 'No se ha proporcionado ninguna imagen' },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'El archivo debe ser una imagen' },
                { status: 400 }
            );
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'La imagen no debe superar los 5MB' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Crear nombre único para el archivo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
        const filename = `${uniqueSuffix}-${originalName}`;
        
        // Asegurarse de que el directorio existe
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Ignorar error si el directorio ya existe
            if (error.code !== 'EEXIST') {
                throw error;
            }
        }

        // Guardar el archivo
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Devolver la URL de la imagen
        const imageUrl = `/uploads/${filename}`;
        
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error al subir imagen:', error);
        return NextResponse.json(
            { error: 'Error al procesar la imagen' },
            { status: 500 }
        );
    }
} 