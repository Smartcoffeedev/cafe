import { pool } from '@/db/mysql';

// GET - Obtener todos los precios desde MySQL
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM pricing');
    return new Response(JSON.stringify({ pricing: rows }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

// POST - Crear o actualizar un precio
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, description, features } = body;
    await pool.query('INSERT INTO pricing (name, price, description, features) VALUES (?, ?, ?, ?)', [name, price, description, features]);
    const [rows] = await pool.query('SELECT * FROM pricing');
    return new Response(JSON.stringify({ pricing: rows }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
} 