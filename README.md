# SmartCoffee

SmartCoffee es una aplicación web moderna que muestra el futuro del café con tecnología inteligente. Desarrollada con React, Vite y Tailwind CSS.

## Características

- 🎨 Diseño moderno y responsivo
- 🌙 Tema oscuro por defecto
- 🚀 Rendimiento optimizado
- 📱 Totalmente adaptable a dispositivos móviles
- 🔒 Panel de administración local
- 🎯 SEO optimizado

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- React Router
- PostCSS
- ESLint

## Requisitos

- Node.js 18 o superior
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/smartcoffee.git
cd smartcoffee
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

```
smartcoffee/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── sections/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
├── index.html
└── package.json
```

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Tu Nombre - [@tutwitter](https://twitter.com/tutwitter) - email@ejemplo.com

Link del Proyecto: [https://github.com/tu-usuario/smartcoffee](https://github.com/tu-usuario/smartcoffee)

## Despliegue automático en Hostinger

1. El repositorio está preparado para CI/CD con GitHub Actions y scripts de despliegue (`deploy.sh` y `post-deploy.sh`).
2. Cuando hagas `git push` a la rama principal, GitHub ejecutará el workflow y desplegará automáticamente en tu hosting (si tienes configurado el acceso SSH y los scripts en el servidor).
3. Asegúrate de tener configuradas las variables de entorno y permisos necesarios en tu panel de Hostinger.

### Estructura de scripts:
- `deploy.sh`: Construye el proyecto y copia los archivos a `public_html`.
- `post-deploy.sh`: Da permisos y ejecuta el script de despliegue.

### Recomendaciones:
- No subas la carpeta `dist/` ni `node_modules/` al repo (ya está en `.gitignore`).
- Si necesitas personalizar el deploy, edita los scripts según tu entorno.
#   a i t h m - n e x t 
 
 