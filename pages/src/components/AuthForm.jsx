// Este componente sirve para manejar tres formularios en uno solo:
// login, registro (signup) y recuperación de contraseña (recover).
// Dependiendo del "type" que le pasemos, muestra un formulario distinto
// pero mantiene el mismo estilo. Así no repetimos código y todo queda
// centralizado aquí.

export default function AuthForm({ type }) {
  return (
    // Contenedor de página: centra el formulario en el medio
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
          {type === "login" &&
            "Accede a tu cuenta con tus credenciales"}
          {type === "signup" &&
            "Introduce tus datos para registrarte"}
          {type === "recover" &&
            "Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"}
        </p>

        {/* Formulario */}
        <form className="space-y-4">
          {/* Campo adicional solo para registro */}
          {type === "signup" && (
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          )}

          {/* Campos email y contraseña para login/signup */}
          {(type === "login" || type === "signup") && (
            <>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </>
          )}

          {/* Campo para recuperar contraseña */}
          {type === "recover" && (
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          )}

          {/* Botón dinámico */}
          <button className="w-full bg-gray-800 text-white py-2 px-4 rounded shadow hover:bg-gray-900 transition">
            {type === "login" && "Iniciar sesión"}
            {type === "signup" && "Registrarse"}
            {type === "recover" && "Enviar enlace"}
          </button>
        </form>
      </div>
    </div>
  );
}
