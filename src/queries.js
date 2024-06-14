// src/queries.js

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Configurar conexión a la base de datos
const pool = new Pool({
user: process.env.DB_USER,
password: process.env.DB_PASS,
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
port: process.env.DB_PORT,
});

// Función para añadir un nuevo post
export async function addPost(usuario, url, descripcion) {
  const query = 'INSERT INTO posts (usuario, url, descripcion) VALUES ($1, $2, $3) RETURNING *';
const values = [usuario, url, descripcion];
const client = await pool.connect();
try {
    const result = await client.query(query, values);
    return result.rows[0];
} finally {
    client.release();
}
}

// Función para obtener todos los posts
export async function getPosts() {
  const query = 'SELECT * FROM posts';
const client = await pool.connect();
try {
    const result = await client.query(query);
    return result.rows;
} finally {
    client.release();
}
}

// Función para actualizar los likes 

