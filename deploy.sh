#!/bin/bash

# =============================
# Script de despliegue SmartCoffee
# =============================

# Ruta al directorio público en Hostinger (ajústalo si cambia)
DESTINO="$HOME/public_html/SmartCoffee"

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Construir el proyecto
echo "🔧 Construyendo el proyecto..."
npm run build

# 3. Exportar la versión estática
echo "📤 Exportando el sitio estático..."
npm run export

# 4. Limpiar el destino (opcional, si quieres eliminar la versión anterior)
echo "🧹 Limpiando el directorio de destino..."
rm -rf "$DESTINO"/*

# 5. Copiar archivos exportados al destino final
echo "📁 Copiando archivos a $DESTINO ..."
cp -r out/* "$DESTINO"

# 6. Permisos (solo se necesita la primera vez)
# echo "✅ Otorgando permisos de ejecución al script (si es necesario)..."
# chmod +x "$0"

echo "🚀 ¡Despliegue completado con éxito!" 