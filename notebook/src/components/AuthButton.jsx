import React from "react";

function AuthButton({ userEmail, handleLogout, handleRegisterClick }) {
  return (
    <div className="auth-button">
      {userEmail ? (
        <>
          <span>{userEmail}</span> {/* Mostrar el correo del usuario */}
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={handleRegisterClick}>Registrarse</button>
      )}
    </div>
  );
}
    
export default AuthButton;
