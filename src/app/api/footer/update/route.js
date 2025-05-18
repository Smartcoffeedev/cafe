import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { address, email, phone } = body;
    const filePath = path.join(process.cwd(), 'src/db/footerData.json');
    const newData = JSON.stringify({ address, email, phone }, null, 2);
    await fs.writeFile(filePath, newData, 'utf8');
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
} 