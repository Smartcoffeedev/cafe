#!/bin/bash

# =============================
# Script de despliegue SmartCoffee
# =============================
# Instala dependencias, construye, exporta y copia al public_html raíz
# =============================

# Ruta al directorio público raíz en Hostinger
DESTINO="/home/$USER/public_html"

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Construir el proyecto
echo "🔧 Construyendo el proyecto..."
npm run build

# 3. Exportar el sitio estático
echo "📤 Exportando el sitio estático..."
npm run export

# 4. Limpiar el destino (opcional)
echo "🧹 Limpiando el directorio de destino..."
rm -rf "$DESTINO"/*

# 5. Copiar los archivos exportados a public_html
echo "📁 Copiando archivos a $DESTINO ..."
cp -r out/* "$DESTINO"

# 6. Dar permisos al script (solo la primera vez)
echo "✅ Otorgando permisos de ejecución al script..."
chmod +x "$0"

echo "🚀 ¡Despliegue completado con éxito!" 