"use client";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-50">
      {/* Izquierda el Nombre */}
      <div className="text-2xl font-bold text-gray-800">Lunéa</div>

      {/* Centro-izquierda: Menús */}
      <div className="flex space-x-6 ml-10 text-sm font-medium text-gray-600">
        <a href="#cursos" className="hover:text-gray-900 transition">
          Cursos
        </a>
        <a href="#compras" className="hover:text-gray-900 transition">
          Compras
        </a>
        <a href="#faq" className="hover:text-gray-900 transition">
          Preguntas frecuentes
        </a>
        <a href="#contacto" className="hover:text-gray-900 transition">
          Contacto
        </a>
      </div>
      {/* Derecha: Botones */}
      <div className="flex space-x-4">
        <button className="bg-white text-black px-4 py-2 rounded-md shadow transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:translate-x-[-1px] hover:translate-y-[2px] hover:shadow-lg">
          Suscríbete
        </button>
        <button className="px-4 py-2 border border-gray-500 text-gray-700 rounded shadow transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white hover:translate-x-[-1px] hover:translate-y-[2px] hover:shadow-lg text-sm">
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
