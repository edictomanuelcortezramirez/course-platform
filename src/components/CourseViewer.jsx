"use client";
import React, { useState } from "react";
import { PlayCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function CourseViewer() {
  // Datos simulados del curso
  const course = {
    title: "Introducción a la Programación con JavaScript",
    instructor: "María González",
    description:
      "Aprende los fundamentos de la programación moderna con JavaScript. Desde las bases hasta conceptos avanzados aplicados en proyectos reales.",
    videoUrl: "https://www.youtube.com/embed/hdI2bqOjy3c",
    modules: [
      {
        title: "Módulo 1: Fundamentos",
        sections: ["Qué es la programación", "Variables y tipos de datos", "Operadores básicos"],
      },
      {
        title: "Módulo 2: Funciones y lógica",
        sections: ["Definir funciones", "Condicionales", "Bucles y estructuras repetitivas"],
      },
      {
        title: "Módulo 3: Proyecto final",
        sections: ["Diseño del proyecto", "Implementación", "Prueba final"],
      },
    ],
  };

  const [openModules, setOpenModules] = useState([]);

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Área principal izquierda */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
        {/* Reproductor */}
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <iframe
            width="100%"
            height="100%"
            src={course.videoUrl}
            title={course.title}
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>

        {/* Descripción del curso */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Instructor: {course.instructor}</p>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>
      </div>

      {/* Panel derecho: módulos */}
      <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-sky-600" />
          Contenido del curso
        </h2>

        <div className="space-y-4">
          {course.modules.map((mod, idx) => {
            const isOpen = openModules.includes(idx);
            return (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleModule(idx)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
                >
                  <span className="font-medium text-gray-800">{mod.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 py-2 bg-white space-y-2">
                    {mod.sections.map((section, sIdx) => (
                      <div
                        key={sIdx}
                        className="text-sm text-gray-700 border-l-2 border-sky-500 pl-3 hover:text-sky-600 cursor-pointer transition"
                      >
                        {section}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
