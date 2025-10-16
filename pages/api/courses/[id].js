import prisma from "../../../libs/prisma";
import { getUserFromRequest } from "../../../libs/auth";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const user = await getUserFromRequest(req);

      if (!user) return res.status(401).json({ error: "No autenticado" });
      if (user.role !== "tutor") return res.status(403).json({ error: "Acceso denegado" });

      const courseId = parseInt(id);

      const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, instructorId: true },
      });

      if (!course) return res.status(404).json({ error: "Curso no encontrado" });
      if (course.instructorId !== user.id)
        return res.status(403).json({ error: "No puedes eliminar este curso" });

      await prisma.section.deleteMany({
        where: { module: { courseId } },
      });

      await prisma.module.deleteMany({
        where: { courseId },
      });

      await prisma.course.delete({
        where: { id: courseId },
      });

      return res.status(200).json({ message: "Curso eliminado exitosamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor", details: err.message });
    }
  }

  if (req.method !== "GET")
    return res.status(405).json({ error: "Método no permitido" });

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        instructor: { select: { id: true, name: true } },
        modules: {
          include: {
            sections: true,
          },
        },
      },
    });

    if (!course)
      return res.status(404).json({ error: "Curso no encontrado" });

    return res.status(200).json({ course });
  } catch (err) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
