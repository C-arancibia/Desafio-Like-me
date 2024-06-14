import express from 'express';
import { addPost, getPosts, updateLikes } from './queries.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Para manejar solicitudes JSON
app.use(express.static(path.join(__dirname, '../public'))); // Para servir archivos estáticos

app.post('/post', async (req, res) => {
    console.log('Recibida solicitud POST a /post');
    const { usuario, url, descripcion } = req.body;
    console.log('Datos recibidos:', usuario, url, descripcion);
    
    try {
        const newPost = await addPost(usuario, url, descripcion);
        console.log('Nuevo post creado:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error al crear el post:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts', async (req, res) => {
    console.log('Recibida solicitud GET a /posts');
    
    try {
        const posts = await getPosts();
        console.log('Posts obtenidos:', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.put('/post', async (req, res) => {
    console.log('Recibida solicitud PUT a /post');
    const { id } = req.query;
    console.log('ID del post a actualizar:', id);
    
    try {
        const updatedPost = await updateLikes(id);
        console.log('Post actualizado:', updatedPost);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error al actualizar los likes del post:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


