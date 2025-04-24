'use client'
import React, { useState, useEffect } from 'react'
import navigationData from '@/db/navigationData.json'

const NavigationAdmin = () => {
    const [items, setItems] = useState([])
    const [editingItem, setEditingItem] = useState(null)
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        path: '',
        icon: ''
    })

    useEffect(() => {
        setItems(navigationData)
    }, [])

    const handleEdit = (item) => {
        setEditingItem(item)
        setFormData(item)
    }

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            setItems(items.filter(item => item.id !== id))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingItem) {
            setItems(items.map(item => 
                item.id === editingItem.id ? formData : item
            ))
        } else {
            setItems([...items, { ...formData, id: Date.now().toString() }])
        }
        setEditingItem(null)
        setFormData({ id: '', name: '', path: '', icon: '' })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="admin-page">
            <h1>Administrar Navegación</h1>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="admin-form-group">
                    <label>Ruta</label>
                    <input
                        type="text"
                        name="path"
                        value={formData.path}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="admin-form-group">
                    <label>Icono</label>
                    <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn admin-btn-primary">
                        {editingItem ? 'Actualizar' : 'Agregar'}
                    </button>
                    {editingItem && (
                        <button 
                            type="button" 
                            className="admin-btn"
                            onClick={() => {
                                setEditingItem(null)
                                setFormData({ id: '', name: '', path: '', icon: '' })
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ruta</th>
                        <th>Icono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.path}</td>
                            <td>{item.icon}</td>
                            <td className="admin-table-actions">
                                <button 
                                    className="admin-btn admin-btn-primary"
                                    onClick={() => handleEdit(item)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="admin-btn admin-btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default NavigationAdmin 