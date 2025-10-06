import { useEffect, useState } from "react";
import DashboardLayout from "../../src/components/dashboard/DashboardLayout";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener usuario del localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Solo admins, tutores o estudiantes pueden entrar
      if (!["admin", "tutor", "student"].includes(parsedUser.role)) {
        router.replace("/account/login"); // Redirigir si no tiene rol válido
      } else {
        setUser(parsedUser);
      }
    } else {
      router.replace("/account/login"); // Redirigir si no hay usuario
    }
  }, [router]);

  // Mientras carga usuario
  if (!user) return <p className="p-8">Cargando...</p>;

  return <DashboardLayout user={user} />;
}
