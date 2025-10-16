import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";
import { generateToken } from "../../../src/utils/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios" });
    }

    // Busca usuario en la BD
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Compara contraseñas
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Genera token JWT con rol incluido
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role, 
      // el rol quede en el token
    });
    console.log("Token generado en backend:", token);

    // Respuesta al cliente
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      },
      token, 
      //se envia token separado para claridad
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error interno en el servidor" });
  }
}
