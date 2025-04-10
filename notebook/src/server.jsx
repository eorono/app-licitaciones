// server.js

// Importar dependencias necesarias
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

// Inicializar la aplicación Express
const app = express();

// Configurar el uso de CORS y para parsear JSON en el body de las peticiones
app.use(cors());
app.use(express.json());

// Configurar la conexión a la base de datos MySQL  
// NOTA: Para producción, se recomienda no dejar las credenciales hardcodeadas y usar variables de entorno.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "David2003", // Cambia la contraseña por un valor seguro
  database: "notebook_db",
});

// Conectar a MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

/*
  ========================
  Registro de usuario (POST /register)
  ========================
*/
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  
  // Verificar si el usuario ya existe
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Error al consultar la base de datos" });
    if (result.length > 0) return res.status(400).json({ message: "El correo ya está registrado" });
    
    // Encriptar la contraseña usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insertar el nuevo usuario en la tabla "usuarios"
    db.query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al crear el usuario" });
      return res.status(200).json({ message: "Usuario registrado con éxito" });
    });
  });
});

/*
  ========================
  Inicio de sesión (POST /login)
  ========================
*/
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  // Buscar el usuario por email
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Error al consultar la base de datos" });
    if (result.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });
    
    const user = result[0];
    // Comparar la contraseña encriptada con la ingresada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
    
    // Si todo es correcto, enviar mensaje de éxito
    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  });
});

/*
  ========================
  Gestión de libros (cuadernos)
  ========================
*/

/**
 * GET /books - Obtiene todos los libros del usuario, usando el correo como parámetro.
 */
app.get("/books", (req, res) => {
  const email = req.query.email; // Ej: /books?email=usuario@ejemplo.com
  
  if (!email) return res.status(400).json({ message: "No se proporcionó el correo del usuario" });
  
  // Buscar el id del usuario a partir del email
  db.query("SELECT id FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al consultar la base de datos" });
    if (result.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });
    
    const userId = result[0].id;
    
    // Consultar los libros asociados al usuario
    db.query("SELECT id, titulo FROM libros WHERE user_id = ?", [userId], (err, books) => {
      if (err) return res.status(500).json({ message: "Error al obtener los libros" });
      return res.status(200).json({ books });
    });
  });
});

/**
 * POST /books - Crea un nuevo libro para el usuario logueado.
 * Se espera que el cuerpo incluya el correo del usuario.
 */
app.post("/books", async (req, res) => {
  const { email } = req.body;
  
  if (!email) return res.status(400).json({ message: "No se proporcionó el correo del usuario" });
  
  // Obtener el id del usuario
  db.query("SELECT id FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al consultar la base de datos" });
    if (result.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });
    
    const userId = result[0].id;
    const title = "Untitled notebook"; // Título por defecto
    
    // Insertar el nuevo libro
    db.query("INSERT INTO libros (titulo, user_id) VALUES (?, ?)", [title, userId], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al crear el libro" });
      return res.status(200).json({ message: "Libro creado con éxito", bookId: result.insertId });
    });
  });
});

/**
 * DELETE /books/:id - Elimina un libro dado su id.
 */
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  
  db.query("DELETE FROM libros WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al eliminar el libro" });
    if (result.affectedRows === 0) return res.status(400).json({ message: "No se encontró el libro" });
    return res.status(200).json({ message: "Libro eliminado con éxito" });
  });
});

/**
 * PUT /books/:id - Renombra un libro dado su id.
 * Se espera que el body contenga el nuevo título.
 */
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  if (!title) return res.status(400).json({ message: "No se proporcionó un título" });
  
  db.query("UPDATE libros SET titulo = ? WHERE id = ?", [title, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al renombrar el libro" });
    if (result.affectedRows === 0) return res.status(400).json({ message: "No se encontró el libro" });
    return res.status(200).json({ message: "Libro renombrado con éxito" });
  });
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
