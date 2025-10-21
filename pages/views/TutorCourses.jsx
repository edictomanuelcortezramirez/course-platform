import { useEffect, useState } from "react";
import { Edit, HelpCircle } from "lucide-react";
import DeleteButtonCourse from "../../src/components/DeleteButtonCourse";
import EditButtonCourse from "@/src/components/EditButtonCourse";

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
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800">Mis Cursos</h2>
      <p className="mt-2 text-gray-600 flex items-center gap-1">
        Aquí encontrarás todos los cursos que has creado. Puedes editarlos o
        eliminarlos. Consulta nuestra
        <HelpCircle className="w-5 h-5 text-gray-700 inline-block" />
        <span className="text-sm font-medium text-gray-700">Guía de uso</span>
      </p>

      {(!courses || courses.length === 0) && (
        <p className="mt-4 text-gray-500">No has creado ningún curso aún.</p>
      )}

      {courses && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 group relative max-w-[380px] h-125 bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300"
            >
              <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10 capitalize">
                <div className="flex flex-wrap gap-2">
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
                  {course.hasCertificate === true ? (
                    <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                      Certificado
                    </span>
                  ) : (
                    <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                      Sin certificado
                    </span>
                  )}
                  {course.hasEvaluation === true ? (
                    <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                      Evaluado
                    </span>
                  ) : (
                    <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                      Sin evaluación
                    </span>
                  )}
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

              <div className="relative">
                <img
                  src={course.image || "/fallback.jpg"}
                  alt={course.title}
                  className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
                />
              </div>

              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 capitalize line-clamp-2 overflow-hidden">
                  {course.description}
                </p>

                <div className="mt-4 flex gap-3">
                  <EditButtonCourse courseId={course.id} />

                  <DeleteButtonCourse
                    courseId={course.id}
                    onDelete={(id) =>
                      setCourses(courses.filter((c) => c.id !== id))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
