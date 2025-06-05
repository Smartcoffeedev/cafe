const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises;

// Variable global para mantener la referencia a la ventana
let mainWindow;

// Función para crear la ventana principal
function createWindow() {
  console.log('Creando ventana de Electron...');
  
  // Crear la ventana del navegador
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Deshabilitar integración de Node.js por seguridad
      contextIsolation: true, // Habilitar aislamiento de contexto
      preload: path.join(__dirname, 'preload.js'), // Cargar el script de precarga
      webSecurity: false // Solo para desarrollo
    }
  });

  // En desarrollo, cargar desde el servidor de Vite
  if (process.env.NODE_ENV === 'development') {
    console.log('Modo desarrollo: cargando desde Vite...');
    mainWindow.loadURL('http://localhost:5173/admin');
    // Abrir las herramientas de desarrollo
    mainWindow.webContents.openDevTools();
  } else {
    console.log('Modo producción: cargando archivo local...');
    // En producción, cargar el archivo HTML construido
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'), {
      hash: 'admin'
    });
  }

  // Manejar el cierre de la ventana
  mainWindow.on('closed', () => {
    console.log('Ventana cerrada');
    mainWindow = null;
  });

  // Verificar que la ventana se haya creado correctamente
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Ventana cargada correctamente');
    // Verificar que la API está disponible
    mainWindow.webContents.executeJavaScript(`
      console.log('Verificando API de Electron...');
      console.log('electronAPI disponible:', !!window.electronAPI);
      if (window.electronAPI) {
        console.log('Métodos disponibles:', Object.keys(window.electronAPI));
      }
    `);
  });

  // Manejar errores de carga
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Error al cargar la ventana:', errorDescription);
  });

  // Manejar errores de renderizado
  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.error('Error en el proceso de renderizado:', details);
  });

  // Manejar errores de precarga
  mainWindow.webContents.on('preload-error', (event, preloadPath, error) => {
    console.error('Error en el script de precarga:', error);
  });
}

// Crear la ventana cuando la aplicación esté lista
app.whenReady().then(() => {
  console.log('Aplicación Electron iniciada');
  createWindow();
});

// Salir cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
  console.log('Todas las ventanas cerradas');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('Aplicación activada');
  if (mainWindow === null) {
    createWindow();
  }
});

// Manejar las solicitudes IPC para leer archivos JSON
ipcMain.handle('read-json', async (event, filename) => {
  try {
    console.log('Intentando leer archivo:', filename);
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    console.log('Ruta completa:', filePath);
    
    // Verificar si el archivo existe
    try {
      await fs.access(filePath);
    } catch (err) {
      throw new Error(`El archivo ${filename} no existe`);
    }

    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
});

// Manejar las solicitudes IPC para guardar archivos JSON
ipcMain.handle('write-json', async (event, filename, data) => {
  try {
    console.log('Intentando escribir archivo:', filename);
    const filePath = path.join(__dirname, '..', 'src', 'data', filename);
    console.log('Ruta completa:', filePath);
    
    // Asegurarse de que el directorio existe
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
});

// Manejador para listar archivos en un directorio
ipcMain.handle('list-files', async (event, directory) => {
  try {
    console.log('Listando archivos en:', directory);
    const dirPath = path.join(__dirname, '..', directory);
    console.log('Ruta completa:', dirPath);
    
    // Verificar si el directorio existe
    try {
      await fs.access(dirPath);
    } catch (err) {
      throw new Error(`El directorio ${directory} no existe`);
    }

    const files = await fs.readdir(dirPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    console.log('Archivos JSON encontrados:', jsonFiles);
    return jsonFiles;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}); 