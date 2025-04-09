// src/pages/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm"; // Importamos el componente

function RegisterPage({ setUser }) {
  const navigate = useNavigate();

  // Función que maneja el registro de usuario
  const handleSubmit = async (e, email, password, setError, setSuccess) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso: se guarda el email, se actualiza el estado y se redirige a la pantalla principal.
        localStorage.setItem("userEmail", email);
        setSuccess("Usuario registrado con éxito");
        setError("");
        setUser(email);
        navigate("/"); // Redirige automáticamente a la pantalla principal
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      setError("Hubo un problema al registrar al usuario.");
      setSuccess("");
    }
  };

  return (
    <div className="register-page">
      <RegisterForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default RegisterPage;
