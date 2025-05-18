'use client'
import { useEffect } from 'react';

// bootstrap
const BootstrapForBrowser = () => {
    useEffect(() => {
        const initBootstrap = async () => {
            try {
                await import('bootstrap/dist/js/bootstrap.bundle.min');
                
                if (typeof window !== 'undefined' && window.bootstrap) {
                    // Inicializa todos los offcanvas de la página
                    document.querySelectorAll('.offcanvas').forEach((el) => {
                        if (!el.hasAttribute('data-bs-initialized')) {
                            new window.bootstrap.Offcanvas(el, {
                                backdrop: true,
                                keyboard: true,
                                scroll: true
                            });
                            el.setAttribute('data-bs-initialized', 'true');
                        }
                    });
                }
            } catch (error) {
                console.error('Error initializing Bootstrap:', error);
            }
        };

        initBootstrap();
    }, []);
    return null
}

export default BootstrapForBrowser