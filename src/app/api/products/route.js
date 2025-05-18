import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/products.json');

// Función para leer o inicializar el archivo
async function readProductsFile() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        // Si no existe, lo crea con estructura vacía
        const initial = { products: [], categories: [] };
        await fs.writeFile(filePath, JSON.stringify(initial, null, 2), 'utf-8');
        return initial;
    }
}

// GET - Obtener todos los productos
export async function GET() {
    try {
        const data = await readProductsFile();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Crear un nuevo producto
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, image, categories, oldPrice, newPrice, saleTag, newTag } = body;
        if (!name || !description) {
            return new Response(JSON.stringify({ error: 'Nombre y descripción son requeridos' }), { status: 400 });
        }
        const data = await readProductsFile();
        const products = data.products || [];
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: newId, name, description, image, categories, oldPrice, newPrice, saleTag, newTag };
        products.push(newProduct);
        await fs.writeFile(filePath, JSON.stringify({ ...data, products }, null, 2), 'utf-8');
        return new Response(JSON.stringify({ ...data, products }), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// PUT - Actualizar un producto
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, description, image, categories, oldPrice, newPrice, saleTag, newTag } = body;
        if (!id || !name || !description) {
            return new Response(JSON.stringify({ error: 'ID, nombre y descripción son requeridos' }), { status: 400 });
        }
        const data = await readProductsFile();
        let products = data.products || [];
        products = products.map(p => p.id === id ? { ...p, name, description, image, categories, oldPrice, newPrice, saleTag, newTag } : p);
        await fs.writeFile(filePath, JSON.stringify({ ...data, products }, null, 2), 'utf-8');
        return new Response(JSON.stringify({ ...data, products }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// DELETE - Eliminar un producto
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
        const data = await readProductsFile();
        let products = data.products || [];
        products = products.filter(p => p.id !== id);
        await fs.writeFile(filePath, JSON.stringify({ ...data, products }, null, 2), 'utf-8');
        return new Response(JSON.stringify({ ...data, products }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 