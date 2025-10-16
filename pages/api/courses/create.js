import { getUserFromRequest } from "../../../libs/auth";
import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const {
      title,
      description,
      price,
      image,
      modules,
      accessType,
      hasCertificate,
      hasEvaluation,
      isPaid,
      language,
      updateDate,
    } = req.body;

    if (!title || !price) {
      return res
        .status(400)
        .json({ error: "Título y precio son obligatorios" });
    }

    const formattedModules = (modules || []).map((m, i) => ({
      title: m.title || m.name || `Módulo ${i + 1}`,
      order: i + 1,
      sections: {
        create: (m.sections || []).map((s, j) => ({
          title: s.name || `Sección ${j + 1}`,
          order: j + 1,
          videoUrl: s.video ?? null,
          material: s.material ?? null,
        })),
      },
    }));

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
        instructorId: user.id,
        isPublished: true,
        language,
        updateDate: updateDate ? new Date(updateDate) : null,
        modules: {
          create: formattedModules,
        },
      },
      include: { modules: { include: { sections: true } } },
    });

    return res.status(200).json({ success: true, course });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
}
