import React from "react";
import { Star, PlayCircle, Clock, CheckCircle, User } from "lucide-react";

export default function CourseDetail() {
  const course = {
    title: "Introducción a la Programación",
    subtitle: "Aprende los fundamentos de la programación desde cero con ejemplos prácticos.",
    instructor: "Carlos Ramírez",
    instructorBio: "Desarrollador full stack con más de 10 años de experiencia enseñando a principiantes.",
    image: "/images/programming-course.jpg",
    rating: 4.8,
    totalReviews: 256,
    duration: "12 horas",
    lessons: 24,
    price: 49.99,
    onSale: true,
    salePrice: 29.99,
    whatYouWillLearn: [
      "Comprender los conceptos básicos de programación",
      "Dominar variables, bucles y funciones",
      "Resolver problemas lógicos paso a paso",
      "Crear pequeños proyectos en JavaScript"
    ],
    description: `Este curso está diseñado para quienes quieren dar sus primeros pasos en el mundo de la programación. 
    Aprenderás las bases lógicas y técnicas para construir tus propios programas, desarrollar pensamiento computacional 
    y adquirir la confianza para seguir avanzando en el desarrollo web, móvil o de software.`,
    modules: [
      { id: 1, title: "Bienvenida e Introducción", duration: "20 min" },
      { id: 2, title: "Conceptos Fundamentales", duration: "45 min" },
      { id: 3, title: "Estructuras de Control", duration: "1h 10 min" },
      { id: 4, title: "Funciones y Arreglos", duration: "55 min" },
      { id: 5, title: "Proyecto Final", duration: "2h 15 min" },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.subtitle}</p>
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
                <span className="text-gray-400 line-through">${course.price}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-sky-600">${course.price}</span>
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {course.whatYouWillLearn.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-sky-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
