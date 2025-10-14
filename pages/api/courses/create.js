import { getUserFromRequest } from "../../../libs/auth";
import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: "No autenticado" });

    const {
      title, description, price, image,
      modules, accessType, hasCertificate,
      hasEvaluation, isPaid, language, updateDate
    } = req.body;

    if (!title || !price) return res.status(400).json({ error: "Título y precio son obligatorios" });

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
        accessType,
        hasCertificate,
        hasEvaluation,
        isPaid,
        instructorId: user.id, // dinámico según el usuario autenticado
        isPublished: true,
        modules: {
          create: (modules || []).map((m, i) => ({
            title: m.name || `Módulo ${i + 1}`,
            order: i + 1,
            sections: {
              create: (m.sections || []).map((s, j) => ({
                title: s.name || `Sección ${j + 1}`,
                order: j + 1,
                videoUrl: s.video ?? null,
                material: s.documents ?? null,
              })),
            },
          })),
        },
      },
      include: { modules: { include: { sections: true } } },
    });

    return res.status(200).json({ success: true, course });
  } catch (err) {
    console.error("Error creando curso:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
