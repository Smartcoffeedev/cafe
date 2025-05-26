import projectsDataRaw from '../data/projects.json';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const projectsData = projectsDataRaw.projects.map(p => ({
  ...p,
  image: p.image ? p.image : '/img/all-img/jose.jpg'
}));

const Ecosistema = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-custom text-light-custom flex flex-col items-center py-12 mt-24">
        <h1 className="text-4xl font-bold mb-8">Ecosistema</h1>
        <p className="text-muted-custom max-w-xl text-center mb-10">Explora el ecosistema de SmartCoffee y descubre los proyectos que impulsan nuestra comunidad.</p>
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projectsData.map(project => (
            <div key={project.id} className="card-custom p-6 rounded-xl flex flex-col items-center bg-[#181f2a]">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-light-custom text-center">{project.title}</h3>
              <p className="text-muted-custom text-center mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-custom px-6 py-2 rounded-lg mt-auto">Ir a la web</a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Ecosistema; 