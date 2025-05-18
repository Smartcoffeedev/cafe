import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const TESTIMONIALS_FILE = path.join(process.cwd(), 'data', 'testimonials.json');

// Datos de testimonios
export const testimonialsData = {
    testimonials: [
        {
            id: 1,
            name: "Carlos Rodríguez",
            role: "Cliente frecuente",
            content: "El mejor café que he probado en la ciudad",
            image: "/images/testimonials/testimonial-1.jpg"
        },
        {
            id: 2,
            name: "Ana Martínez",
            role: "Cliente",
            content: "Excelente servicio y ambiente acogedor",
            image: "/images/testimonials/testimonial-2.jpg"
        }
    ]
};

// GET - Obtener todos los testimonios
export async function GET() {
    try {
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al leer testimonios:', error);
        return NextResponse.json(
            { error: 'Error al leer testimonios' },
            { status: 500 }
        );
    }
}

// POST - Crear un nuevo testimonio
export async function POST(request) {
    try {
        const data = await request.json();
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf8');
        const testimonials = JSON.parse(fileContent);

        // Validar máximo de 8 testimonios
        if (testimonials.length >= 8) {
            return NextResponse.json(
                { error: 'No se pueden agregar más de 8 testimonios' },
                { status: 400 }
            );
        }

        // Generar nuevo ID
        const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
        const newTestimonial = { ...data, id: newId };

        testimonials.push(newTestimonial);
        await writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('Error al crear testimonio:', error);
        return NextResponse.json(
            { error: 'Error al crear testimonio' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar un testimonio existente
export async function PUT(request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;
        
        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf8');
        const testimonials = JSON.parse(fileContent);

        const index = testimonials.findIndex(t => t.id === id);
        if (index === -1) {
            return NextResponse.json(
                { error: 'Testimonio no encontrado' },
                { status: 404 }
            );
        }

        testimonials[index] = { ...testimonials[index], ...updateData };
        await writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        return NextResponse.json({ testimonials });
    } catch (error) {
        console.error('Error al actualizar testimonio:', error);
        return NextResponse.json(
            { error: 'Error al actualizar testimonio' },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar un testimonio
export async function DELETE(request) {
    try {
        const data = await request.json();
        const { id } = data;

        const fileContent = await readFile(TESTIMONIALS_FILE, 'utf8');
        const testimonials = JSON.parse(fileContent);

        const filteredTestimonials = testimonials.filter(t => t.id !== id);
        await writeFile(TESTIMONIALS_FILE, JSON.stringify(filteredTestimonials, null, 2));

        return NextResponse.json({ testimonials: filteredTestimonials });
    } catch (error) {
        console.error('Error al eliminar testimonio:', error);
        return NextResponse.json(
            { error: 'Error al eliminar testimonio' },
            { status: 500 }
        );
    }
} 