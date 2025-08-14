// Este componente sirve para crear un curso con sus características, módulos y secciones.
// Podemos agregar módulos (máximo 3 por fila) y dentro de cada módulo agregar varias secciones.
// También permite subir videos y documentos para cada sección.
// Los botones nos permiten agregar o eliminar módulos y secciones de forma dinámica.

import { useState } from "react";
import { Video, FileText, PlusCircle, HelpCircle, X } from "lucide-react";

export default function CreateCourse() {
  // Guardamos todos los módulos del curso en un array (por defecto empieza con 1 módulo vacío)
  const [modules, setModules] = useState([
    {
      id: 1,
      name: "",
      sections: [{ id: 1, name: "", video: null, documents: null }],
    },
  ]);

  // Función para agregar un nuevo módulo
  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(), // Generamos un id único para cada módulo
        name: "",
        sections: [{ id: 1, name: "", video: null, documents: null }],
      },
    ]);
  };

  // Función para eliminar un módulo según su id
  const removeModule = (moduleId) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  // Función para agregar una sección dentro de un módulo específico
  const addSection = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections.push({
      id: Date.now(), // Generamos un id único para la sección
      name: "",
      video: null,
      documents: null,
    });
    setModules(updatedModules);
  };

  // Función para eliminar una sección dentro de un módulo específico
  const removeSection = (moduleIndex, sectionId) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections = updatedModules[
      moduleIndex
    ].sections.filter((s) => s.id !== sectionId);
    setModules(updatedModules);
  };

  // Función para actualizar el nombre, video o documento de una sección
  const handleSectionChange = (moduleIndex, sectionIndex, field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections[sectionIndex][field] = value;
    setModules(updatedModules);
  };

  return (
    <div>
      {/* Título principal y descripción */}
      <h2 className="text-xl font-bold text-gray-800">Crear Curso</h2>
      <p className="mt-2 text-gray-600 flex items-center gap-1">
        Aquí podrás agregar un nuevo curso y sus lecciones. Consulta nuestra
        <HelpCircle className="w-5 h-5 text-gray-700 inline-block" />
        <span className="text-sm font-medium text-gray-700">Guía de uso</span>
      </p>

      {/* Bloque con las características generales del curso */}
      <div className="mt-6 p-6 bg-white rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Características del Curso
        </h3>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campos básicos del curso */}
          <div className="flex flex-col">
            <label htmlFor="courseName" className="text-sm font-medium text-gray-600">
              Nombre del curso
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Nombre del curso"
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="shortDescription" className="text-sm font-medium text-gray-600">
              Descripción (max 8 palabras)
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              placeholder="Descripción breve"
              className="mt-1 p-2 border border-gray-300 rounded"
              maxLength={50}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="longDescription" className="text-sm font-medium text-gray-600">
              Descripción larga
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              placeholder="Describe el curso en detalle..."
              className="mt-1 p-2 border border-gray-300 rounded resize-none h-24"
            />
          </div>

          {/* Selecciones adicionales del curso */}
          <div className="flex flex-col">
            <label htmlFor="accessType" className="text-sm font-medium text-gray-600">
              Modalidad de acceso
            </label>
            <select
              id="accessType"
              name="accessType"
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="unlimited">Acceso ilimitado</option>
              <option value="temporary">Temporal</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="certification" className="text-sm font-medium text-gray-600">
              Certificación
            </label>
            <select
              id="certification"
              name="certification"
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="certified">Certificado</option>
              <option value="nonCertified">Sin certificado</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="evaluation" className="text-sm font-medium text-gray-600">
              Evaluación
            </label>
            <select
              id="evaluation"
              name="evaluation"
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="evaluated">Evaluado</option>
              <option value="notEvaluated">Sin evaluación</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="paymentType" className="text-sm font-medium text-gray-600">
              Acceso
            </label>
            <select
              id="paymentType"
              name="paymentType"
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="free">Gratis</option>
              <option value="paid">Pago</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="language" className="text-sm font-medium text-gray-600">
              Idioma del curso
            </label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Ej: Español"
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="updateDate" className="text-sm font-medium text-gray-600">
              Fecha de actualización
            </label>
            <input
              type="date"
              id="updateDate"
              name="updateDate"
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Imagen y precio */}
          <div className="flex flex-col">
            <label htmlFor="courseImage" className="text-sm font-medium text-gray-600">
              Imagen de la card del curso
            </label>
            <input
              type="file"
              id="courseImage"
              name="courseImage"
              accept="image/*"
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="coursePrice" className="text-sm font-medium text-gray-600">
              Precio individual del curso
            </label>
            <input
              type="number"
              id="coursePrice"
              name="coursePrice"
              placeholder="Precio en USD"
              className="mt-1 p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
            />
          </div>
        </form>
      </div>

      {/* Contenedor de módulos */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-6">
          {modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className="relative p-6 bg-white rounded-2xl shadow-md w-[calc(33.333%-1rem)]"
            >
              {/* Botón para eliminar módulo, solo si no es el primero */}
              {moduleIndex > 0 && (
                <button
                  type="button"
                  onClick={() => removeModule(module.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Título del módulo */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {moduleIndex + 1}º Módulo
              </h3>

              {/* Nombre del módulo */}
              <div className="mb-4">
                <label htmlFor={`moduleName-${module.id}`} className="text-sm font-medium text-gray-600">
                  Nombre del módulo
                </label>
                <input
                  type="text"
                  id={`moduleName-${module.id}`}
                  name="moduleName"
                  placeholder="Nombre del módulo"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Secciones */}
              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Secciones del módulo
              </h4>

              {module.sections.map((section, sectionIndex) => (
                <div
                  key={section.id}
                  className="mb-4 border p-4 rounded-lg relative"
                >
                  {/* Nombre de la sección */}
                  <div className="flex flex-col mb-2">
                    <label className="text-sm font-medium text-gray-600 flex justify-between items-center">
                      <span>Nombre de la sección</span>
                      <span>({sectionIndex + 1})</span>
                    </label>
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) =>
                        handleSectionChange(
                          moduleIndex,
                          sectionIndex,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Nombre de la sección"
                      className="mt-1 p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* Subir video */}
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5 text-gray-700" />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleSectionChange(
                          moduleIndex,
                          sectionIndex,
                          "video",
                          e.target.files[0]
                        )
                      }
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>

                  {/* Subir documentos */}
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <input
                      type="file"
                      onChange={(e) =>
                        handleSectionChange(
                          moduleIndex,
                          sectionIndex,
                          "documents",
                          e.target.files[0]
                        )
                      }
                      className="p-2 border border-gray-300 rounded w-full"
                    />
                  </div>

                  {/* Botón para eliminar sección: solo aparece en la última sección si hay más de una */}
                  {sectionIndex === module.sections.length - 1 &&
                    module.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(moduleIndex, section.id)}
                        className="absolute -bottom-9 -right-0.5 w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                </div>
              ))}

              {/* Botón para agregar sección */}
              <button
                type="button"
                onClick={() => addSection(moduleIndex)}
                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Agregar sección
              </button>
            </div>
          ))}

          {/* Botón para agregar un nuevo módulo */}
          <button
            type="button"
            onClick={addModule}
            className="p-6 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-400 flex flex-col items-center justify-center w-[calc(33.333%-1rem)] hover:bg-gray-200"
          >
            <PlusCircle className="w-8 h-8 text-gray-600" />
            <span className="mt-2 text-gray-700 font-medium">
              Agregar módulo
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
