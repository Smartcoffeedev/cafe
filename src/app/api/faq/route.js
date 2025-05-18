import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/faq.json');

// Datos de FAQ
export const faqData = {
    faqData: [
        {
            id: 1,
            question: "¿Cuál es el horario de atención?",
            answer: "Estamos abiertos de lunes a domingo de 7:00 AM a 10:00 PM"
        },
        {
            id: 2,
            question: "¿Ofrecen servicio a domicilio?",
            answer: "Sí, ofrecemos servicio de delivery en un radio de 5km"
        }
    ]
};

// GET - Obtener todas las FAQs
export async function GET() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const faqs = JSON.parse(data);
        return new Response(JSON.stringify({ faqData: faqs }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.error('Error en GET /api/faq:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// POST - Crear una nueva FAQ
export async function POST(request) {
    try {
        const body = await request.json();
        const { question, answer } = body;
        if (!question || !answer) {
            return new Response(JSON.stringify({ error: 'Pregunta y respuesta son requeridas' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        const faqs = JSON.parse(data);
        const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
        const newFaq = { id: newId, question, answer };
        faqs.push(newFaq);
        await fs.writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');
        return new Response(JSON.stringify({ faqData: faqs }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.error('Error en POST /api/faq:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// PUT - Actualizar una FAQ existente
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, question, answer } = body;
        if (!id || !question || !answer) {
            return new Response(JSON.stringify({ error: 'ID, pregunta y respuesta son requeridos' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        let faqs = JSON.parse(data);
        faqs = faqs.map(faq => faq.id === id ? { ...faq, question, answer } : faq);
        await fs.writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');
        return new Response(JSON.stringify({ faqData: faqs }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.error('Error en PUT /api/faq:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// DELETE - Eliminar una FAQ
export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID es requerido' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const data = await fs.readFile(filePath, 'utf-8');
        let faqs = JSON.parse(data);
        faqs = faqs.filter(faq => faq.id !== id);
        await fs.writeFile(filePath, JSON.stringify(faqs, null, 2), 'utf-8');
        return new Response(JSON.stringify({ faqData: faqs }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        console.error('Error en DELETE /api/faq:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} 