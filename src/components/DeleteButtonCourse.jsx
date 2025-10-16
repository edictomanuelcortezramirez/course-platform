"use client";
import { useState } from "react";
import { Trash } from "lucide-react";

export default function DeleteButtonCourse({ courseId, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No se encontró token de autenticación.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error al eliminar el curso. Status: ${res.status}`);
      }

      const result = await res.json().catch(() => ({}));

      if (onDelete) {
        onDelete(courseId);
      }

      setShowConfirm(false);
    } catch (error) {
      alert("Hubo un problema al eliminar el curso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition"
      >
        <Trash className="w-4 h-4" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              ¿Eliminar curso?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas
              eliminar este curso?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className={`px-4 py-2 rounded-xl text-white transition ${
                  loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
