import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_me";

// Firmar token con id y role
export function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Verificar token (retorna payload o null)
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Extraer usuario desde el request (header o cookie)
export async function getUserFromRequest(req) {
  let token = null;

  // Buscar en header Authorization
  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Buscar en cookies si no vino en headers
  if (!token && req.headers?.cookie) {
    const cookies = Object.fromEntries(
      req.headers.cookie.split(";").map((c) => {
        const [k, v] = c.split("=").map((s) => s.trim());
        return [k, decodeURIComponent(v)];
      })
    );
    if (cookies.token) token = cookies.token;
  }

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.id) return null;

  // Buscar usuario en DB
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  });
  if (!user) return null;

  return {
    id: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
  };
}

// Configuración de NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("Usuario no encontrado");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Contraseña incorrecta");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/account/login",
  },
  session: {
    strategy: "jwt",
  },
};
