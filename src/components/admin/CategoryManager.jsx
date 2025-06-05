import React, { useState, useEffect } from 'react';

const CategoryManager = ({ categories, onCategoriesChange }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onCategoriesChange([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (index) => {
    setEditIndex(index);
    setEditValue(categories[index]);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() && !categories.includes(editValue.trim())) {
      const newCategories = [...categories];
      newCategories[editIndex] = editValue.trim();
      onCategoriesChange(newCategories);
      setEditIndex(null);
      setEditValue('');
    }
  };

  const handleDeleteCategory = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      const newCategories = categories.filter((_, i) => i !== index);
      onCategoriesChange(newCategories);
    }
  };

  return (
    <div className="bg-[#23263a] rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-white">Gestión de Categorías</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="flex-1 px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-[#2d3142]"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Añadir
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-[#2d3142]"
                />
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-white">{category}</span>
                <button
                  onClick={() => handleEditCategory(index)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCategory(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager; 