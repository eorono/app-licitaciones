// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json()); // Para manejar JSON en el cuerpo de las peticiones

// Configuración de la conexión a la base de datos
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

// Registro de usuario (POST)
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Comprobamos si el usuario ya existe
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al consultar la base de datos" });
      }
      if (result.length > 0) {
        return res
          .status(400)
          .json({ message: "El correo ya está registrado" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario
      db.query(
        "INSERT INTO usuarios (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al crear el usuario" });
          }
          return res
            .status(200)
            .json({ message: "Usuario registrado con éxito" });
        }
      );
    }
  );
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
