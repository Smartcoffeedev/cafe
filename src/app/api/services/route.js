import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/services.json');

export async function GET() {
  const content = await fs.readFile(filePath, 'utf8');
  const services = JSON.parse(content);
  return Response.json({ services });
}

export async function POST(req) {
  const content = await fs.readFile(filePath, 'utf8');
  const services = JSON.parse(content);
  const body = await req.json();
  const newService = { ...body, id: Date.now() };
  services.push(newService);
  await fs.writeFile(filePath, JSON.stringify(services, null, 4), 'utf8');
  return Response.json({ services });
}

export async function PUT(req) {
  const content = await fs.readFile(filePath, 'utf8');
  let services = JSON.parse(content);
  const body = await req.json();
  services = services.map(s => s.id === body.id ? { ...s, ...body } : s);
  await fs.writeFile(filePath, JSON.stringify(services, null, 4), 'utf8');
  return Response.json({ services });
}

export async function DELETE(req) {
  const content = await fs.readFile(filePath, 'utf8');
  let services = JSON.parse(content);
  const { id } = await req.json();
  services = services.filter(s => s.id !== id);
  await fs.writeFile(filePath, JSON.stringify(services, null, 4), 'utf8');
  return Response.json({ services });
} 