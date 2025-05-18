import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/boxicons.min.css'
import '@/assets/css/flaticon.css'
import '@/assets/css/header.css'
import '@/assets/css/style.css'
import '@/assets/css/responsive.css'
import 'react-modal-video/scss/modal-video.scss'
import 'react-photo-view/dist/react-photo-view.css';
import 'swiper/css';
import Header from '@/components/sections/header/header';
import Footer from '@/components/sections/footer';
import BootstrapForBrowser from '@/components/ui/bootstrapForBrowser.jsx';
import SetBackgroundColor from '@/components/ui/setBackgroundColor';
import ScrollToTop from '@/components/ui/scrollToTop';
import AddAnimation from '@/components/ui/addAnimation';
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const metadata = {
  title: "Aithm - AI Agency & Futuristic Startup Next.js Template",
  description: "Aithm - AI Agency & Futuristic Startup Next.js Template",
};

export default function RootLayout({ children }) {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    setShowLoader(true);
    const timeout = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <Loading show={showLoader} />
        <SetBackgroundColor />
        <BootstrapForBrowser />
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <AddAnimation />
      </body>
    </html>
  );
}
