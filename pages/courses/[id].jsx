"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PlayCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
} from "lucide-react";

export default function CourseViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [checkedSections, setCheckedSections] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedProgress = localStorage.getItem("courseProgress");
    if (savedProgress) {
      setCheckedSections(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(checkedSections));
  }, [checkedSections]);

  const toggleSectionCheck = (sectionId) => {
    setCheckedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data.course);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      alert("Comentario enviado con éxito. ¡Gracias por tu aporte!");
      setComment("");
    }
  };

  if (loading)
    return <p className="text-center py-10 text-gray-500">Cargando curso...</p>;
  if (!course)
    return (
      <p className="text-center py-10 text-gray-500">Curso no encontrado.</p>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          {selectedSection?.videoUrl ? (
            <iframe
              key={selectedSection.videoUrl}
              src={selectedSection.videoUrl}
              title={selectedSection.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          ) : course.previewUrl ? (
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

        <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
          {course.title}
        </h1>
        <p className="text-sm text-gray-500 mb-4 capitalize">
          Instructor: {course.instructor?.name || "Instructor desconocido"}
        </p>

        <div className="relative">
          <p
            className={`text-gray-700 leading-relaxed capitalize transition-all duration-300 ${
              showFullDescription
                ? "line-clamp-none"
                : "line-clamp-2 overflow-hidden"
            }`}
          >
            {course.description}
          </p>

          <div className="flex justify-center mt-2">
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-gray-600 text-sm font-medium flex items-center gap-1 hover:text-gray-700 transition"
            >
              {showFullDescription ? "Mostrar menos" : "Mostrar más"}
              {showFullDescription ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {showFullDescription && (
            <div className="mt-5 border-t border-gray-200 pt-4 text-sm text-gray-600 space-y-3 animate-fadeIn">
              <p>
                <span className="font-medium text-gray-800">
                  Última actualización:
                </span>{" "}
                {course.updatedAt
                  ? new Date(course.updatedAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "No disponible"}
              </p>

              <p className="capitalize">
                <span className="font-medium text-gray-800">Idioma:</span>{" "}
                {course.language || "Español"}
              </p>

              <div className="mt-4 border-t border-gray-100 pt-3 text-center">
                <p className="text-base text-gray-600 mb-2">
                  ¿Quieres saber más del tutor{" "}
                  <span className="text-gray-900 underline capitalize">
                    {course.instructor?.name || "este tutor"}?
                  </span>
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  Envíanos tu comentario:
                </p>

                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    className="border border-gray-300 rounded-xl px-3 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-xl px-3 py-2 text-sm flex items-center gap-1 transition"
                  >
                    <Send className="w-4 h-4" />
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <aside className="w-full lg:w-80 bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-gray-600" />
          Contenido del curso
        </h2>

        <div className="space-y-4">
          {course.modules?.length ? (
            course.modules.map((mod, i) => {
              const isOpen = expandedModule === i;
              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => setExpandedModule(isOpen ? null : i)}
                  >
                    <span
                      className="font-medium text-gray-800 truncate max-w-[180px] capitalize"
                      title={mod.title}
                    >
                      {mod.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 py-2 bg-white space-y-2">
                      {mod.sections?.length ? (
                        mod.sections.map((sec, j) => (
                          <div key={sec.id || j} className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={!!checkedSections[sec.id]}
                                onChange={() => toggleSectionCheck(sec.id)}
                                className="accent-gray-600 cursor-pointer"
                              />

                              <div
                                className="text-sm text-gray-700 border-l-2 capitalize border-gray-500 pl-3 hover:text-gray-600 cursor-pointer transition flex-1"
                                onClick={() => setSelectedSection(sec)}
                              >
                                <span>{sec.title}</span>
                              </div>
                            </div>

                            {selectedSection?.id === sec.id && sec.material && (
                              <a
                                href={sec.material}
                                download
                                className="mt-1 ml-6 text-xs text-gray-600 hover:underline flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                Descargar material
                              </a>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">Sin secciones</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">
              Este curso aún no tiene módulos.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
