import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

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
    console.error("Error al obtener curso:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
