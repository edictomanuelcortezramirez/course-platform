// Este componente es la barra lateral del panel de administración.
// Permite navegar entre las distintas vistas: crear curso, métricas, configuraciones, notificaciones, mensajes y ayuda.
// Usa estado local para saber qué menú está activo y sombrearlo (SPA pura).

import { useState } from "react";
import {
  BookPlus,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

export default function SideBarAdmin({ setView }) {
  // Qué menú está activo (ninguno al inicio)
  const [activeMenu, setActiveMenu] = useState(null); 

  // Cambiar menú activo y vista principal
  const handleClick = (view) => {
    setActiveMenu(view);
    setView(view);
  };

  // Clases para cada menú, sombreado si está activo
  const menuItemClasses = (view) =>
    `flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
      activeMenu === view ? "bg-gray-200" : "hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Sección superior */}
      <div>
        <div className="text-center py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 tracking-widest">
            Lunea
          </h1>
          <p className="text-sm text-gray-500">Aprende lo que amas</p>
        </div>

        {/* Menú principal */}
        <nav className="mt-6 space-y-2 px-4">
          {/* Crear curso */}
          <div onClick={() => handleClick("create")} className={menuItemClasses("create")}>
            <BookPlus className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Crear curso</span>
          </div>

          {/* Métricas */}
          <div onClick={() => handleClick("metrics")} className={menuItemClasses("metrics")}>
            <BarChart2 className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Métricas</span>
          </div>

          {/* Configuraciones */}
          <div onClick={() => handleClick("settings")} className={menuItemClasses("settings")}>
            <Settings className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Configuraciones</span>
          </div>

          {/* Notificaciones */}
          <div onClick={() => handleClick("notifications")} className={menuItemClasses("notifications")}>
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Notificaciones</span>
          </div>

          {/* Mensajes */}
          <div onClick={() => handleClick("messages")} className={menuItemClasses("messages")}>
            <MessageCircle className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Mensajes</span>
          </div>

          {/* Guía de uso */}
          <div onClick={() => handleClick("help")} className={menuItemClasses("help")}>
            <HelpCircle className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Guía de uso</span>
          </div>

          {/* Cerrar sesión */}
          <div
            onClick={() => alert("Cerrando sesión")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Cerrar sesión</span>
          </div>
        </nav>
      </div>

      {/* Sección inferior con usuario */}
      <div className="flex items-center gap-3 p-4 border-t border-gray-200">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold">
          G
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Gorjelis Garcia</p>
          <p className="text-xs text-gray-500">Administrador</p>
        </div>
      </div>
    </aside>
  );
}
