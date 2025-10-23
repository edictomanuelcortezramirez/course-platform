import { useEffect, useState } from "react";
import { Star, PlayCircle, Clock, CheckCircle, User } from "lucide-react";

export default function CourseDetailPage({ id }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error("Error al cargar el curso");
        const data = await res.json();
        const c = data.course;

        const modules = (c.modules || []).map((mod) => {
          const durationMinutes = (mod.sections || []).reduce(
            (acc, sec) => acc + (sec.duration || 0),
            0
          );
          const hours = Math.floor(durationMinutes / 60);
          const minutes = durationMinutes % 60;
          const durationStr =
            hours > 0 ? `${hours}h ${minutes} min` : `${minutes} min`;
          return { id: mod.id, title: mod.title, duration: durationStr };
        });

        function capitalizeFirstLetter(str) {
          if (!str) return "";
          return str.charAt(0).toUpperCase() + str.slice(1);
        }

        setCourse({
          title: capitalizeFirstLetter(c.title),
          shortDescription: capitalizeFirstLetter(c.shortDescription || ""),
          subtitle: capitalizeFirstLetter(c.description?.slice(0, 120) + "..."),
          instructor: c.instructor?.name || "Instructor desconocido",
          instructorBio: c.instructorBio || "",
          image: c.image || "/images/default-course.jpg",
          rating: 0,
          totalReviews: 0,
          duration: modules.reduce((acc, m) => {
            const [h, min] =
              m.duration.split("h ").length === 2
                ? m.duration
                    .split("h ")
                    .map((v, i) => (i === 0 ? parseInt(v) : parseInt(v)))
                : [0, parseInt(m.duration)];
            return acc + h * 60 + min;
          }, 0),
          lessons: modules.length,
          price: c.price,
          onSale: false,
          salePrice: c.price,

          whatYouWillLearn: c.whatYouWillLearn
            ? c.whatYouWillLearn
                .split("\n")
                .map((line) => capitalizeFirstLetter(line))
            : [],

          description: capitalizeFirstLetter(c.description),
          modules: modules.map((m) => ({
            ...m,
            title: capitalizeFirstLetter(m.title),
          })),
        });
      } catch (error) {
        console.error("Error en carga del curso:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10 text-lg">
        Cargando información del curso...
      </p>
    );
  if (!course)
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        No se encontró la información del curso.
      </p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4">{course.shortDescription}</p>

          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-sky-600" />
            <span className="text-sm font-medium text-gray-700">
              Impartido por {course.instructor}
            </span>
          </div>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(course.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600 text-sm ml-2">
              {course.rating} ({course.totalReviews} reseñas)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            {course.onSale ? (
              <>
                <span className="text-3xl font-bold text-sky-600">
                  ${course.salePrice}
                </span>
                <span className="text-gray-400 line-through">
                  ${course.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-sky-600">
                ${course.price}
              </span>
            )}
          </div>

          <button className="bg-sky-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-sky-700 transition">
            Adquirir curso
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Descripción del curso
        </h2>
        <p className="text-gray-600 leading-relaxed">{course.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Lo que aprenderás
        </h2>

        {course.whatYouWillLearn ? (
          (() => {
            const raw = Array.isArray(course.whatYouWillLearn)
              ? course.whatYouWillLearn.join(". ")
              : typeof course.whatYouWillLearn === "string"
              ? course.whatYouWillLearn
              : String(course.whatYouWillLearn);

            const items = raw
              .split(/[\.\n•◦–\-]+/)
              .map((it) => it.trim())
              .filter((it) => it !== "");

            if (items.length === 0) {
              return (
                <p className="text-gray-500">
                  Aún no se ha definido el contenido de aprendizaje.
                </p>
              );
            }

            return (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          })()
        ) : (
          <p className="text-gray-500">
            Aún no se ha definido el contenido de aprendizaje.
          </p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Contenido del curso
        </h2>
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4">
          {course.modules.map((mod) => (
            <div
              key={mod.id}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-sky-600" />
                <span className="text-gray-800">{mod.title}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {mod.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Sobre el instructor
        </h2>
        <div className="flex items-center gap-4">
          <img
            src="/images/instructor-avatar.jpg"
            alt={course.instructor}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{course.instructor}</h3>
            <p className="text-gray-600 text-sm">{course.instructorBio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}
