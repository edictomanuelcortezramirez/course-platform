"use client";
import { useRouter } from "next/router";
import { Edit } from "lucide-react";

export default function EditButtonCourse({ courseId }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/views/EditCourse?id=${courseId}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition"
    >
      <Edit className="w-4 h-4" />
    </button>
  );
}
