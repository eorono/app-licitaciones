import React from "react";
import RegisterForm from "../components/RegisterForm"; // Importamos el componente

function RegisterPage({ setUser }) {
  // Función que maneja el registro de usuario
  const handleSubmit = async (e, email, password, setError, setSuccess) => {
    e.preventDefault();

    // Realizar la petición POST al backend
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // parsear la respuesta

      if (response.ok) {
        // Si la respuesta es correcta, mostramos el éxito y guardamos el email
        localStorage.setItem("userEmail", email); // guardar el email del usuario
        setSuccess("Usuario registrado con éxito");
        setError(""); // limpiar cualquier error anterior
        setUser(email); // Establecer el email del usuario en el estado global
      } else {
        // Si hay un error, mostramos el mensaje del servidor
        setError(data.message);
        setSuccess(""); // limpiar mensaje de éxito
      }
    } catch (err) {
      // Si hay un error al realizar la petición
      setError("Hubo un problema al registrar al usuario.");
      setSuccess(""); // limpiar mensaje de éxito
    }
  };

  return (
    <div className="register-page">
      <RegisterForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default RegisterPage;
