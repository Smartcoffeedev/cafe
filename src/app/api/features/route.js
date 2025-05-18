import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/db/features.json');

// Datos de características
export const featuresData = {
    featuresData: [
        {
            id: 1,
            title: "Café de Calidad",
            description: "Seleccionamos los mejores granos de café para garantizar una experiencia única",
            icon: "bx-coffee"
        },
        {
            id: 2,
            title: "Servicio Personalizado",
            description: "Adaptamos nuestro servicio a tus necesidades específicas",
            icon: "bx-user"
        }
    ]
};

// GET - Obtener todas las características
export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const featuresData = JSON.parse(data);
        return new Response(JSON.stringify({ featuresData }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Crear una nueva característica
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, icon } = body;
        if (!title || !description || !icon) {
            return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), { status: 400 });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        const featuresData = JSON.parse(data);
        const newId = featuresData.length > 0 ? Math.max(...featuresData.map(f => f.id)) + 1 : 1;
        const newFeature = { id: newId, title, description, icon };
        featuresData.push(newFeature);
        await fs.writeFile(filePath, JSON.stringify(featuresData, null, 2), 'utf-8');
        return new Response(JSON.stringify({ featuresData }), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// PUT - Actualizar una característica
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, title, description, icon } = body;
        if (!id || !title || !description || !icon) {
            return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), { status: 400 });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        let featuresData = JSON.parse(data);
        featuresData = featuresData.map(f => f.id === id ? { ...f, title, description, icon } : f);
        await fs.writeFile(filePath, JSON.stringify(featuresData, null, 2), 'utf-8');
        return new Response(JSON.stringify({ featuresData }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// DELETE - Eliminar una característica
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
        const data = await fs.readFile(filePath, 'utf-8');
        let featuresData = JSON.parse(data);
        featuresData = featuresData.filter(f => f.id !== id);
        await fs.writeFile(filePath, JSON.stringify(featuresData, null, 2), 'utf-8');
        return new Response(JSON.stringify({ featuresData }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 