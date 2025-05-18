#!/bin/bash

# =============================
# Script de despliegue SmartCoffee
# =============================

DESTINO="/home/u909854622/public_html"

echo "📦 Instalando dependencias..."
npm install

echo "🔧 Construyendo el proyecto..."
npm run build

echo "📤 Exportando el sitio estático..."
npm run export

echo "🧹 Limpiando el directorio de destino..."
rm -rf "$DESTINO"/*

echo "📁 Copiando archivos a $DESTINO ..."
cp -r out/* "$DESTINO"

echo "✅ Otorgando permisos de ejecución al script..."
chmod +x "$0"

echo "🚀 ¡Despliegue completado con éxito!"
