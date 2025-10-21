"use client";
import { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";

export default function EditCourse() {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const id =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("id")
      : null;

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourseData(data.course);
      } catch (err) {
        alert("Error al cargar el curso");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p className="p-6">Cargando curso...</p>;
  if (!courseData) return <p className="p-6 text-red-600">Curso no encontrado</p>;

  return <CreateCourse existingCourse={courseData} isEditing={true} />;
}
