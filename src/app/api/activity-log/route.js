import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/db/activity-log.json');

// Datos del log de actividad
export const activityLogData = {
    activityLog: [
        {
            id: 1,
            action: "login",
            user: "admin",
            timestamp: "2024-04-17T10:00:00Z",
            details: "Inicio de sesión exitoso"
        },
        {
            id: 2,
            action: "update",
            user: "admin",
            timestamp: "2024-04-17T10:30:00Z",
            details: "Actualización de productos"
        }
    ]
};

// GET - Obtener todo el log de actividad
export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const activityLog = JSON.parse(data);
        return new Response(JSON.stringify({ activityLog }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// POST - Agregar una nueva entrada al log
export async function POST(request) {
    try {
        const body = await request.json();
        const { action, user, timestamp, details } = body;
        if (!action || !user || !timestamp) {
            return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), { status: 400 });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        const activityLog = JSON.parse(data);
        const newId = activityLog.length > 0 ? Math.max(...activityLog.map(l => l.id)) + 1 : 1;
        const newLog = { id: newId, action, user, timestamp, details };
        activityLog.push(newLog);
        await fs.writeFile(filePath, JSON.stringify(activityLog, null, 2), 'utf-8');
        return new Response(JSON.stringify({ activityLog }), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 