// Este componente es la barra lateral del panel de administración.
// Permite navegar entre las distintas vistas: crear curso, métricas, configuraciones, notificaciones, mensajes y ayuda.
// Usa estado local para saber qué menú está activo y sombrearlo (SPA pura).
// Este menú permite al instructor ver las imágenes que suben los alumnos, calificarlas y dejar retroalimentación.

import { useState } from "react";
import {
  BookPlus,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  MessageCircle,
  HelpCircle,
  FileImage,
} from "lucide-react";

export default function SidebarLayout({ setView }) {
  // Usuario de prueba por defecto
  const [user] = useState({
    name: "Carlos",
    lastName: "García",
    role: "student", // Cambiar entre "student", "tutor" o "admin" para probar
    loggedIn: true,
  });

  // Menú activo
  const [activeMenu, setActiveMenu] = useState(null);

  // Cambiar menú activo y vista principal
  const handleClick = (view) => {
    setActiveMenu(view);
    setView(view);
  };

  // Clases dinámicas para cada item
  const menuItemClasses = (view) =>
    `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
      activeMenu === view ? "bg-gray-200" : "hover:bg-gray-100"
    }`;

  // Menús según rol
  const getMenuItems = (role) => {
    const baseItems = [
      { view: "metrics", label: "Métricas", icon: <BarChart2 className="w-5 h-5 text-gray-700" /> },
      { view: "settings", label: "Configuraciones", icon: <Settings className="w-5 h-5 text-gray-700" /> },
      { view: "notifications", label: "Notificaciones", icon: <Bell className="w-5 h-5 text-gray-700" /> },
      { view: "messages", label: "Mensajes", icon: <MessageCircle className="w-5 h-5 text-gray-700" /> },
      { view: "help", label: "Guía de uso", icon: <HelpCircle className="w-5 h-5 text-gray-700" /> },
      { view: "evaluations", label: "Evaluaciones", icon: <FileImage className="w-5 h-5 text-gray-700" /> },
    ];

    if (role === "admin") {
      return [
        { view: "create", label: "Crear curso", icon: <BookPlus className="w-5 h-5 text-gray-700" /> },
        ...baseItems,
      ];
    }

    if (role === "tutor") {
      return baseItems;
    }

    if (role === "student") {
      // Filtrar lo que corresponde a un alumno (ejemplo: sin métricas ni crear curso)
      return baseItems.filter(
        (item) =>
          item.view === "notifications" ||
          item.view === "messages" ||
          item.view === "help" ||
          item.view === "evaluations"
      );
    }

    return [];
  };

  // Traducción de roles
  const roleInSpanish = {
    admin: "Administrador",
    tutor: "Tutor",
    student: "Estudiante",
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="text-center py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 tracking-widest">
            Lunea
          </h1>
          <p className="text-sm text-gray-500">Aprende lo que amas</p>
        </div>

        {/* Dynamic Menu */}
        <nav className="mt-6 space-y-2 px-4">
          {getMenuItems(user.role).map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(item.view)}
              className={menuItemClasses(item.view)}
            >
              {item.icon}
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </div>
          ))}

          {/* Logout */}
          <div
            onClick={() => alert("Cerrando sesión")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">
              Cerrar sesión
            </span>
          </div>
        </nav>
      </div>

      {/* Footer with user info */}
      <div className="flex items-center gap-3 p-4 border-t border-gray-200">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold">
          {user.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {user.name} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">{roleInSpanish[user.role]}</p>
        </div>
      </div>
    </aside>
  );
}
