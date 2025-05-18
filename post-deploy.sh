#!/bin/bash

echo "Navegando al directorio del proyecto..."
cd /home/u909854622/public_html || { echo "No se pudo acceder al directorio del proyecto"; exit 1; }

echo "Dando permisos de ejecución a deploy.sh..."
chmod +x deploy.sh

echo "Ejecutando deploy.sh..."
./deploy.sh

echo "\nPost-deploy completado."
