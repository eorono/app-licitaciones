// server.js
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
  password: "David2003",
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
      (err) => {
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

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
