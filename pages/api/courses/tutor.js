import prisma from "../../../libs/prisma";
import { getUserFromRequest } from "../../../libs/auth";

export default async function handler(req, res) {
  console.log("Nueva solicitud recibida en /api/courses/tutor");

  if (req.method !== "GET") {
    console.log("Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    console.log("Headers recibidos:", req.headers);

    // 1️Obtenemos el usuario desde el token
    const user = await getUserFromRequest(req);
    console.log("Usuario obtenido de request:", user);

    if (!user) {
      console.log("No se pudo autenticar al usuario");
      return res.status(401).json({ error: "No autenticado" });
    }

    if (user.role !== "tutor") {
      console.log("Usuario no es tutor, rol actual:", user.role);
      return res.status(403).json({ error: "Acceso denegado" });
    }

    // Intentamos buscar los cursos
    console.log("🔍 Buscando cursos del tutor con ID:", user.id);

    const courses = await prisma.course.findMany({
      where: { instructorId: user.id }, //revisa si en tu esquema es tutorId o userId
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        price: true,
        accessType: true,
        hasCertificate: true,
        hasEvaluation: true,
        isPaid: true,
      },
    });

    console.log("Cursos encontrados:", courses.length);
    if (courses.length > 0) {
      console.log("Títulos:", courses.map(c => c.title));
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error obteniendo cursos del tutor:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
}
