// Datos del footer
export const footerData = {
    footerData: {
        companyInfo: {
            name: "Smart Coffee",
            description: "Tu café inteligente, tu momento perfecto",
            address: "123 Calle Principal, Ciudad",
            phone: "+1 234 567 890",
            email: "info@smartcoffee.com"
        },
        quickLinks: [
            { name: "Inicio", href: "/" },
            { name: "Productos", href: "/products" },
            { name: "Sobre Nosotros", href: "/about" },
            { name: "Contacto", href: "/contact" }
        ],
        socialLinks: [
            { name: "Facebook", href: "#", icon: "facebook" },
            { name: "Twitter", href: "#", icon: "twitter" },
            { name: "Instagram", href: "#", icon: "instagram" }
        ],
        newsletter: {
            title: "Suscríbete a nuestro newsletter",
            description: "Recibe las últimas noticias y ofertas especiales"
        }
    }
};

// GET - Obtener datos del footer
export async function GET() {
    try {
        return new Response(JSON.stringify(footerData), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// PUT - Actualizar datos del footer
export async function PUT(request) {
    try {
        const body = await request.json();
        Object.assign(footerData.footerData, body);
        return new Response(JSON.stringify(footerData), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
} 