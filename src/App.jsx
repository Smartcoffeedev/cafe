import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/globals.css';
import Admin from './pages/Admin';
import Home from './pages/Home';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App; 