import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Configuración de Multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Endpoint directo para productos
app.get('/api/products', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'data', 'productsData.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Error al leer productos:', error);
    res.status(500).json({ error: 'Error al cargar los productos' });
  }
});

// Endpoint directo para testimonios
app.get('/api/testimonials', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'data', 'testimonials.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const testimonials = JSON.parse(data);
    res.json(testimonials);
  } catch (error) {
    console.error('Error al leer testimonios:', error);
    res.status(500).json({ error: 'Error al cargar los testimonios' });
  }
});

// Rutas para archivos JSON
app.get('/api/data/files', (req, res) => {
  const dataDir = path.join(__dirname, 'src', 'data');
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el directorio' });
    }
    res.json(files.filter(file => file.endsWith('.json')));
  });
});

app.get('/api/data/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'data', req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/data/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'data', req.params.filename);
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al guardar el archivo' });
    }
    res.json({ message: 'Archivo guardado correctamente' });
  });
});

// Ruta para subir imágenes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Endpoint para listar imágenes en la carpeta public/img/all-img
app.get('/api/uploads', (req, res) => {
  const galleryDir = path.join(__dirname, 'public', 'img', 'all-img');
  fs.readdir(galleryDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer la carpeta de imágenes' });
    const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    res.json(images.map(img => `/img/all-img/${img}`));
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 