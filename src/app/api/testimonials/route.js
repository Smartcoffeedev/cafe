import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/db/testimonials.json')

// Función para leer los datos
const readData = () => {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8')
        const data = JSON.parse(fileContent)
        return data.testimonials || []
    } catch (error) {
        console.error('Error al leer el archivo:', error)
        return []
    }
}

// Función para escribir los datos
const writeData = (testimonials) => {
    try {
        const data = { testimonials }
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
        return true
    } catch (error) {
        console.error('Error al escribir el archivo:', error)
        return false
    }
}

// GET - Obtener todos los testimonios
export async function GET() {
    try {
        const testimonials = readData()
        if (!Array.isArray(testimonials)) {
            throw new Error('Los datos no tienen el formato esperado')
        }
        return NextResponse.json(testimonials)
    } catch (error) {
        console.error('Error en GET /api/testimonials:', error)
        return NextResponse.json(
            { error: 'Error al cargar los testimonios' },
            { status: 500 }
        )
    }
}

// POST - Crear un nuevo testimonio
export async function POST(request) {
    try {
        const testimonial = await request.json()
        const testimonials = readData()
        
        if (!Array.isArray(testimonials)) {
            throw new Error('Los datos no tienen el formato esperado')
        }

        // Generar nuevo ID
        const newId = Math.max(...testimonials.map(t => t.id), 0) + 1
        const newTestimonial = { ...testimonial, id: newId }
        
        testimonials.push(newTestimonial)
        const success = writeData(testimonials)
        
        if (!success) {
            throw new Error('Error al guardar los datos')
        }

        return NextResponse.json(newTestimonial)
    } catch (error) {
        console.error('Error en POST /api/testimonials:', error)
        return NextResponse.json(
            { error: 'Error al crear el testimonio' },
            { status: 500 }
        )
    }
}

// PUT - Actualizar un testimonio
export async function PUT(request) {
    try {
        const testimonial = await request.json()
        const testimonials = readData()
        
        if (!Array.isArray(testimonials)) {
            throw new Error('Los datos no tienen el formato esperado')
        }

        const index = testimonials.findIndex(t => t.id === testimonial.id)
        if (index === -1) {
            return NextResponse.json(
                { error: 'Testimonio no encontrado' },
                { status: 404 }
            )
        }
        
        testimonials[index] = testimonial
        const success = writeData(testimonials)
        
        if (!success) {
            throw new Error('Error al guardar los datos')
        }

        return NextResponse.json(testimonial)
    } catch (error) {
        console.error('Error en PUT /api/testimonials:', error)
        return NextResponse.json(
            { error: 'Error al actualizar el testimonio' },
            { status: 500 }
        )
    }
}

// DELETE - Eliminar un testimonio
export async function DELETE(request) {
    try {
        const { id } = await request.json()
        const testimonials = readData()
        
        if (!Array.isArray(testimonials)) {
            throw new Error('Los datos no tienen el formato esperado')
        }

        const filteredTestimonials = testimonials.filter(t => t.id !== id)
        if (filteredTestimonials.length === testimonials.length) {
            return NextResponse.json(
                { error: 'Testimonio no encontrado' },
                { status: 404 }
            )
        }
        
        const success = writeData(filteredTestimonials)
        
        if (!success) {
            throw new Error('Error al guardar los datos')
        }

        return NextResponse.json({ message: 'Testimonio eliminado correctamente' })
    } catch (error) {
        console.error('Error en DELETE /api/testimonials:', error)
        return NextResponse.json(
            { error: 'Error al eliminar el testimonio' },
            { status: 500 }
        )
    }
} 