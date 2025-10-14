"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/courses/list?page=${page}&q=${search}`);
        const data = await res.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
          Catálogo de Cursos
        </h1>

        {/* Buscador */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-sky-500 capitalize"
          />
        </div>

        {/* Contenido */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando cursos...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron cursos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex-shrink-0 group relative w-[380px] h-[550px] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300"
              >
                {/* Etiquetas dinámicas */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10 capitalize ">
                  <div className="flex flex-wrap gap-2">
                    {/* Acceso */}
                    {course.accessType === "unlimited" && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Acc. ilimitado
                      </span>
                    )}
                    {course.accessType === "temporary" && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Acc. temporal
                      </span>
                    )}

                    {/* Certificación */}
                    {course.hasCertificate === true && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Certificado
                      </span>
                    )}
                    {course.hasCertificate === false && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Sin certificado
                      </span>
                    )}

                    {/* Evaluación */}
                    {course.hasEvaluation === true && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Evaluado
                      </span>
                    )}
                    {course.hasEvaluation === false && (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Sin evaluación
                      </span>
                    )}

                    {/* Pago */}
                    {course.isPaid ? (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Pago
                      </span>
                    ) : (
                      <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                        Gratis
                      </span>
                    )}
                  </div>
                </div>
                {/* Información del curso */}
                <div className="p-6 mt-24">
                  <h2 className="text-3xl font-bold text-gray-800 capitalize tracking-tight">
                    {course.title || "Título del curso"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 capitalize">
                    {course.description ||
                      "Aprende técnica profesional. Ideal para principiantes y expertos."}
                  </p>
                </div>
                {/* Imagen del curso */}
                <div className="relative">
                  <Image
                    src={
                      course.image ||
                      "https://via.placeholder.com/400x250?text=Curso"
                    }
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
                  />
                  {/* Botón */}
                  <a
                    href={`/courses/${course.id}`}
                    className="absolute bottom-5 left-4 flex items-center gap-2 backdrop-blur-md bg-white/20 text-white text-sm pl-5 py-0 rounded-full border border-white/30 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30 capitalize"
                  >
                    Saber más
                    <span className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full text-lg transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
