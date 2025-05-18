import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/db/navigationData.json');

// GET - Obtener todos los elementos de navegación
export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const navigationJSON = JSON.parse(data);
        
        // Retornar en el formato que esperan los componentes
        return new Response(JSON.stringify(navigationJSON), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Crear o actualizar un elemento de navegación
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, href } = body;
        const data = await fs.readFile(filePath, 'utf-8');
        const navigationJSON = JSON.parse(data);
        
        // Asegurar que existe la estructura correcta
        if (!navigationJSON.navigationData) {
            navigationJSON.navigationData = [];
        }
        
        navigationJSON.navigationData.push({ label: name, href, hasDropdown: false });
        await fs.writeFile(filePath, JSON.stringify(navigationJSON, null, 2), 'utf-8');
        return new Response(JSON.stringify(navigationJSON), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 