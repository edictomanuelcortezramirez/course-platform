import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { name, surname, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // Verificar si ya existe el usuario
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en DB
    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        surname: surname || null,
        email,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true, surname: true, createdAt: true },
    });

    return res.status(201).json({
      message: "Usuario registrado con éxito ✅",
      user: newUser,
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    return res.status(500).json({ error: "Error interno en el servidor" });
  }
}
