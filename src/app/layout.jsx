import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// Importaciones de componentes
import Header from '@/components/sections/header/header';
import Footer from '@/components/sections/footer';

// Estilos globales
import './globals.css';

// Estilos de componentes
import '@/assets/css/style.css';
import '@/assets/css/responsive.css';
import '@/assets/css/header.css';
import '@/assets/css/preloader.css';
import '@/assets/css/admin.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Coffee',
  description: 'Smart Coffee - Innovación en café',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 