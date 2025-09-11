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
import React, { useState } from "react";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import { User, GraduationCap, Briefcase, Shield } from "lucide-react";

const NavbarLayout = () => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el menú del usuario

  // Simulación de login (en un proyecto real vendría de la autenticación)
  const handleLogin = () => {
    setUser({ name: "Carlos", role: "admin", loggedIn: true });
  };

  // Cierra sesión y oculta menú
  const handleLogout = () => {
    setUser(null);
    setIsOpen(false);
  };

  // Devuelve un ícono distinto según el rol del usuario
  const getRoleIcon = (role) => {
    switch (role) {
      case "guest":
        return <User className="w-4 h-4 mr-2" />;
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

  // Opciones de menú según el rol del usuario
  const getMenuItems = (role) => {
    switch (role) {
      case "guest":
        return ["Explorar cursos", "Registrarse", "Ayuda / Soporte"];
      case "student":
        return [
          "Mis cursos",
          "Progreso y certificaciones",
          "Mis comentarios / retroalimentación",
          "Perfil y configuración",
          "Ayuda / Soporte",
        ];
      case "tutor":
        return [
          "Cursos que dicto",
          "Subir/editar lecciones",
          "Calificar tareas / retroalimentación",
          "Mensajes de alumnos",
          "Estadísticas de mis cursos",
        ];
      case "admin":
        return [
          "Dashboard general (estadísticas de la plataforma)",
          "Gestión de usuarios (alumnos, tutores, admins)",
          "Gestión de cursos (crear, editar, eliminar)",
          "Control de pagos / facturación",
          "Reportes y analíticas",
          "Configuración de la plataforma",
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="grid grid-cols-3 items-center px-6 py-4 bg-gray-50 relative">
      {/* Izquierda: Marca */}
      <div className="text-2xl font-bold text-gray-800">Lunéa</div>

      {/* Centro: Menús comunes */}
      <div className="flex justify-center">
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#cursos" className="hover:text-gray-900 transition">
            Cursos
          </a>
          <a href="#compras" className="hover:text-gray-900 transition">
            Compras
          </a>
          <a href="#faq" className="hover:text-gray-900 transition">
            Preguntas frecuentes
          </a>
          <a href="#contacto" className="hover:text-gray-900 transition">
            Contacto
          </a>
        </div>
      </div>

      {/* Derecha: dependiendo del estado del usuario */}
      <div className="flex justify-end space-x-4 relative">
        {/* Si NO hay usuario: mostrar botones */}
        {!user && <RegisterButton />}
        {user ? (
          <div className="relative">
            {/* Botón con nombre e ícono del rol */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center bg-black text-white px-4 py-2 rounded"
            >
              {getRoleIcon(user.role)}
              {user.name}
            </button>

            {/* Menú desplegable del usuario */}
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
                {/* Línea divisoria */}
                <div className="border-t my-1"></div>
                {/* Botón cerrar sesión */}
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
          // Si no hay usuario: botón iniciar sesión
          <LoginButton onClick={handleLogin} />
        )}
      </div>
    </nav>
  );
};

export default NavbarLayout;