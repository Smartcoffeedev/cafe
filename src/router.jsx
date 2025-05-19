import { createBrowserRouter } from 'react-router-dom';

// Páginas públicas
import Landing from './pages/Landing';
import Ecosistema from './pages/Ecosistema';
import Carta from './pages/Carta';
import FAQ from './pages/FAQ';
import Contacto from './pages/Contacto';
import Servicios from './pages/Servicios';
import SobreNosotros from './pages/SobreNosotros';
import Admin from './pages/Admin';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/ecosistema',
    element: <Ecosistema />,
  },
  {
    path: '/carta',
    element: <Carta />,
  },
  {
    path: '/faq',
    element: <FAQ />,
  },
  {
    path: '/contacto',
    element: <Contacto />,
  },
  {
    path: '/servicios',
    element: <Servicios />,
  },
  {
    path: '/sobre-nosotros',
    element: <SobreNosotros />,
  },
  {
    path: '/admin',
    element: <Admin />,
  }
];

export const router = createBrowserRouter(routes); 