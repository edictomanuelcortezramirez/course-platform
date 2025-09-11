import { useState } from "react";

export default function EvaluationsPanel() {
  // Estado para guardar lo que el usuario escribe en el comentario
  const [comment, setComment] = useState("");
  // Estado para guardar la imagen seleccionada para ampliar
  const [selectedImage, setSelectedImage] = useState(null);

  // Datos de ejemplo (nombre de estudiante y curso)
  const studentName = "Manuel Garcia";
  const courseName = "Manicure Permanente";

  // Lista de evaluaciones, cada una con su imagen
  const evaluations = [
    { studentName, courseName, image: "maniper.jpg" },
    { studentName, courseName, image: "maniper.jpg" },
    { studentName, courseName, image: "maniper.jpg" },
    { studentName, courseName, image: "maniper.jpg" },
  ];

  return (
    <div className="flex gap-6 p-6">
      {/* Columna principal con las evaluaciones */}
      <div className="flex-1 space-y-4 max-h-[calc(100vh-48px)] overflow-y-auto scrollbar-hide">
        {/* Título y descripción */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Evaluaciones con imágenes
          </h2>
          <p className="mt-2 text-gray-600">
            Aquí puedo revisar las fotos que suben los alumnos, evaluarlas y dejarles retroalimentación.
          </p>
        </div>

        {/* Contenedor con fondo blanco que tiene todas las tarjetas */}
        <div className="bg-white p-2 rounded-xl shadow-md mt-7">
          <div className="grid grid-cols-2 gap-6 pb-1">
            {evaluations.map((evalItem, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md space-y-4"
              >
                {/* Nombre del alumno y el curso */}
                <div className="text-sm text-gray-700 font-normal">
                  {evalItem.studentName} - {evalItem.courseName}
                </div>

                {/* Imagen de la evaluación */}
                <div
                  className="relative w-full h-50 rounded-lg overflow-hidden cursor-pointer"
                  // Cuando doy clic a la imagen, la guardo en selectedImage para mostrarla ampliada
                  onClick={() => setSelectedImage(evalItem.image)}
                >
                  <img
                    src={evalItem.image}
                    alt={`Alumno ${evalItem.studentName} - evaluación`}
                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-70"
                  />
                  {/* Texto que aparece al pasar el cursor */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
                      Ampliar
                    </span>
                  </div>
                </div>

                {/* Caja de comentario y botón */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700 font-medium">
                      Comentario:
                    </label>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-900 transition-colors">
                      Enviar
                    </button>
                  </div>

                  {/* Área para escribir el comentario */}
                  <textarea
                    placeholder="Escribe tu comentario aquí"
                    className="p-3 border border-gray-300 rounded w-full h-24 resize-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caja lateral para pedir ayuda a la IA */}
      <div className="w-65">
        <div className="w-70 p-6 bg-white rounded-xl shadow-md border border-gray-300 flex flex-col gap-4 fixed bottom-6 right-15 min-h-[600px]">
          <h3 className="text-lg font-bold text-gray-800">
            Solicita ayuda a la IA
          </h3>
          <p className="text-sm text-gray-600">
            Aquí puedo escribir mi comentario y la IA me ayudará a mejorarlo para dar mejor retroalimentación.
          </p>
          <input
            type="text"
            placeholder="Ingresa tu comentario"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>

      {/* Modal que aparece cuando se amplía la imagen */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-5xl max-h-full p-4">
            {/* Imagen ampliada al máximo posible */}
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            />
            {/* Botón redondo para cerrar el modal */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
