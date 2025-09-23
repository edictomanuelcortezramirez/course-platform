// Este componente sirve para manejar tres formularios en uno solo:
// login, registro (signup) y recuperación de contraseña (recover).
// Dependiendo del "type" que le pasemos, muestra un formulario distinto
// pero mantiene el mismo estilo. Así no repetimos código y todo queda
// centralizado aquí.

"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "";
    if (type === "signup") url = "/api/auth/signup";
    if (type === "login") url = "/api/auth/login";
    if (type === "recover") url = "/api/auth/recoverpassword";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (!res.ok) throw new Error(data.error || "Error en la petición");

      setMessage(data.message || "Operación exitosa ✅");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Caja del formulario */}
      <div className="max-w-md w-full border border-gray-800 p-6 rounded-lg shadow-md bg-white">
        {/* Título dinámico */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {type === "login" && "Inicia sesión"}
          {type === "signup" && "Crea una cuenta"}
          {type === "recover" && "Recuperar contraseña"}
        </h2>

        {/* Subtítulo dinámico */}
        <p className="text-sm text-gray-600 mb-6">
          {type === "login" && "Accede a tu cuenta con tus credenciales"}
          {type === "signup" && "Introduce tus datos para registrarte"}
          {type === "recover" &&
            "Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"}
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos adicionales solo para registro */}
          {type === "signup" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <input
                type="text"
                name="surname"
                placeholder="Apellido"
                value={formData.surname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </>
          )}

          {/* Campos email y contraseña para login/signup */}
          {(type === "login" || type === "signup") && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />

              {/* Input contraseña con ojo */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </>
          )}

          {/* Campo para recuperar contraseña */}
          {type === "recover" && (
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          )}

          {/* Botón dinámico */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-900 transition"
          >
            {type === "login" && "Iniciar sesión"}
            {type === "signup" && "Registrarse"}
            {type === "recover" && "Enviar enlace"}
          </button>
        </form>

        {/* Mensaje de estado */}
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
