import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import teamMembers from '@/db/teamMembers.json'

const DB_PATH = path.join(process.cwd(), 'src/db/teamMembers.json')

// Función auxiliar para leer el archivo JSON
const readTeamMembers = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return { teamMembers: [] }
    }
}

// Función auxiliar para escribir en el archivo JSON
const writeTeamMembers = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// GET - Obtener todos los miembros del equipo
export async function GET() {
    try {
        return NextResponse.json(teamMembers)
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener los datos del equipo' },
            { status: 500 }
        )
    }
}

// POST - Crear un nuevo miembro
export async function POST(request) {
    try {
        const data = readTeamMembers()
        const newMember = await request.json()
        
        // Generar un nuevo ID
        const newId = data.teamMembers.length > 0 
            ? Math.max(...data.teamMembers.map(m => m.id)) + 1 
            : 1
        
        const memberWithId = { ...newMember, id: newId }
        data.teamMembers.push(memberWithId)
        
        writeTeamMembers(data)
        
        return NextResponse.json(memberWithId, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear el miembro del equipo' },
            { status: 500 }
        )
    }
}

// PUT - Actualizar un miembro existente
export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = parseInt(searchParams.get('id'))
        const updateData = await request.json()
        
        const data = readTeamMembers()
        const index = data.teamMembers.findIndex(member => member.id === id)
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Miembro no encontrado' },
                { status: 404 }
            )
        }
        
        data.teamMembers[index] = { ...data.teamMembers[index], ...updateData }
        writeTeamMembers(data)
        
        return NextResponse.json(data.teamMembers[index])
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al actualizar el miembro del equipo' },
            { status: 500 }
        )
    }
}

// DELETE - Eliminar un miembro
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = parseInt(searchParams.get('id'))
        
        const data = readTeamMembers()
        const index = data.teamMembers.findIndex(member => member.id === id)
        
        if (index === -1) {
            return NextResponse.json(
                { error: 'Miembro no encontrado' },
                { status: 404 }
            )
        }
        
        data.teamMembers.splice(index, 1)
        writeTeamMembers(data)
        
        return NextResponse.json({ message: 'Miembro eliminado con éxito' })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al eliminar el miembro del equipo' },
            { status: 500 }
        )
    }
} 