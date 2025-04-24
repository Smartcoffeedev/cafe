'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const TeamAdmin = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      github: '',
      instagram: ''
    }
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeamMembers(data.teamMembers);
    } catch (error) {
      toast.error('Error al cargar los miembros del equipo');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialNetwork = name.replace('social_', '');
      setCurrentMember(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialNetwork]: value
        }
      }));
    } else {
      setCurrentMember(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode ? `/api/team?id=${currentMember.id}` : '/api/team';
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentMember),
      });

      if (response.ok) {
        toast.success(editMode ? 'Miembro actualizado con éxito' : 'Miembro añadido con éxito');
        setCurrentMember({
          name: '',
          position: '',
          bio: '',
          image: '',
          socialMedia: {
            linkedin: '',
            twitter: '',
            github: '',
            instagram: ''
          }
        });
        setEditMode(false);
        fetchTeamMembers();
      } else {
        toast.error('Error al procesar la solicitud');
      }
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
      try {
        const response = await fetch(`/api/team?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Miembro eliminado con éxito');
          fetchTeamMembers();
        } else {
          toast.error('Error al eliminar el miembro');
        }
      } catch (error) {
        toast.error('Error al eliminar el miembro');
      }
    }
  };

  const handleCancel = () => {
    setCurrentMember({
      name: '',
      position: '',
      bio: '',
      image: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        github: '',
        instagram: ''
      }
    });
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión del Equipo</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={currentMember.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo
            </label>
            <input
              type="text"
              name="position"
              value={currentMember.position}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de la imagen
          </label>
          <input
            type="text"
            name="image"
            value={currentMember.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biografía
          </label>
          <textarea
            name="bio"
            value={currentMember.bio}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              name="social_linkedin"
              value={currentMember.socialMedia.linkedin}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <input
              type="url"
              name="social_twitter"
              value={currentMember.socialMedia.twitter}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub
            </label>
            <input
              type="url"
              name="social_github"
              value={currentMember.socialMedia.github}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <input
              type="url"
              name="social_instagram"
              value={currentMember.socialMedia.instagram}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {editMode ? 'Actualizar' : 'Agregar'} Miembro
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.position}</p>
              <p className="text-gray-500 mb-4">{member.bio}</p>
              
              <div className="flex gap-2 mb-4">
                {member.socialMedia?.linkedin && (
                  <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    LinkedIn
                  </a>
                )}
                {member.socialMedia?.twitter && (
                  <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    Twitter
                  </a>
                )}
                {member.socialMedia?.github && (
                  <a href={member.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                    GitHub
                  </a>
                )}
                {member.socialMedia?.instagram && (
                  <a href={member.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                    Instagram
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamAdmin; 