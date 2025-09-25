// Este componente define la barra de navegación principal de la aplicación.
// cada tipo de usuario (invitado, estudiante, tutor o admin) necesita ver
// un menú diferente y tener accesos a distintas secciones. De esta forma, el
// navbar cambia dinámicamente según el rol del usuario.
// Muestra el nombre de la marca en la izquierda.
// En el centro muestra accesos comunes (Cursos, Compras, FAQ, Contacto).
//  A la derecha:
// Si no hay usuario: muestra los botones de "Registrarse" y "Iniciar sesión".
//  Si hay usuario: muestra su nombre junto con un ícono de su rol y al hacer
//  click despliega un menú con opciones específicas para ese rol.
// Permite simular login/logout y visualizar cómo cambiaría el navbar.

"use client";
import React, { useState, useEffect } from "react";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import { User, GraduationCap, Briefcase, Shield } from "lucide-react";

const NavbarLayout = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // limpiar storage
    localStorage.removeItem("user"); 
    setUser(null);
    setIsOpen(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <GraduationCap className="w-4 h-4 mr-2" />;
      case "tutor":
        return <Briefcase className="w-4 h-4 mr-2" />;
      case "admin":
        return <Shield className="w-4 h-4 mr-2" />;
      default:
        return <User className="w-4 h-4 mr-2" />;
    }
  };

  const getMenuItems = (role) => {
    switch (role) {
      case "student":
        return ["Mis cursos", "Certificaciones", "Perfil"];
      case "tutor":
        return ["Cursos que dicto", "Subir lecciones", "Mensajes"];
      case "admin":
        return ["Dashboard", "Gestión de usuarios", "Gestión de cursos", "Reportes"];
      default:
        return [];
    }
  };

  return (
    <nav className="grid grid-cols-3 items-center px-6 py-4 bg-gray-50 relative">
      {/* Marca */}
      <div className="text-2xl font-bold text-gray-800">Lunéa</div>

      {/* Centro: enlaces comunes */}
      <div className="flex justify-center space-x-6 text-sm font-medium text-gray-600">
        <a href="#cursos" className="hover:text-gray-900">Cursos</a>
        <a href="#compras" className="hover:text-gray-900">Compras</a>
        <a href="#faq" className="hover:text-gray-900">FAQ</a>
        <a href="#contacto" className="hover:text-gray-900">Contacto</a>
      </div>

      {/* Derecha */}
      <div className="flex justify-end space-x-4 relative">
        {!user && <RegisterButton />}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center bg-black text-white px-4 py-2 rounded"
            >
              {getRoleIcon(user.role)}
              {/* aparece el nombre */}
              {user.name} 
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                {getMenuItems(user.role).map((item, idx) => (
                  <button
                    key={idx}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};

export default NavbarLayout;
