// Este componente es el panel de administración.
// Permite navegar entre diferentes vistas: bienvenida, crear curso, métricas y ajustes.
// Estamos usando estado local (SPA pura) para cambiar la vista sin recargar la página.

import { useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import CreateCourse from "../../views/CreateCourse";
import Metrics from "../../views/Metrics";
import Settings from "../../views/Settings";
import EvaluationsPanel from "../../views/EvaluationsPanel";

export default function PanelAdmin() {
  // Guardamos la vista actual del panel
  const [view, setView] = useState("welcome");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Barra lateral que cambia la vista */}
      <SideBarAdmin setView={setView} />

      {/* Contenido principal según la vista */}
      <main className="flex-1 p-8 overflow-y-auto">
        {view === "welcome" && (
          <>
            {/* Vista de bienvenida */}
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Gorjelis
            </h1>
            <p className="mt-2 text-gray-600">
              ¿Estás lista para comenzar a crear contenido?
            </p>
          </>
        )}
        {view === "create" && <CreateCourse />} {/* Vista para crear curso */}
        {view === "metrics" && <Metrics />} {/* Vista de métricas */}
        {view === "settings" && <Settings />} {/* Vista de ajustes */}
        {view === "evaluations" && <EvaluationsPanel />} {/* Vista de eveluaciones */}
      </main>
    </div>
  );
}
