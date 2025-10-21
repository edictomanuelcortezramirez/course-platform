import { useState } from "react";
import {
  BookOpen,
  GraduationCap,
  BarChart2,
  Settings,
  FileImage,
  Users,
  ClipboardList,
  HelpCircle,
  MessageCircle,
  BookPlus,
  Shield,
  LogOut,
} from "lucide-react";

export default function SidebarLayout({ setView, role }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleClick = (view) => {
    setActiveMenu(view);
    setView(view);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getMenuItems = (role) => {
    if (role === "student") {
      return [
        { view: "dashboard", label: "Dashboard", icon: <GraduationCap /> },
        { view: "my-courses", label: "Mis cursos", icon: <BookOpen /> },
        { view: "progress", label: "Progreso", icon: <BarChart2 /> },
        { view: "evaluations", label: "Evaluaciones", icon: <ClipboardList /> },
        { view: "certificates", label: "Certificados", icon: <FileImage /> },
        { view: "messages", label: "Mensajes", icon: <MessageCircle /> },
        { view: "support", label: "Soporte", icon: <HelpCircle /> },
      ];
    }

    if (role === "tutor") {
      return [
        { view: "dashboard", label: "Dashboard", icon: <GraduationCap /> },
        { view: "tutorcourses", label: "Mis cursos", icon: <BookOpen /> },
        { view: "createcourse", label: "Crear curso", icon: <BookPlus /> },
        { view: "upload-lessons", label: "Subir lecciones", icon: <FileImage /> },
        { view: "studentReviews", label: "Evaluaciones de alumnos", icon: <ClipboardList /> },
        { view: "messages", label: "Mensajes", icon: <MessageCircle /> },
        { view: "settings", label: "Configuración", icon: <Settings /> },
      ];
    }

    if (role === "admin") {
      return [
        { view: "dashboard", label: "Dashboard", icon: <Shield /> },
        { view: "user-management", label: "Gestión de usuarios", icon: <Users /> },
        { view: "course-management", label: "Gestión de cursos", icon: <BookOpen /> },
        { view: "reports", label: "Reportes y métricas", icon: <BarChart2 /> },
        { view: "system-settings", label: "Configuración del sistema", icon: <Settings /> },
        { view: "support-requests", label: "Solicitudes de soporte", icon: <HelpCircle /> },
        { view: "role-permissions", label: "Roles y permisos", icon: <Shield /> },
      ];
    }

    return [];
  };

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col justify-between h-full">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="text-2xl font-bold text-gray-800 text-star">Lunéa</div>
      </div>
      <nav className="mt-6 space-y-2 px-4 flex-1">
        {getMenuItems(role).map((item) => (
          <div
            key={item.view}
            onClick={() => handleClick(item.view)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
              activeMenu === item.view ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
