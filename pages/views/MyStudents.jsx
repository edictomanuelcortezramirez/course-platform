import React, { useState } from "react";
import { GraduationCap, Calendar, User, Mail } from "lucide-react";

export default function MyStudents() {
  const students = [
    {
      id: 1,
      courseName: "Introducción a la Programación",
      studentName: "Carlos Martínez",
      purchaseDate: "2025-09-12",
      email: "carlos.martinez@example.com",
    },
    {
      id: 2,
      courseName: "Marketing Digital para Principiantes",
      studentName: "Ana López",
      purchaseDate: "2025-08-30",
      email: "ana.lopez@example.com",
    },
    {
      id: 3,
      courseName: "Diseño UX/UI Moderno",
      studentName: "Javier Soto",
      purchaseDate: "2025-10-01",
      email: "javier.soto@example.com",
    },
    {
      id: 4,
      courseName: "Python Avanzado",
      studentName: "Laura Fernández",
      purchaseDate: "2025-09-25",
      email: "laura.fernandez@example.com",
    },
  ];

  const courseNames = Array.from(new Set(students.map((s) => s.courseName)));

  const [selectedCourse, setSelectedCourse] = useState("Todos");

  const truncateCourseName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : name;
  };

  const filteredStudents =
    selectedCourse === "Todos"
      ? students
      : students.filter((s) => s.courseName === selectedCourse);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Mis Estudiantes</h2>
      <p className="text-gray-600 mb-4">
        Aquí puedes ver los alumnos que han adquirido tus cursos y comunicarte
        con ellos directamente.
      </p>

      {/* Pestañas de cursos */}
      <div className="flex overflow-x-auto gap-3 pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => setSelectedCourse("Todos")}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
            selectedCourse === "Todos"
              ? "bg-gray-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Todos
        </button>

        {courseNames.map((course) => (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
              selectedCourse === course
                ? "bg-gray-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={course}
          >
            {truncateCourseName(course)}
          </button>
        ))}
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-gray-500">No hay estudiantes para este curso.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-800">
                  {student.courseName}
                </h3>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800">
                    {student.studentName}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    Adquirido el{" "}
                    {new Date(student.purchaseDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-xs text-gray-500 truncate mb-3">
                  {student.email}
                </div>

                <div className="flex items-center justify-start border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Enviar mensaje</span>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 ml-4 accent-gray-600 cursor-pointer"
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
