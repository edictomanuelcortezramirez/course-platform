"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CourseViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data.course);
      } catch (error) {
        console.error("Error al cargar el curso:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-gray-500">Cargando curso...</p>;
  if (!course) return <p className="text-center py-10 text-gray-500">Curso no encontrado.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-6">
          {course.previewUrl ? (
            <iframe
              src={course.previewUrl}
              title={course.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Simulación de video"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">Por {course.instructor?.name || "Instructor desconocido"}</p>
        <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>
        <p className="text-lg font-semibold text-sky-700">${course.price?.toLocaleString()}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Contenido del curso</h2>
        <div className="space-y-3">
          {course.modules?.length ? (
            course.modules.map((mod, i) => (
              <div key={i} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full text-left px-4 py-3 font-medium bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center"
                  onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                >
                  <span>{mod.title}</span>
                  <span>{expandedModule === i ? "−" : "+"}</span>
                </button>

                {expandedModule === i && (
                  <div className="px-4 py-2 bg-white border-t border-gray-200">
                    {mod.sections?.length ? (
                      mod.sections.map((sec, j) => (
                        <div
                          key={j}
                          className="py-2 text-sm text-gray-700 border-b border-gray-100 last:border-0"
                        >
                          {sec.title}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-2">Sin secciones</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Este curso aún no tiene módulos.</p>
          )}
        </div>
      </div>
    </div>
  );
}
