import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'categories.json');

// Asegurarse de que el archivo existe
const ensureFileExists = () => {
    if (!fs.existsSync(dataFilePath)) {
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dataFilePath, JSON.stringify({ categories: [] }));
    }
};

// Leer categorías
const readCategories = () => {
    ensureFileExists();
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
};

// Guardar categorías
const saveCategories = (data) => {
    ensureFileExists();
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
    try {
        const data = readCategories();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al leer categorías:', error);
        return NextResponse.json(
            { error: 'Error al leer las categorías' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name } = await request.json();
        
        if (!name || typeof name !== 'string') {
            return NextResponse.json(
                { error: 'El nombre de la categoría es requerido' },
                { status: 400 }
            );
        }

        const data = readCategories();
        
        // Verificar si la categoría ya existe
        if (data.categories.includes(name)) {
            return NextResponse.json(
                { error: 'La categoría ya existe' },
                { status: 400 }
            );
        }

        // Agregar nueva categoría
        data.categories.push(name);
        saveCategories(data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al agregar categoría:', error);
        return NextResponse.json(
            { error: 'Error al agregar la categoría' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { oldName, newName } = await request.json();
        
        if (!oldName || !newName || typeof oldName !== 'string' || typeof newName !== 'string') {
            return NextResponse.json(
                { error: 'Se requieren los nombres antiguo y nuevo' },
                { status: 400 }
            );
        }

        const data = readCategories();
        
        // Verificar si la categoría existe
        const index = data.categories.indexOf(oldName);
        if (index === -1) {
            return NextResponse.json(
                { error: 'La categoría no existe' },
                { status: 404 }
            );
        }

        // Verificar si el nuevo nombre ya existe
        if (data.categories.includes(newName)) {
            return NextResponse.json(
                { error: 'Ya existe una categoría con ese nombre' },
                { status: 400 }
            );
        }

        // Actualizar categoría
        data.categories[index] = newName;
        saveCategories(data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        return NextResponse.json(
            { error: 'Error al actualizar la categoría' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { name } = await request.json();
        
        if (!name || typeof name !== 'string') {
            return NextResponse.json(
                { error: 'El nombre de la categoría es requerido' },
                { status: 400 }
            );
        }

        const data = readCategories();
        
        // Verificar si la categoría existe
        const index = data.categories.indexOf(name);
        if (index === -1) {
            return NextResponse.json(
                { error: 'La categoría no existe' },
                { status: 404 }
            );
        }

        // Eliminar categoría
        data.categories.splice(index, 1);
        saveCategories(data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return NextResponse.json(
            { error: 'Error al eliminar la categoría' },
            { status: 500 }
        );
    }
} 