const { contextBridge, ipcRenderer } = require('electron');

console.log('Script de precarga iniciado');

// Exponer APIs seguras al proceso de renderizado
contextBridge.exposeInMainWorld('electronAPI', {
  // Función para leer archivos JSON
  readJson: async (filename) => {
    console.log('Llamada a readJson:', filename);
    try {
      const result = await ipcRenderer.invoke('read-json', filename);
      console.log('Resultado de readJson:', result);
      return result;
    } catch (error) {
      console.error('Error en readJson:', error);
      throw error;
    }
  },

  // Función para guardar archivos JSON
  writeJson: async (filename, data) => {
    console.log('Llamada a writeJson:', filename);
    try {
      const result = await ipcRenderer.invoke('write-json', filename, data);
      console.log('Resultado de writeJson:', result);
      return result;
    } catch (error) {
      console.error('Error en writeJson:', error);
      throw error;
    }
  },

  // Listar archivos en un directorio
  listFiles: async (directory) => {
    console.log('Llamada a listFiles:', directory);
    try {
      const result = await ipcRenderer.invoke('list-files', directory);
      console.log('Resultado de listFiles:', result);
      return result;
    } catch (error) {
      console.error('Error en listFiles:', error);
      throw error;
    }
  }
});

console.log('API de Electron expuesta al proceso de renderizado'); 