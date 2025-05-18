import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/db/cartItems.json');

export async function GET() {
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf8');
    return new Response(JSON.stringify(body), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
} 