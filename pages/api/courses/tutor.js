import prisma from "../../../libs/prisma";
import { getUserFromRequest } from "../../../libs/auth";

export default async function handler(req, res) {

  if (req.method !== "GET") {
    console.log("Método no permitido:", req.method);
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {

    //Obtenemos el usuario desde el token
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (user.role !== "tutor") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    

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

    if (courses.length > 0) {
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
}
