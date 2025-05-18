import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'src/data/team.json');

async function readTeam() {
    try {
        const file = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(file);
    } catch {
        return [];
    }
}

async function writeTeam(data) {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET - Obtener todos los miembros del equipo
export async function GET() {
    try {
        const team = await readTeam();
        return new Response(JSON.stringify(team), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Crear un nuevo miembro
export async function POST(request) {
    try {
        const body = await request.json();
        const team = await readTeam();
        team.push(body);
        await writeTeam(team);
        return new Response(JSON.stringify(team), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// PUT - Actualizar un miembro existente
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, ...rest } = body;
        const team = await readTeam();
        const index = team.findIndex(member => member.id === id);
        if (index !== -1) {
            team[index] = { ...team[index], ...rest };
            await writeTeam(team);
            return new Response(JSON.stringify(team), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), { status: 404 });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// DELETE - Eliminar un miembro
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        const team = await readTeam();
        const index = team.findIndex(member => member.id === id);
        if (index !== -1) {
            team.splice(index, 1);
            await writeTeam(team);
            return new Response(JSON.stringify(team), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), { status: 404 });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 