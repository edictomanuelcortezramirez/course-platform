'use client';
import React from 'react';
import Link from 'next/link';

const FinalCTA = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        ¿Listo para dar el siguiente paso?
      </h2>
      <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
        Únete a cientos de personas que ya están transformando su carrera. Comienza hoy mismo y forma parte de nuestra comunidad.
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <Link href="/signup">
          <span className="bg-gray-600 hover:bg-gray-700 text-white font-semibold text-sm px-8 py-3 rounded-full transition duration-300">
            Crear cuenta
          </span>
        </Link>
        <Link href="/plans">
          <span className="border border-gray-300 text-gray-700 font-semibold text-sm px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300">
            Ver planes
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FinalCTA;
