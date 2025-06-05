import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useState, useEffect, useRef } from 'react';
import SafeImage from '../components/common/SafeImage';
import Dashboard from '../admin/Dashboard';
import { Link } from 'react-router-dom';
import CategoryManager from '../components/admin/CategoryManager';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_URL = 'http://localhost:3001/api';

// Mapeo de nombres de archivos a nombres amigables
const FILE_NAMES = {
  'productsData.json': 'Productos',
  'testimonials.json': 'Testimonios',
  'galleryItemsData.json': 'Galería de Imágenes',
  'teamMembers.json': 'Equipo',
  'projects.json': 'Proyectos',
  'faq.json': 'FAQ',
  'services.json': 'Características'
};

// Componente para input de imagen con icono de carpeta y modal de galería
const ImageInputField = ({ value, onChange, productName }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [unsplashOpen, setUnsplashOpen] = useState(false);
  const [unsplashQuery, setUnsplashQuery] = useState('');
  const [unsplashResults, setUnsplashResults] = useState([]);
  const [unsplashLoading, setUnsplashLoading] = useState(false);
  const fileInputRef = useRef();
  const searchTimeoutRef = useRef(null);

  // Función para buscar automáticamente en Unsplash
  const autoSearchUnsplash = async (name) => {
    if (!name) return;
    
    setUnsplashLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(name)}&per_page=1`,
        {
          headers: {
            'Authorization': 'Client-ID byl4MASBCSQvsEN1IbbW2F8uUa9ZiZwBlUULyXwrfsU'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Error al buscar imágenes');
      }
      
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        onChange(data.results[0].urls.regular);
      }
    } catch (err) {
      console.error('Error al buscar en Unsplash:', err);
    } finally {
      setUnsplashLoading(false);
    }
  };

  // Efecto para buscar automáticamente cuando cambia el nombre del producto
  useEffect(() => {
    if (productName && !value) {
      autoSearchUnsplash(productName);
    }
  }, [productName]);

  // Función para manejar la búsqueda con debounce
  const handleSearch = (query) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (query.trim()) {
        searchUnsplash(query);
      }
    }, 500); // Esperar 500ms después de que el usuario deje de escribir
  };

  // Actualizar el input de búsqueda
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setUnsplashQuery(query);
    handleSearch(query);
  };

  // Función para manejar la carga de imágenes
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImgUploading(true);
    try {
      // Crear un FormData para enviar el archivo
      const formData = new FormData();
      formData.append('image', file);

      // En un entorno real, aquí enviarías el archivo a tu servidor
      // Por ahora, crearemos una URL local para la imagen
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setGalleryError('Error al subir la imagen');
    } finally {
      setImgUploading(false);
    }
  };

  // Cargar imágenes de la galería
  const fetchGallery = async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const data = await window.electronAPI.readJson('galleryItemsData.json');
      setGalleryImages(data.map(item => item.image));
    } catch (err) {
      setGalleryError('No se pudo cargar la galería');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Buscar imágenes en Unsplash
  const searchUnsplash = async (query) => {
    setUnsplashLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20`,
        {
          headers: {
            'Authorization': 'Client-ID byl4MASBCSQvsEN1IbbW2F8uUa9ZiZwBlUULyXwrfsU'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Error al buscar imágenes');
      }
      
      const data = await response.json();
      setUnsplashResults(data.results);
    } catch (err) {
      console.error('Error al buscar en Unsplash:', err);
      setGalleryError('Error al buscar imágenes');
    } finally {
      setUnsplashLoading(false);
    }
  };

  // Abrir galería
  const openGallery = () => {
    setGalleryOpen(true);
    fetchGallery();
  };

  // Abrir búsqueda de Unsplash
  const openUnsplash = () => {
    setUnsplashOpen(true);
    setUnsplashQuery('');
    setUnsplashResults([]);
  };

  // Modal de galería
  const GalleryModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#23263a] rounded-lg p-6 max-w-4xl w-full relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
          onClick={() => setGalleryOpen(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Galería de Imágenes</h2>
        <div className="mb-4 text-sm text-gray-300">
          Selecciona una imagen de la galería para usarla.
        </div>
        {galleryLoading && <div className="text-white/60">Cargando galería...</div>}
        {galleryError && <div className="text-red-400">{galleryError}</div>}
        <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto">
          {galleryImages.map(img => (
            <div key={img} className="cursor-pointer border-2 border-transparent hover:border-primary rounded-lg p-1 bg-[#181f2a] flex flex-col items-center"
              onClick={() => {
                onChange(img);
                setGalleryOpen(false);
              }}
            >
              <img
                src={img}
                alt="galería"
                className="w-full h-20 object-cover rounded mb-1"
              />
              <span className="text-xs text-gray-300 truncate w-full">{img}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Modal de Unsplash
  const UnsplashModal = () => {
    const inputRef = useRef(null);

    useEffect(() => {
      if (unsplashOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [unsplashOpen]);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-[#23263a] rounded-lg p-6 max-w-4xl w-full relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
            onClick={() => setUnsplashOpen(false)}
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">Buscar en Unsplash</h2>
          <div className="mb-4 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={unsplashQuery}
              onChange={handleSearchInputChange}
              placeholder="Buscar imágenes..."
              className="flex-1 px-4 py-2 rounded-lg bg-[#181f2a] text-white border border-gray-600 focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => searchUnsplash(unsplashQuery)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Buscar
            </button>
          </div>
          {unsplashLoading && <div className="text-white/60">Buscando imágenes...</div>}
          {galleryError && <div className="text-red-400">{galleryError}</div>}
          <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto">
            {unsplashResults.map(img => (
              <div 
                key={img.id} 
                className="cursor-pointer border-2 border-transparent hover:border-primary rounded-lg p-1 bg-[#181f2a] flex flex-col items-center"
                onClick={() => {
                  onChange(img.urls.regular);
                  setUnsplashOpen(false);
                }}
              >
                <img
                  src={img.urls.thumb}
                  alt={img.alt_description || 'Unsplash image'}
                  className="w-full h-20 object-cover rounded mb-1"
                />
                <span className="text-xs text-gray-300 truncate w-full">
                  Por {img.user.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL de la imagen"
          className="flex-1 px-4 py-2 rounded-lg bg-[#181f2a] text-white border border-gray-600 focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={openGallery}
          className="px-4 py-2 bg-[#181f2a] text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          <i className="bx bx-images"></i>
        </button>
        <button
          type="button"
          onClick={openUnsplash}
          className="px-4 py-2 bg-[#181f2a] text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          <i className="bx bx-search"></i>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-[#181f2a] text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          <i className="bx bx-upload"></i>
        </button>
      </div>
      {value && (
        <div className="relative w-32 h-32">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
      )}
      {galleryOpen && <GalleryModal />}
      {unsplashOpen && <UnsplashModal />}
    </div>
  );
};

// Componente para renderizar una card
const ItemCard = ({ item, onEdit, onDelete, type }) => {
  const renderCardContent = () => {
    switch (type) {
      case 'products':
        return (
          <>
            <div className="relative h-48 mb-4">
              <SafeImage
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              {item.saleTag && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                  Oferta
                </span>
              )}
              {item.newTag && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded">
                  Nuevo
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-300 mb-2">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.categories?.map(category => (
                  <span key={category} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                    {category}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-primary">${item.newPrice}</span>
                  {item.oldPrice && (
                    <span className="ml-2 text-sm text-gray-400 line-through">${item.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 'testimonials':
        return (
          <>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-300">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{item.testimonio}</p>
              <div className="flex items-center">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                <span className="text-gray-400 ml-2">{item.date}</span>
              </div>
            </div>
          </>
        );
      case 'team':
        return (
          <>
            <div className="relative h-48 mb-4">
              <SafeImage
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{item.name}</h3>
              <p className="text-primary mb-2">{item.position}</p>
              <p className="text-gray-300 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.skills?.map(skill => (
                  <span key={skill} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {item.social?.instagram && (
                  <a href={item.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                    <i className="bx bxl-instagram text-xl"></i>
                  </a>
                )}
                {item.social?.linkedin && (
                  <a href={item.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                    <i className="bx bxl-linkedin text-xl"></i>
                  </a>
                )}
                {item.social?.tiktok && (
                  <a href={item.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                    <i className="bx bxl-tiktok text-xl"></i>
                  </a>
                )}
                {item.social?.youtube && (
                  <a href={item.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary">
                    <i className="bx bxl-youtube text-xl"></i>
                  </a>
                )}
              </div>
            </div>
          </>
        );
      case 'gallery':
        return (
          <>
            <div className="relative h-48 mb-4">
              <SafeImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <span className="absolute top-2 right-2 bg-primary/80 text-white px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </>
        );
      case 'features':
        return (
          <>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                  <i className={`bx ${item.icon} text-2xl text-primary`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-primary">{item.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3">{item.description}</p>
              {item.features && (
                <div className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <i className="bx bx-check text-green-500"></i>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      case 'faq':
        return (
          <>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.pregunta}</h3>
              <p className="text-gray-300">{item.respuesta}</p>
              {item.category && (
                <div className="mt-3">
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                    {item.category}
                  </span>
                </div>
              )}
            </div>
          </>
        );
      case 'projects':
        return (
          <>
            <div className="relative h-48 mb-4">
              <SafeImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              {item.status && (
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-sm ${
                  item.status === 'Completado' ? 'bg-green-500/80' : 
                  item.status === 'En Progreso' ? 'bg-yellow-500/80' : 
                  'bg-blue-500/80'
                } text-white`}>
                  {item.status}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 mb-3">{item.description}</p>
              {item.technologies && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {item.link && (
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 flex items-center gap-1"
                >
                  <i className="bx bx-link-external"></i>
                  Ver proyecto
                </a>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#23263a] rounded-lg shadow-lg overflow-hidden">
      {renderCardContent()}
      <div className="p-4 border-t border-[#2d3142] flex justify-end gap-2">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
        >
          <i className="bx bx-edit-alt mr-1"></i>
          Editar
        </button>
        <button
          onClick={() => onDelete(item)}
          className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
        >
          <i className="bx bx-trash mr-1"></i>
          Eliminar
        </button>
      </div>
    </div>
  );
};

// Componente para el panel de categorías
const CategoryPanel = ({ 
  categories = [], // Valor por defecto para categories
  onAddCategory, 
  onEditCategory, 
  onDeleteCategory,
  onAddItem,
  onEditItem,
  onDeleteItem
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setError('El nombre de la categoría no puede estar vacío');
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      setError('Ya existe una categoría con ese nombre');
      return;
    }

    onAddCategory(newCategory);
    setNewCategory('');
    setError('');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleSaveEdit = () => {
    if (!newCategoryName.trim()) {
      setError('El nombre de la categoría no puede estar vacío');
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase() && cat.name !== editingCategory.name)) {
      setError('Ya existe una categoría con ese nombre');
      return;
    }

    onEditCategory(editingCategory.name, newCategoryName);
    setEditingCategory(null);
    setNewCategoryName('');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setError('');
  };

  // Asegurarse de que categories sea un array
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="bg-[#181f2a] rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Categorías</h3>
      
      {/* Formulario para agregar categoría */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría"
          className="flex-1 bg-[#23263a] text-white rounded-lg px-4 py-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
        >
          Agregar
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}

      {/* Lista de categorías */}
      <div className="space-y-4">
        {safeCategories.map(category => (
          <div key={category.name} className="bg-[#23263a] rounded-lg p-4">
            {editingCategory?.name === category.name ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 bg-[#181f2a] text-white rounded-lg px-4 py-2"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Guardar
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className={`bx ${category.items?.[0]?.icon || 'bx-image'} text-xl text-white`}></i>
                  <span className="text-white">{category.name}</span>
                  <span className="text-gray-400 text-sm">
                    ({category.items?.length || 0}/12 items)
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <i className="bx bx-edit-alt text-xl"></i>
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.name)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <i className="bx bx-trash text-xl"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Grid de items de la categoría */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.items?.map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#181f2a]">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      fallbackType="gallery"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditItem(item)}
                      className="text-white hover:text-blue-300"
                    >
                      <i className="bx bx-edit-alt text-xl"></i>
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-white hover:text-red-300"
                    >
                      <i className="bx bx-trash text-xl"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Botón para agregar item si hay menos de 12 */}
              {(category.items?.length || 0) < 12 && (
                <button
                  onClick={() => onAddItem(category.name)}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                  <i className="bx bx-plus text-3xl"></i>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, item, onSave, type, selectedFile }) => {
  const [formData, setFormData] = useState(item || {});
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Cargar categorías de la galería
    const loadCategories = async () => {
      try {
        if (window.electronAPI) {
          const categories = await window.electronAPI.readJson('galleryCategories.json');
          setGalleryCategories(categories || []);
        }
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    if (selectedFile === 'galleryItemsData.json') {
      loadCategories();
    }
  }, [selectedFile, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const newErrors = {};
    if (!formData.title && !formData.name) {
      newErrors.title = 'El título es requerido';
    }
    if (!formData.image) {
      newErrors.image = 'La imagen es requerida';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  const getTitleField = () => {
    switch (selectedFile) {
      case 'productsData.json':
        return 'name';
      case 'galleryItemsData.json':
        return 'title';
      default:
        return 'title';
    }
  };

  const titleField = getTitleField();
  const titleLabel = selectedFile === 'productsData.json' ? 'Nombre' : 'Título';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#23263a] rounded-lg p-6 max-w-2xl w-full relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">
          {item ? 'Editar' : 'Añadir'} {FILE_NAMES[selectedFile].slice(0, -1)}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {titleLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData[titleField] || ''}
              onChange={e => {
                setFormData({ ...formData, [titleField]: e.target.value });
                setErrors({ ...errors, [titleField]: null });
              }}
              className={`w-full px-3 py-2 rounded-lg bg-[#181f2a] text-white border ${
                errors[titleField] ? 'border-red-500' : 'border-[#2d3142]'
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
            {errors[titleField] && (
              <p className="text-red-500 text-sm mt-1">{errors[titleField]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
            />
          </div>
          {selectedFile === 'galleryItemsData.json' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category || ''}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg bg-[#181f2a] text-white border ${
                  errors.category ? 'border-red-500' : 'border-[#2d3142]'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              >
                <option value="">Seleccionar categoría</option>
                {galleryCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imagen <span className="text-red-500">*</span>
            </label>
            <ImageInputField
              value={formData.image}
              onChange={value => {
                setFormData({ ...formData, image: value });
                setErrors({ ...errors, image: null });
              }}
              productName={formData.name}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icono
            </label>
            <input
              type="text"
              value={formData.icon || ''}
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ej: bx-coffee"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {item ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState('productsData.json');
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addRow, setAddRow] = useState({});
  const [categories, setCategories] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [isElectronAvailable, setIsElectronAvailable] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const tabs = [
    { id: 'products', label: 'Productos', file: 'productsData.json' },
    { id: 'testimonials', label: 'Testimonios', file: 'testimonials.json' },
    { id: 'gallery', label: 'Galería', file: 'galleryItemsData.json' },
    { id: 'team', label: 'Equipo', file: 'teamMembers.json' },
    { id: 'projects', label: 'Proyectos', file: 'projects.json' },
    { id: 'faq', label: 'FAQ', file: 'faq.json' },
    { id: 'features', label: 'Características', file: 'services.json' }
  ];

  // Verificar si estamos en Electron
  useEffect(() => {
    const checkElectron = () => {
      const isAvailable = window.electronAPI !== undefined;
      setIsElectronAvailable(isAvailable);
      if (!isAvailable) {
        setError('Esta aplicación debe ejecutarse en Electron para acceder a los archivos JSON');
      }
    };
    checkElectron();
  }, []);

  // Función para cargar las categorías de la galería
  const loadGalleryCategories = async () => {
    try {
      if (window.electronAPI) {
        const categories = await window.electronAPI.readJson('galleryCategories.json');
        setGalleryCategories(categories || []);
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  // Cargar datos usando Electron API
  useEffect(() => {
    const loadData = async () => {
      if (!isElectronAvailable) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await window.electronAPI.readJson(selectedFile);
        if (!data) {
          throw new Error('No se pudo cargar el archivo');
        }

        // Manejar diferentes estructuras de datos
        let processedData = data;
        if (selectedFile === 'projects.json') {
          processedData = data.projects || [];
        }

        setData(Array.isArray(processedData) ? processedData : []);
        
        // Cargar categorías según el tipo de archivo
        if (selectedFile === 'productsData.json') {
          const uniqueCategories = [...new Set(data.flatMap(item => item.categories || []))];
          setCategories(uniqueCategories);
        } else if (selectedFile === 'galleryItemsData.json') {
          await loadGalleryCategories();
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Error al cargar los datos: ${err.message}`);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedFile) {
      loadData();
    }
  }, [selectedFile, isElectronAvailable]);

  // Función para manejar categorías según el tipo de contenido
  const handleCategories = async (action, category, newName = null) => {
    // Solo procesar si estamos en la sección de galería
    if (selectedFile !== 'galleryItemsData.json') {
      return;
    }

    try {
      let updatedCategories = [...categories];
      
      switch (action) {
        case 'add':
          // Crear nueva categoría con array de items vacío
          updatedCategories.push({
            name: category,
            items: []
          });
          break;
        
        case 'edit':
          // Actualizar nombre de categoría manteniendo sus items
          updatedCategories = updatedCategories.map(cat => 
            cat.name === category 
              ? { ...cat, name: newName }
              : cat
          );
          break;
        
        case 'delete':
          // Eliminar categoría
          updatedCategories = updatedCategories.filter(cat => cat.name !== category);
          break;
      }

      // Guardar categorías actualizadas
      await window.electronAPI.writeJson('galleryCategories.json', updatedCategories);
      setCategories(updatedCategories);

      // Si se eliminó una categoría, actualizar los items
      if (action === 'delete') {
        const updatedItems = data.filter(item => item.category !== category);
        await window.electronAPI.writeJson('galleryItemsData.json', updatedItems);
        setData(updatedItems);
      }

    } catch (error) {
      console.error('Error al manejar categorías:', error);
      setError('Error al guardar los cambios');
    }
  };

  // Función para guardar datos usando la API de Electron
  const saveData = async (newData) => {
    if (!window.electronAPI) {
      console.error('API de Electron no disponible');
      return false;
    }
    
    try {
      await window.electronAPI.writeJson(selectedFile, newData);
      setData(newData);
      return true;
    } catch (err) {
      console.error('Error saving data:', err);
      setError(`Error al guardar los datos: ${err.message}`);
      return false;
    }
  };

  // Manejar eliminación
  const handleDelete = async (index) => {
    try {
      const item = data[index];
      const category = categories.find(cat => cat.name === item.category);
      
      if (!category) {
        setError('Categoría no encontrada');
        return;
      }

      // Eliminar el item de la categoría
      const updatedCategories = categories.map(cat => 
        cat.name === item.category
          ? {
              ...cat,
              items: cat.items.filter(i => i.id !== item.id)
            }
          : cat
      );

      // Guardar categorías actualizadas
      await window.electronAPI.writeJson('galleryCategories.json', updatedCategories);
      setCategories(updatedCategories);

    } catch (error) {
      console.error('Error al eliminar item:', error);
      setError('Error al guardar los cambios');
    }
  };

  // Función para manejar la edición de un producto
  const handleEdit = (index) => {
    const item = data[index];
    setEditIdx(index);
    setEditRow(item);
  };

  // Función para guardar la edición
  const handleSaveEdit = async (updatedItem) => {
    try {
      const newData = [...data];
      newData[editIdx] = updatedItem;
      
      // Si no hay imagen, intentar buscar una en Unsplash
      if (!updatedItem.image && updatedItem.name) {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(updatedItem.name)}&per_page=1`,
          {
            headers: {
              'Authorization': 'Client-ID byl4MASBCSQvsEN1IbbW2F8uUa9ZiZwBlUULyXwrfsU'
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            newData[editIdx].image = data.results[0].urls.regular;
          }
        }
      }
      
      // Guardar los cambios
      await window.electronAPI.writeJson(selectedFile, newData);
      setData(newData);
      setEditIdx(null);
      setEditRow({});
      setError('');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setError('Error al guardar los cambios');
    }
  };

  // Manejar adición
  const handleAdd = async () => {
    try {
      if (selectedFile === 'galleryItemsData.json') {
        // Validar que la categoría seleccionada no tenga más de 12 items
        const category = categories.find(cat => cat.name === selectedCategory);
        if (category && (category.items?.length || 0) >= 12) {
          setError('No se pueden agregar más de 12 items por categoría');
          return;
        }

        const newItem = {
          id: Date.now(),
          title: title,
          description: description,
          image: imageUrl,
          category: selectedCategory,
          icon: selectedIcon
        };

        // Actualizar la categoría con el nuevo item
        const updatedCategories = categories.map(cat => 
          cat.name === selectedCategory
            ? { 
                ...cat, 
                items: [...(cat.items || []), newItem] 
              }
            : cat
        );

        // Guardar categorías actualizadas
        await window.electronAPI.writeJson('galleryCategories.json', updatedCategories);
        setCategories(updatedCategories);
      } else {
        // Para otros tipos de contenido (productos, etc.)
        const newItem = {
          id: Date.now(),
          ...addRow
        };

        // Si no hay imagen, intentar buscar una en Unsplash
        if (!newItem.image && newItem.name) {
          const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(newItem.name)}&per_page=1`,
            {
              headers: {
                'Authorization': 'Client-ID byl4MASBCSQvsEN1IbbW2F8uUa9ZiZwBlUULyXwrfsU'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              newItem.image = data.results[0].urls.regular;
            }
          }
        }

        const newData = [...data, newItem];
        await saveData(newData);
      }

      // Limpiar formulario
      setTitle('');
      setDescription('');
      setImageUrl('');
      setSelectedCategory('');
      setSelectedIcon('');
      setError('');
      setShowAdd(false);

    } catch (error) {
      console.error('Error al agregar item:', error);
      setError('Error al guardar los cambios');
    }
  };

  // Renderizar campo editable
  const renderEditableField = (key, value, onChange) => {
    if (key === 'image') {
      return <ImageInputField value={value} onChange={onChange} productName={value} />;
    }
    
    if (key === 'categories' && selectedFile === 'productsData.json') {
      return (
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={value?.includes(cat)}
                onChange={e => {
                  const newValue = e.target.checked
                    ? [...(value || []), cat]
                    : (value || []).filter(c => c !== cat);
                  onChange(newValue);
                }}
                className="rounded"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="rounded"
        />
      );
    }

    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      );
    }

    return (
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    );
  };

  // Función para manejar el drag and drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;
    const itemId = result.draggableId;

    try {
      // Actualizar los productos
      const updatedData = data.map(item => {
        if (item.id.toString() === itemId) {
          // Remover la categoría de origen
          const categories = item.categories?.filter(cat => cat !== sourceCategory) || [];
          // Agregar la nueva categoría si es diferente
          if (sourceCategory !== destinationCategory) {
            categories.push(destinationCategory);
          }
          return { ...item, categories };
        }
        return item;
      });

      // Guardar cambios
      await window.electronAPI.writeJson(selectedFile, updatedData);
      setData(updatedData);
    } catch (error) {
      console.error('Error al mover el producto:', error);
      setError('Error al mover el producto');
    }
  };

  // Modificar la sección de productos en renderCards
  const renderProductsSection = () => (
    <div className="space-y-8">
      <div className="bg-[#23263a] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Categorías</h3>
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-3 py-1 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 flex items-center"
          >
            <i className="bx bx-plus mr-1"></i>
            Nueva Categoría
          </button>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <div key={category} className="bg-[#181f2a] rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-white">{category}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <i className="bx bx-edit-alt"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
                
                <Droppable droppableId={category}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2 min-h-[100px]"
                    >
                      {data
                        .filter(item => item.categories?.includes(category))
                        .map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-[#23263a] rounded p-2 flex items-center justify-between group transition-colors ${
                                  snapshot.isDragging ? 'bg-primary/20' : ''
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <SafeImage
                                    src={item.image}
                                    alt={item.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                  <span className="text-white">{item.name}</span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleEdit(data.findIndex(i => i.id === item.id))}
                                    className="text-blue-400 hover:text-blue-300"
                                  >
                                    <i className="bx bx-edit-alt"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(data.findIndex(i => i.id === item.id))}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <i className="bx bx-trash"></i>
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );

  const renderCards = () => {
    if (loading) {
      return <div className="text-center py-8">Cargando...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    return (
      <div className="space-y-6">
        {/* Botón de añadir en la parte superior */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {FILE_NAMES[selectedFile]}
          </h2>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <i className="bx bx-plus mr-2"></i>
            Añadir {FILE_NAMES[selectedFile].slice(0, -1)}
          </button>
        </div>

        {/* Panel de categorías solo para galería */}
        {selectedFile === 'galleryItemsData.json' && (
          <CategoryPanel
            categories={galleryCategories}
            onAddCategory={(category) => handleCategories('add', category)}
            onEditCategory={(oldCategory, newCategory) => handleCategories('edit', oldCategory, newCategory)}
            onDeleteCategory={(category) => handleCategories('delete', category)}
            onAddItem={(category) => handleCategories('add', category)}
            onEditItem={(item) => handleEdit(data.findIndex(i => i.id === item.id))}
            onDeleteItem={(id) => handleDelete(data.findIndex(i => i.id === id))}
          />
        )}

        {/* Vista tipo Notion para productos */}
        {selectedFile === 'productsData.json' && renderProductsSection()}

        {/* Grid de cards para otras secciones */}
        {selectedFile !== 'productsData.json' && selectedFile !== 'galleryItemsData.json' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, idx) => (
              <ItemCard
                key={item.id || idx}
                item={item}
                type={activeTab}
                onEdit={() => handleEdit(idx)}
                onDelete={() => handleDelete(idx)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Función para manejar la edición de categorías de productos
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  };

  // Función para manejar la eliminación de categorías de productos
  const handleDeleteCategory = async (category) => {
    try {
      // Actualizar los productos para remover la categoría eliminada
      const updatedData = data.map(item => ({
        ...item,
        categories: item.categories?.filter(cat => cat !== category) || []
      }));

      // Actualizar las categorías
      const updatedCategories = categories.filter(cat => cat !== category);

      // Guardar cambios usando la API correcta de Electron
      await window.electronAPI.writeJson('productsData.json', updatedData);
      await window.electronAPI.writeJson('productCategories.json', updatedCategories);

      // Actualizar estado
      setData(updatedData);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      setError('Error al eliminar la categoría. Por favor, intente nuevamente.');
    }
  };

  // Función para actualizar una categoría existente
  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('El nombre de la categoría no puede estar vacío');
      return;
    }

    if (categories.includes(newCategoryName) && newCategoryName !== editingCategory) {
      setError('Ya existe una categoría con ese nombre');
      return;
    }

    try {
      // Actualizar los productos que usan esta categoría
      const updatedData = data.map(item => ({
        ...item,
        categories: item.categories?.map(cat => 
          cat === editingCategory ? newCategoryName : cat
        ) || []
      }));

      // Actualizar las categorías
      const updatedCategories = categories.map(cat => 
        cat === editingCategory ? newCategoryName : cat
      );

      // Guardar cambios usando la API correcta de Electron
      await window.electronAPI.writeJson('productsData.json', updatedData);
      await window.electronAPI.writeJson('productCategories.json', updatedCategories);

      // Actualizar estado
      setData(updatedData);
      setCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategoryName('');
      setError('');
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      setError('Error al actualizar la categoría. Por favor, intente nuevamente.');
    }
  };

  // Función para guardar una nueva categoría
  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('El nombre de la categoría no puede estar vacío');
      return;
    }

    if (categories.includes(newCategoryName)) {
      setError('Ya existe una categoría con ese nombre');
      return;
    }

    try {
      const updatedCategories = [...categories, newCategoryName];
      await window.electronAPI.writeJson('productCategories.json', updatedCategories);
      setCategories(updatedCategories);
      setShowAddCategory(false);
      setNewCategoryName('');
      setError('');
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      setError('Error al guardar la categoría. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#181f2a]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
          >
            <i className="bx bx-home mr-2"></i>
            Volver al sitio
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedFile(tab.file);
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-[#23263a] text-gray-300 hover:bg-[#2d3142]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {renderCards()}

        {/* Modal de edición */}
        {editIdx !== null && (
          <EditModal
            isOpen={editIdx !== null}
            onClose={() => {
              setEditIdx(null);
              setEditRow({});
              setError('');
            }}
            item={editRow}
            onSave={handleSaveEdit}
            type={activeTab}
            selectedFile={selectedFile}
          />
        )}

        {/* Modal de añadir */}
        {showAdd && (
          <EditModal
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            item={addRow}
            onSave={handleAdd}
            type={activeTab}
            selectedFile={selectedFile}
          />
        )}

        {/* Modal para agregar/editar categoría */}
        {(showAddCategory || editingCategory) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-[#23263a] rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-white">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre de la categoría
                  </label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#181f2a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ingrese el nombre de la categoría"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setShowAddCategory(false);
                      setEditingCategory(null);
                      setNewCategoryName('');
                      setError('');
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={editingCategory ? handleUpdateCategory : handleSaveCategory}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    {editingCategory ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin; 