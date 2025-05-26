import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useState, useEffect, useRef } from 'react';
import SafeImage from '../components/common/SafeImage';
import Dashboard from '../admin/Dashboard';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

// Mapeo de nombres de archivos a nombres amigables
const FILE_NAMES = {
  'teamMembers.json': 'Sección de Equipo',
  'galleryItemsData.json': 'Galería de Imágenes',
  'testimonials.json': 'Testimonios',
  'projects.json': 'Proyectos',
  'products.json': 'Productos',
  'faq.json': 'Preguntas Frecuentes',
  'features.json': 'Características y Servicios',
  'faqData.json': 'Preguntas Frecuentes (FAQ)'
};

// Componente para input de imagen con icono de carpeta y modal de galería
const ImageInputField = ({ value, onChange }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const fileInputRef = useRef();

  // Cargar imágenes de la galería
  const fetchGallery = async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const res = await fetch(`${API_URL}/uploads`);
      const imgs = await res.json();
      setGalleryImages(imgs);
    } catch (err) {
      setGalleryError('No se pudo cargar la galería');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Abrir galería
  const openGallery = () => {
    setGalleryOpen(true);
    fetchGallery();
  };

  // Subir imagen por drag & drop en galería
  const handleGalleryDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setImgUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
    setImgUploading(false);
    fetchGallery();
  };

  // Subir imagen desde input file
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
    setImgUploading(false);
    fetchGallery();
  };

  // Modal de galería
  const GalleryModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className="bg-[#23263a] rounded-lg p-6 max-w-2xl w-full relative"
        onDrop={handleGalleryDrop}
        onDragOver={e => e.preventDefault()}
      >
        <button
          className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
          onClick={() => setGalleryOpen(false)}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Galería de Imágenes</h2>
        <div className="mb-4 text-sm text-gray-300">
          Arrastra y suelta una imagen aquí para subirla, o haz clic en una imagen para seleccionarla.<br/>
          <button
            className="mt-2 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Subir imagen
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
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
        {imgUploading && <div className="mt-4 text-blue-300">Subiendo imagen...</div>}
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Ruta de la imagen"
        readOnly
      />
      <button
        type="button"
        className="p-2 rounded-lg bg-gray-700 hover:bg-blue-700 text-white flex items-center justify-center"
        onClick={openGallery}
        title="Seleccionar imagen de la galería"
      >
        <span role="img" aria-label="carpeta" style={{ fontSize: '1.2em' }}>📁</span>
      </button>
      {galleryOpen && <GalleryModal />}
    </div>
  );
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addRow, setAddRow] = useState({});
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState(null);
  const [galleryOnSelect, setGalleryOnSelect] = useState(null);
  const dropRef = useRef();
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [editCatIdx, setEditCatIdx] = useState(null);
  const [editCatValue, setEditCatValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);
  const [modalIsNew, setModalIsNew] = useState(false);

  const tabs = [
    { id: 'team', label: 'Equipo' },
    { id: 'services', label: 'Servicios' },
    { id: 'gallery', label: 'Galería' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'faq', label: 'FAQ' },
    { id: 'projects', label: 'Proyectos' }
  ];

  useEffect(() => {
    fetch(`${API_URL}/${activeTab}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, [activeTab]);

  // Cargar lista de archivos JSON
  useEffect(() => {
    fetch(`${API_URL}/data/files`)
      .then(res => res.json())
      .then(files => setFiles(files.filter(file => FILE_NAMES[file])))
      .catch(() => setFiles([]));
  }, []);

  // Determinar archivo de categorías según sección
  const getCategoriesFile = () => {
    if (selectedFile === 'galleryItemsData.json') return 'galleryCategories.json';
    if (selectedFile === 'products.json') return 'productCategories.json';
    return 'categories.json';
  };

  // Cargar categorías según sección
  useEffect(() => {
    if (!selectedFile) return;
    setCatLoading(true);
    fetch(`${API_URL}/data/${getCategoriesFile()}`)
      .then(res => res.json())
      .then(data => {
        // Asegurarnos de que categories sea un array
        const categoriesArray = Array.isArray(data) ? data : 
                              typeof data === 'object' ? Object.values(data) : 
                              [];
        setCategories(categoriesArray);
      })
      .catch(() => setCategories([]))
      .finally(() => setCatLoading(false));
  }, [selectedFile]);

  // Guardar cambios en el backend
  const saveData = async (newData) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(`${API_URL}/data/${selectedFile}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Array.isArray(newData) ? newData : Object.values(newData), null, 2)
      });
      setData(newData);
      setEditIdx(null);
      setShowAdd(false);
    } catch (err) {
      setError('No se pudo guardar');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar fila
  const handleDelete = (idx) => {
    if (!window.confirm('¿Seguro que quieres eliminar este elemento?')) return;
    const newData = data.filter((_, i) => i !== idx);
    saveData(newData);
  };

  // Editar fila
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditRow({ ...data[idx] });
  };

  // Guardar edición
  const handleSaveEdit = () => {
    const newData = data.map((item, i) => (i === editIdx ? editRow : item));
    saveData(newData);
  };

  // Añadir fila
  const handleAdd = () => {
    setShowAdd(true);
    setAddRow({});
  };

  const handleSaveAdd = () => {
    const newData = [...data, addRow];
    saveData(newData);
  };

  // Cargar imágenes de la galería
  const fetchGallery = async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const res = await fetch(`${API_URL}/uploads`);
      const imgs = await res.json();
      setGalleryImages(imgs);
    } catch (err) {
      setGalleryError('No se pudo cargar la galería');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Abrir galería
  const openGallery = (onSelect) => {
    setGalleryOnSelect(() => onSelect);
    setGalleryOpen(true);
    fetchGallery();
  };

  // Subir imagen por drag & drop en galería
  const handleGalleryDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setImgUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
    setImgUploading(false);
    fetchGallery();
  };

  // Subir imagen
  const handleImageUpload = async (e, onUrl) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
    const json = await res.json();
    setImgUploading(false);
    if (json.url) onUrl(json.url);
  };

  // Utilidad para detectar campos de imagen (ahora incluye 'src')
  const isImageField = (key) => /image|img|foto|imagen|picture|avatar|photo|url|src/i.test(key);

  // Guardar categorías según sección
  const saveCategories = async (newCats) => {
    setCatLoading(true);
    setCatError(null);
    try {
      await fetch(`${API_URL}/data/${getCategoriesFile()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCats, null, 2)
      });
      setCategories(newCats);
      setEditCatIdx(null);
      setEditCatValue('');
      setNewCategory('');
    } catch (err) {
      setCatError('No se pudo guardar');
    } finally {
      setCatLoading(false);
    }
  };

  // Renderizar gestión de categorías solo para galería y productos
  const renderCategories = () => {
    if (selectedFile !== 'galleryItemsData.json' && selectedFile !== 'products.json') return null;
    if (!Array.isArray(categories)) return null;
    
    return (
      <div className="mb-8 w-full max-w-xl bg-[#181f2a] rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Categorías de {selectedFile === 'galleryItemsData.json' ? 'Galería' : 'Productos'}</h2>
        {catLoading && <div className="text-white/60">Cargando categorías...</div>}
        {catError && <div className="text-red-400">{catError}</div>}
        <ul className="mb-4">
          {categories.map((cat, idx) => (
            <li key={cat} className="flex items-center gap-2 mb-2">
              {editCatIdx === idx ? (
                <>
                  <input
                    type="text"
                    value={editCatValue}
                    onChange={e => setEditCatValue(e.target.value)}
                    className="px-2 py-1 rounded bg-[#23263a] text-white border border-[#2d3142]"
                  />
                  <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => saveCategories(categories.map((c, i) => i === idx ? editCatValue : c))}>Guardar</button>
                  <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={() => setEditCatIdx(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <span className="text-white">{cat}</span>
                  <button className="px-2 py-1 bg-blue-600 text-white rounded" onClick={() => { setEditCatIdx(idx); setEditCatValue(cat); }}>Editar</button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => saveCategories(categories.filter((_, i) => i !== idx))}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            className="px-2 py-1 rounded bg-[#23263a] text-white border border-[#2d3142]"
            placeholder="Nueva categoría"
          />
          <button className="px-2 py-1 bg-primary text-white rounded" onClick={() => newCategory && saveCategories([...categories, newCategory])}>Añadir</button>
        </div>
      </div>
    );
  };

  // Renderizar campo editable
  const renderEditableField = (key, value, onChange) => {
    // No mostrar campo de foto para testimonios
    if (selectedFile === 'testimonials.json' && isImageField(key)) {
      return null;
    }
    
    if (isImageField(key)) {
      return <ImageInputField value={value} onChange={onChange} />;
    }
    if (key.toLowerCase() === 'category' && Array.isArray(categories) && categories.length > 0 && (selectedFile === 'galleryItemsData.json' || selectedFile === 'products.json')) {
      return (
        <select
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <textarea
          value={JSON.stringify(value, null, 2)}
          onChange={e => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch (err) {
              onChange(e.target.value);
            }
          }}
          className="w-full px-3 py-2 rounded-lg bg-[#23263a] text-white border border-[#2d3142] focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
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

  // Renderizar tabla editable
  const renderTable = () => {
    if (!data || !data.length) return <div className="text-white/60">No hay datos.</div>;
    const keys = Object.keys(data[0]);
    return (
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-[#181f2a] text-white rounded-lg">
          <thead>
            <tr>
              {keys.map(key => <th key={key} className="px-4 py-2 border-b border-[#23263a] text-left align-top whitespace-normal">{key}</th>)}
              <th className="px-4 py-2 border-b border-[#23263a]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {editIdx === idx ? keys.map(key => (
                  <td key={key} className="px-4 py-2 border-b border-[#23263a] align-top whitespace-pre-line break-words max-w-xs">
                    {renderEditableField(
                      key,
                      editRow[key],
                      value => setEditRow({ ...editRow, [key]: value })
                    )}
                  </td>
                )) : keys.map(key => (
                  <td key={key} className="px-4 py-2 border-b border-[#23263a] align-top whitespace-pre-line break-words max-w-xs">
                    {typeof item[key] === 'object' ? (
                      <pre className="text-sm whitespace-pre-line break-words max-w-xs">{JSON.stringify(item[key], null, 2)}</pre>
                    ) : (
                      <span className="whitespace-pre-line break-words max-w-xs block">{String(item[key])}</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-[#23263a] align-top">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <button 
                        className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        onClick={handleSaveEdit}
                      >
                        Guardar
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                        onClick={() => setEditIdx(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        onClick={() => handleDelete(idx)}
                      >
                        Eliminar
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        onClick={() => handleEdit(idx)}
                      >
                        Editar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {showAdd && (
              <tr>
                {keys.map(key => (
                  <td key={key} className="px-4 py-2 border-b border-[#23263a] align-top whitespace-pre-line break-words max-w-xs">
                    {renderEditableField(
                      key,
                      addRow[key],
                      value => setAddRow({ ...addRow, [key]: value })
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-[#23263a] align-top">
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                      onClick={handleSaveAdd}
                    >
                      Guardar
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                      onClick={() => setShowAdd(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button 
          className="mt-4 px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          onClick={handleAdd}
        >
          Añadir nuevo
        </button>
      </div>
    );
  };

  // Modal de edición/creación
  const renderModal = () => {
    if (!modalOpen) return null;
    const keys = modalItem ? Object.keys(modalItem) : [];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-[#23263a] rounded-lg p-8 max-w-lg w-full relative">
          <button
            className="absolute top-2 right-2 text-white text-2xl hover:text-red-400"
            onClick={() => setModalOpen(false)}
          >×</button>
          <h2 className="text-2xl font-bold mb-4 text-white">{modalIsNew ? 'Añadir' : 'Editar'} {selectedFile === 'galleryItemsData.json' ? 'Imagen' : selectedFile === 'products.json' ? 'Producto' : 'Ítem'}</h2>
          <form onSubmit={e => {
            e.preventDefault();
            if (modalIsNew) {
              saveData([...data, modalItem]);
            } else {
              const newData = data.map((item, i) => (i === modalIdx ? modalItem : item));
              saveData(newData);
            }
            setModalOpen(false);
          }}>
            <div className="flex flex-col gap-4">
              {keys.map(key => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-white font-semibold capitalize">{key}</label>
                  {renderEditableField(
                    key,
                    modalItem[key],
                    value => setModalItem({ ...modalItem, [key]: value })
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <button type="button" className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Vista de cards para galería, productos, proyectos, equipo y testimonios
  const isCardSection = [
    'galleryItemsData.json',
    'products.json',
    'projects.json',
    'teamMembers.json',
    'testimonials.json'
  ].includes(selectedFile);

  const renderCards = () => {
    if (!data || !data.length) return <div className="text-white/60">No hay datos.</div>;
    // Detección de campos principales
    const isGallery = selectedFile === 'galleryItemsData.json';
    const isProduct = selectedFile === 'products.json';
    const isProject = selectedFile === 'projects.json';
    const isTeam = selectedFile === 'teamMembers.json';
    const isTestimonial = selectedFile === 'testimonials.json';
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => (
          <div key={item.id || idx} className="bg-[#181f2a] rounded-xl shadow p-4 flex flex-col items-center relative group">
            <SafeImage
              src={item.src || item.image || item.foto}
              alt={item.title || item.name || item.nombre || item.rol || item.role || 'Imagen'}
              width={220}
              height={220}
              className="rounded-lg w-full h-44 object-cover mb-3"
              fallbackType={isGallery ? 'gallery' : isProduct ? 'products' : isProject ? 'projects' : isTeam ? 'team' : isTestimonial ? 'testimonials' : 'default'}
            />
            <div className="w-full flex flex-col items-start gap-1 mb-2">
              <span className="text-primary font-bold text-lg">{item.title || item.name || item.nombre}</span>
              {item.category && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{item.category}</span>}
              {item.rol && <span className="text-xs text-white/70">{item.rol}</span>}
              {item.role && <span className="text-xs text-white/70">{item.role}</span>}
              {item.description && <span className="text-white/80 text-sm whitespace-pre-line break-words">{item.description}</span>}
              {item.testimonio && <span className="text-white/80 text-sm whitespace-pre-line break-words">{item.testimonio}</span>}
              {isProduct && item.price && <span className="text-green-400 font-semibold">${item.price}</span>}
              {isProject && item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs">Ver proyecto</a>}
            </div>
            <div className="flex gap-2 mt-auto w-full">
              <button
                className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => { setModalItem(item); setModalIdx(idx); setModalIsNew(false); setModalOpen(true); }}
              >Editar</button>
              <button
                className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleDelete(idx)}
              >Eliminar</button>
            </div>
          </div>
        ))}
        {/* Card para añadir nuevo */}
        <div className="bg-[#23263a] rounded-xl shadow p-4 flex flex-col items-center justify-center border-2 border-dashed border-primary cursor-pointer hover:bg-[#1a2233] transition-colors"
          onClick={() => {
            // Crear un objeto vacío con las mismas keys que el primer ítem
            const keys = Object.keys(data[0] || {});
            const empty = {};
            keys.forEach(k => empty[k] = '');
            empty.id = Date.now();
            setModalItem(empty);
            setModalIdx(null);
            setModalIsNew(true);
            setModalOpen(true);
          }}
        >
          <span className="text-5xl text-primary mb-2">+</span>
          <span className="text-white/70">Añadir nuevo</span>
        </div>
      </div>
    );
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      {galleryOpen && <GalleryModal />}
      {renderModal()}
      <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12">
        <Dashboard />
        <div className={`w-full max-w-7xl flex ${isCardSection ? 'flex-row gap-8' : 'flex-col'}`}>
          {/* Panel lateral de categorías */}
          {(selectedFile === 'galleryItemsData.json' || selectedFile === 'products.json') && (
            <aside className="w-full max-w-xs flex-shrink-0">
              {renderCategories()}
            </aside>
          )}
          {/* Contenido principal */}
          <section className="flex-1">
            <div className="mb-8 w-full max-w-xl">
              <label className="block mb-2 font-semibold">Selecciona la sección a gestionar:</label>
              <select
                value={selectedFile}
                onChange={e => setSelectedFile(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#181f2a] text-white border border-[#23263a] focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecciona una sección</option>
                {files.map(file => (
                  <option key={file} value={file}>{FILE_NAMES[file]}</option>
                ))}
              </select>
            </div>
            <div className="w-full max-w-5xl">
              {loading && <div className="text-white/60">Cargando datos...</div>}
              {error && <div className="text-red-400">{error}</div>}
              {isCardSection ? renderCards() : renderTable()}
            </div>
          </section>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDownload}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Descargar JSON
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin; 