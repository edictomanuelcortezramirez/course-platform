import prisma from "../../libs/prisma";
import { getUserFromRequest } from "../../libs/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  try {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ error: "No autenticado" });

    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: "courseId requerido" });

    // no comprar dos veces
    const existing = await prisma.purchase.findFirst({ where: { userId: user.id, courseId: parseInt(courseId) } });
    if (existing) return res.status(400).json({ error: "Curso ya comprado" });

    // En producción aquí validarías el pago (Stripe) antes de marcar completed
    const purchase = await prisma.purchase.create({
      data: { user: { connect: { id: user.id } }, course: { connect: { id: parseInt(courseId) } }, status: "completed" },
    });

    return res.status(201).json({ message: "Compra registrada", purchaseId: purchase.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno" });
  }
}
