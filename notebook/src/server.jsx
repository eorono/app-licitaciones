const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "David2003", // Cambia la contraseña si es necesario
  database: "notebook_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

// REGISTRO
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    db.query(
      "INSERT INTO usuarios (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error al crear el usuario" });
        }
        return res.status(200).json({ message: "Usuario registrado con éxito" });
      }
    );
  });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = result[0];
    // Verificar la contraseña con bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  });
});

// GET /books - Obtener todos los libros de un usuario (por email)
app.get("/books", (req, res) => {
  const email = req.query.email; // Ejemplo: /books?email=usuario@ejemplo.com

  if (!email) {
    return res.status(400).json({ message: "No se proporcionó el correo del usuario" });
  }

  // Buscar el id del usuario por email
  db.query("SELECT id FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const userId = result[0].id;

    // Obtener libros del usuario
    db.query("SELECT id, titulo FROM libros WHERE user_id = ?", [userId], (err, books) => {
      if (err) {
        return res.status(500).json({ message: "Error al obtener los libros" });
      }
      return res.status(200).json({ books });
    });
  });
});

// POST /books - Crear un nuevo libro para el usuario logueado
app.post("/books", async (req, res) => {
  const { email } = req.body; // Se envía el correo del usuario

  if (!email) {
    return res.status(400).json({ message: "No se proporcionó el correo del usuario" });
  }

  // Buscar el id del usuario a partir del email
  db.query("SELECT id FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al consultar la base de datos" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const userId = result[0].id;
    const title = "Untitled notebook";

    // Insertar el nuevo libro
    db.query(
      "INSERT INTO libros (titulo, user_id) VALUES (?, ?)",
      [title, userId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error al crear el libro" });
        }
        return res.status(200).json({ message: "Libro creado con éxito", bookId: result.insertId });
      }
    );
  });
});

// DELETE /books/:id - Eliminar un libro
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM libros WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el libro" });
    }
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se encontró el libro" });
    }
    return res.status(200).json({ message: "Libro eliminado con éxito" });
  });
});

// PUT /books/:id - Renombrar un libro
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "No se proporcionó un título" });
  }

  db.query(
    "UPDATE libros SET titulo = ? WHERE id = ?",
    [title, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al renombrar el libro" });
      }
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "No se encontró el libro" });
      }
      return res.status(200).json({ message: "Libro renombrado con éxito" });
    }
  );
});

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
