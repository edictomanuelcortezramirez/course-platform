import prisma from "../../../libs/prisma";

export default async function handler(req, res) {
  const { page = 1, q = "" } = req.query;
  const take = 9;
  const skip = (parseInt(page) - 1) * take;

  try {
    const where = {};

    if (q && q.trim() !== "") {
      where.title = {
        contains: q,
        mode: "insensitive",
      };
    }

    const courses = await prisma.course.findMany({
  where,
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
    isPublished: true,
  },
  orderBy: { createdAt: "desc" },
  take,
  skip,
});

const normalizedCourses = courses.map(course => ({
  ...course,
  accessType: course.accessType || "ilimitado",
  hasCertificate: course.hasCertificate ?? false,
  hasEvaluation: course.hasEvaluation ?? false,
  isPaid: course.isPaid ?? false,
}));

    const total = await prisma.course.count({ where });

    return res.status(200).json({ data: courses, total });
  } catch (error) {
    console.error("Error listando cursos:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}
