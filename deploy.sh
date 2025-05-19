#!/bin/bash

# =============================
# Script de despliegue SmartCoffee
# =============================

# Configuración
DESTINO="/home/u909854622/public_html"
DIST_DIR="dist"

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar mensajes de error y salir
error_exit() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error_exit "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
fi

echo -e "${GREEN}📦 Instalando dependencias...${NC}"
npm install || error_exit "Error al instalar dependencias"
npm install swiper || error_exit "Error al instalar swiper"

echo -e "${GREEN}🔧 Construyendo el proyecto con Vite...${NC}"
npm run build || error_exit "Error al construir el proyecto"

# Verificar que la carpeta dist existe
if [ ! -d "$DIST_DIR" ]; then
    error_exit "No se encontró la carpeta $DIST_DIR. La construcción falló."
fi

echo -e "${GREEN}🧹 Limpiando el directorio de destino...${NC}"
rm -rf "$DESTINO"/* || error_exit "Error al limpiar el directorio de destino"

echo -e "${GREEN}📁 Copiando archivos a $DESTINO ...${NC}"
cp -r "$DIST_DIR"/* "$DESTINO" || error_exit "Error al copiar archivos"

echo -e "${GREEN}✅ Otorgando permisos de ejecución al script...${NC}"
chmod +x "$0" || error_exit "Error al otorgar permisos"

echo -e "${GREEN}🚀 ¡Despliegue completado con éxito!${NC}"
echo -e "${GREEN}📂 Los archivos se han copiado a: $DESTINO${NC}"
