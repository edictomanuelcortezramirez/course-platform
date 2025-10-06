"use client";
import React, { useState, useEffect } from "react";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import { User, GraduationCap, Briefcase, Shield } from "lucide-react";
import Link from "next/link";

const NavbarLayout = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
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
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Mis cursos", href: "/student/courses" },
          { label: "Certificaciones", href: "/student/certificates" },
          { label: "Perfil", href: "/account/profile" },
        ];
      case "tutor":
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Cursos que dicto", href: "/tutor/courses" },
          { label: "Subir lecciones", href: "/tutor/upload" },
          { label: "Mensajes", href: "/tutor/messages" },
        ];
      case "admin":
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Gestión de usuarios", href: "/admin/users" },
          { label: "Gestión de cursos", href: "/admin/courses" },
          { label: "Reportes", href: "/admin/reports" },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="grid grid-cols-3 items-center px-6 py-4 bg-gray-50 relative">
      <div className="text-2xl font-bold text-gray-800">Lunéa</div>

      <div className="flex justify-center space-x-6 text-sm font-medium text-gray-600">
        <a href="#cursos" className="hover:text-gray-900">Cursos</a>
        <a href="#compras" className="hover:text-gray-900">Compras</a>
        <a href="#faq" className="hover:text-gray-900">FAQ</a>
        <a href="#contacto" className="hover:text-gray-900">Contacto</a>
      </div>

      <div className="flex justify-end space-x-4 relative">
        {!user && <RegisterButton />}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center bg-black text-white px-4 py-2 rounded"
            >
              {getRoleIcon(user.role)}
              {user.name}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                {getMenuItems(user.role).map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
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
