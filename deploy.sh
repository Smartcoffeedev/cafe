#!/bin/bash

# =============================
# Script de despliegue SmartCoffee
# =============================
# Este script instala dependencias, construye el proyecto,
# exporta la versión estática y copia los archivos al servidor web.
# =============================

# 1. Instalar dependencias
# ------------------------
echo "Instalando dependencias..."
npm install

# 2. Construir el proyecto
# ------------------------
echo "Construyendo el proyecto..."
npm run build

# 3. Exportar la versión estática
# -------------------------------
echo "Exportando la versión estática..."
npm run export

# 4. Copiar archivos al directorio público
# ----------------------------------------
echo "Copiando archivos al directorio /home/usuario/public_html/ ..."
cp -r out/* /home/usuario/public_html/

# 5. Dar permisos de ejecución al script (opcional, solo la primera vez)
# ----------------------------------------------------------------------
echo "Dando permisos de ejecución al script..."
chmod +x "$0"

echo "\n¡Despliegue completado con éxito!" 