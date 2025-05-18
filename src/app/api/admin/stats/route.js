import { promises as fs } from 'fs';
import path from 'path';

const dbPath = (file) => path.join(process.cwd(), 'src/db', file);

export async function GET() {
    try {
        const [products, projects, testimonials, team, gallery, features, faqs] = await Promise.all([
            fs.readFile(dbPath('productsData.json'), 'utf-8'),
            fs.readFile(dbPath('projects.json'), 'utf-8'),
            fs.readFile(dbPath('testimonials.json'), 'utf-8'),
            fs.readFile(dbPath('teamMembers.json'), 'utf-8'),
            fs.readFile(dbPath('galleryItemsData.json'), 'utf-8'),
            fs.readFile(dbPath('features.json'), 'utf-8'),
            fs.readFile(dbPath('faqData.json'), 'utf-8'),
        ]);
        return new Response(JSON.stringify({
            products: JSON.parse(products).length,
            projects: JSON.parse(projects).length,
            testimonials: JSON.parse(testimonials).length,
            team: JSON.parse(team).length,
            gallery: JSON.parse(gallery).length,
            features: JSON.parse(features).length,
            faqs: JSON.parse(faqs).length,
        }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 