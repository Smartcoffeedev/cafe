import { promises as fs } from 'fs';
import path from 'path';

const dbFiles = [
  { name: 'Testimonios', file: 'testimonials.json', key: 'testimonials', testItem: { quote: 'Test quote', author: 'Test Author', title: 'Test Title', imageSrc: '' } },
  { name: 'Equipo', file: 'teamMembers.json', key: 'teamMembers', testItem: { name: 'Test User', position: 'Tester', bio: 'Bio de prueba', image: '', socialMedia: {} } },
  { name: 'Proyectos', file: 'projects.json', key: 'projects', testItem: { title: 'Proyecto de prueba', description: 'Descripción de prueba', image: '', category: 'Test', benefits: [], date: '2025-01-01', url: '', featured: false } },
  { name: 'Productos', file: 'productsData.json', key: 'productsData', testItem: { name: 'Producto de prueba', image: '', oldPrice: '', newPrice: '', saleTag: '', newTag: '', categories: [] } },
  { name: 'Galería', file: 'galleryItemsData.json', key: 'galleryItemsData', testItem: { category: 'test', src: '' } },
  { name: 'Características', file: 'featuresData.json', key: 'featuresData', testItem: { title: 'Característica de prueba', icon: '', description: 'Descripción de prueba' } },
  { name: 'FAQ', file: 'faqData.json', key: 'faqData', testItem: { question: '¿Pregunta de prueba?', answer: 'Respuesta de prueba.' } }
];

const logFile = path.join(process.cwd(), 'src/db/activityLog.json');

export async function POST() {
  const results = [];
  const now = new Date().toISOString();
  let log = [];
  try {
    log = JSON.parse(await fs.readFile(logFile, 'utf8'));
  } catch {}

  for (const db of dbFiles) {
    try {
      const dbPath = path.join(process.cwd(), 'src/db', db.file);
      const dbJson = JSON.parse(await fs.readFile(dbPath, 'utf8'));
      const arr = dbJson[db.key];
      // Crear
      const testId = Date.now() + Math.floor(Math.random()*10000);
      const item = { ...db.testItem, id: testId };
      arr.push(item);
      await fs.writeFile(dbPath, JSON.stringify({ ...dbJson, [db.key]: arr }, null, 2), 'utf8');
      log.push(`[${now}] ${db.name}: Creado item de prueba (id: ${testId})`);
      // Editar
      const idx = arr.findIndex(i => i.id === testId);
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], editado: true };
        await fs.writeFile(dbPath, JSON.stringify({ ...dbJson, [db.key]: arr }, null, 2), 'utf8');
        log.push(`[${now}] ${db.name}: Editado item de prueba (id: ${testId})`);
      }
      // Borrar
      const arrFiltrado = arr.filter(i => i.id !== testId);
      await fs.writeFile(dbPath, JSON.stringify({ ...dbJson, [db.key]: arrFiltrado }, null, 2), 'utf8');
      log.push(`[${now}] ${db.name}: Borrado item de prueba (id: ${testId})`);
      results.push({ entidad: db.name, resultado: 'OK' });
    } catch (e) {
      log.push(`[${now}] ${db.name}: ERROR - ${e.message}`);
      results.push({ entidad: db.name, resultado: 'ERROR' });
    }
  }
  // Guardar log
  await fs.writeFile(logFile, JSON.stringify(log.slice(-100), null, 2), 'utf8');
  return new Response(JSON.stringify({ results }), { status: 200 });
} 