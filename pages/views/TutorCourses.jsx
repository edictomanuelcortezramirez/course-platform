import { useEffect, useState } from "react";
import { Edit, Trash } from "lucide-react";

export default function TutorCourses() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/courses/tutor", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error(err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;
  if (!courses || courses.length === 0)
    return <p>No has creado ningún curso aún.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mis cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex-shrink-0 group relative max-w-[380px] h-125 bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 "
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

            {/* Imagen */}
            <div className="relative">
              <img
                src={course.image || "/fallback.jpg"}
                alt={course.title}
                className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
              />
            </div>

            {/* Contenido textual */}
            <div className="p-6 flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 capitalize">
                {course.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 capitalize">
                {course.description}
              </p>

              {/* Botones editar y eliminar  */}
              <div className="mt-2 flex gap-3">
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
