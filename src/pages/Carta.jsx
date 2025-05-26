import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useState, useMemo } from 'react';
import productsData from '../data/productsData.json';

const Carta = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [sort, setSort] = useState('default');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    productsData.forEach(product => {
      if (Array.isArray(product.categories)) {
        product.categories.forEach(cat => uniqueCategories.add(cat));
      }
    });
    return ['Todas', ...Array.from(uniqueCategories).sort()];
  }, []);

  const categoriesWithCount = useMemo(() => {
    const count = {};
    productsData.forEach(product => {
      if (Array.isArray(product.categories)) {
        product.categories.forEach(cat => {
          count[cat] = (count[cat] || 0) + 1;
        });
      }
    });
    return count;
  }, []);

  const filtered = useMemo(() => {
    let filtered = productsData;
    
    if (category !== 'Todas') {
      filtered = filtered.filter(p => p.categories && p.categories.includes(category));
    }
    
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }
    
    if (sort === 'menor') {
      filtered = filtered.slice().sort((a, b) => {
        const priceA = parseFloat(a.newPrice?.replace(/[^\d.]/g, '') || 0);
        const priceB = parseFloat(b.newPrice?.replace(/[^\d.]/g, '') || 0);
        return priceA - priceB;
      });
    } else if (sort === 'mayor') {
      filtered = filtered.slice().sort((a, b) => {
        const priceA = parseFloat(a.newPrice?.replace(/[^\d.]/g, '') || 0);
        const priceB = parseFloat(b.newPrice?.replace(/[^\d.]/g, '') || 0);
        return priceB - priceA;
      });
    }
    
    return filtered;
  }, [search, category, sort]);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12 mt-24">
        <h1 className="text-4xl font-bold mb-8">Carta</h1>
        <p className="text-muted-custom max-w-xl text-center mb-10">Descubre nuestra carta de cafés y especialidades SmartCoffee.</p>
        <div className="flex flex-wrap gap-4 mb-8 w-full max-w-5xl justify-center md:justify-start">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#181f2a] text-white placeholder:text-white/60 border border-[#23263a] focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#181f2a] text-white border border-[#23263a] focus:outline-none focus:ring-2 focus:ring-primary min-w-[170px]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'Todas' ? 'Todas' : `${cat} (${categoriesWithCount[cat] || 0})`}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#181f2a] text-white border border-[#23263a] focus:outline-none focus:ring-2 focus:ring-primary min-w-[140px]"
          >
            <option value="default">Ordenar por</option>
            <option value="menor">Menor precio</option>
            <option value="mayor">Mayor precio</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {filtered.map(product => (
            <div key={product.id} className="card-custom p-6 rounded-xl flex flex-col items-center">
              <img
                src={product.image || '/img/all-img/jose.jpg'}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openModal(product.image || '/img/all-img/jose.jpg')}
              />
              <h3 className="text-xl font-semibold mb-2 text-light-custom">{product.name}</h3>
              <p className="text-muted-custom mb-2 text-center">{product.description}</p>
              <span className="text-primary font-bold text-lg">{product.newPrice}</span>
              {product.oldPrice && (
                <span className="text-muted-custom line-through ml-2">{product.oldPrice}</span>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center text-white/60 py-12">No se encontraron productos.</div>
          )}
        </div>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeModal}>
            <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80 transition"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                &times;
              </button>
              <img src={modalImg} alt="Vista ampliada" className="rounded-lg max-h-[80vh] w-auto object-contain" />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Carta; 