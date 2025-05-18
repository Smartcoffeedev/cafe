import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/projects.json');

// Datos de proyectos
export const projectsData = {
    projects: [
        {
            id: 1,
            title: "Renovación Local",
            description: "Ampliación y renovación de nuestro local principal",
            image: "/images/projects/project-1.jpg",
            status: "Completado"
        },
        {
            id: 2,
            title: "Nueva Sucursal",
            description: "Apertura de nueva sucursal en el centro",
            image: "/images/projects/project-2.jpg",
            status: "En progreso"
        }
    ]
};

// GET - Obtener todos los proyectos y categorías
export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(data);
        const projects = db.projects || [];
        const categories = db.categories || [];
        return new Response(JSON.stringify({ projects, categories }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Crear un nuevo proyecto
export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, image, status, benefits, category, date, featured, link } = body;
        if (!title || !description) {
            return new Response(JSON.stringify({ error: 'Título y descripción son requeridos' }), { status: 400 });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(data);
        db.projects = db.projects || [];
        db.categories = db.categories || [];
        const newId = db.projects.length > 0 ? Math.max(...db.projects.map(p => p.id)) + 1 : 1;
        const newProject = { id: newId, title, description, image, status, benefits, category, date, featured, link };
        db.projects.push(newProject);
        // Si la categoría es nueva, agregarla
        if (category && !db.categories.includes(category)) {
            db.categories.push(category);
        }
        await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
        return new Response(JSON.stringify({ projects: db.projects, categories: db.categories }), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// PUT - Actualizar un proyecto
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, title, description, image, status, benefits, category, date, featured, link } = body;
        if (!id || !title || !description) {
            return new Response(JSON.stringify({ error: 'ID, título y descripción son requeridos' }), { status: 400 });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(data);
        db.projects = db.projects || [];
        db.categories = db.categories || [];
        db.projects = db.projects.map(p => p.id === id ? { ...p, title, description, image, status, benefits, category, date, featured, link } : p);
        // Si la categoría es nueva, agregarla
        if (category && !db.categories.includes(category)) {
            db.categories.push(category);
        }
        await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
        return new Response(JSON.stringify({ projects: db.projects, categories: db.categories }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// DELETE - Eliminar un proyecto
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) return new Response(JSON.stringify({ error: 'ID requerido' }), { status: 400 });
        const data = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(data);
        db.projects = db.projects || [];
        db.categories = db.categories || [];
        db.projects = db.projects.filter(p => p.id !== id);
        await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
        return new Response(JSON.stringify({ projects: db.projects, categories: db.categories }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 