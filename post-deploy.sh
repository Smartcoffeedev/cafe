#!/bin/bash

# =============================
# Hook post-deploy para Hostinger
# =============================
# Este script navega al directorio del proyecto,
# da permisos de ejecución a deploy.sh y lo ejecuta.
# =============================

# 1. Navegar al directorio del proyecto
# -------------------------------------
echo "Navegando al directorio del proyecto..."
cd ~/public_html/SmartCoffee || { echo "No se pudo acceder al directorio del proyecto"; exit 1; }

# 2. Dar permisos de ejecución a deploy.sh
# ----------------------------------------
echo "Dando permisos de ejecución a deploy.sh..."
chmod +x deploy.sh

# 3. Ejecutar deploy.sh
# ---------------------
echo "Ejecutando deploy.sh..."
./deploy.sh

echo "\nPost-deploy completado."

# =============================
# ¿Cómo configurarlo en Hostinger?
# =============================
# 1. Sube este archivo (post-deploy.sh) a la raíz de tu proyecto o donde Hostinger lo requiera.
# 2. En el panel de Hostinger, ve a la sección de Git y configura este script como hook post-deploy.
#    Normalmente puedes poner la ruta completa al script en la opción de "Post-Deploy Script".
# 3. Asegúrate de que tu usuario tenga permisos de ejecución sobre el script y sobre deploy.sh.
# 4. Cada vez que hagas un push a GitHub, Hostinger ejecutará este script automáticamente. 