"use client";
import Image from "next/image";
import { useRef } from "react";

const CourseCard = () => {
  const sliderRef = useRef(null);

  const scroll = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };
  return (
    <div className="mt-38">
      <p className="text-base ml-28 mb-2 text-gray-500">Catálogo de cursos</p>
      <h1 className="text-5xl font-black text-left max-w-[800px] ml-28 mb-8">
        Haz de tu vocación una inspiración siendo una manicurista excelente.
      </h1>
      {/* Botones de navegación */}
      <div className="flex justify-end items-center mb-6 mt-[-50px] mr-28 gap-4">
        <button
          onClick={() => scroll(-400)}
          className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
        >
          <span className="text-xl">‹</span>
        </button>
        <button
          onClick={() => scroll(400)}
          className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
        >
          <span className="text-xl">›</span>
        </button>
      </div>
      <div
        ref={sliderRef}
        className="flex gap-x-6 ml-28 pr-5 justify-start overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
      >
        {/* tarjeta 1 */}
        <div className=" flex-shrink-0 group relative max-w-[380px] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:translate-x-[-8px] hover:translate-y-[8px]">
          {/* Etiquetas e ícono */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10">
            <div className="flex gap-2">
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Acc. ilimitado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Certificado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Evaluado
              </span>
            </div>

            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H3V9h18v6zm-4-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
              </svg>
            </div>
          </div>
          <div className="p-6 mt-14">
            <h2 className="text-3xl font-bold text-gray-800">
              Manicure Permanente
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Aprende técnica profesional. Ideal para principiantes y expertos.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/maniper.jpg"
              alt="Curso de Manicure Permanente"
              width={400}
              height={250}
              className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
            />
            {/* Botón con efecto en hover de toda la tarjeta */}
            <button className="absolute bottom-4 left-4 flex items-center gap-2 backdrop-blur-md bg-white/20 text-white text-sm pl-5 py-0 rounded-full border border-white/30 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30">
              Saber más
              <span className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
        {/* tarjeta 2 */}
        <div className="flex-shrink-0 group relative max-w-[380px] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:translate-x-[-8px] hover:translate-y-[8px]">
          {/* Etiquetas e ícono */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10">
            <div className="flex gap-2">
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Acc. ilimitado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Certificado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Evaluado
              </span>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H3V9h18v6zm-4-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
              </svg>
            </div>
          </div>
          <div className="p-6 mt-14">
            <h2 className="text-3xl font-bold text-gray-800 w-[100px]">
              Manicure Rusa
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Aprende técnica profesional. Ideal para principiantes y expertos.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/maniRusa.jpg"
              alt="Curso de Manicure Permanente"
              width={400}
              height={250}
              className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
            />
            {/* Botón con efecto en hover de toda la tarjeta */}
            <button className="absolute bottom-4 left-4 flex items-center gap-2 backdrop-blur-md bg-white/20 text-white text-sm pl-5 py-0 rounded-full border border-white/30 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30">
              Saber más
              <span className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
        {/* tarjeta 3 */}
        <div className="flex-shrink-0 group relative max-w-[380px] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:translate-x-[-8px] hover:translate-y-[8px]">
          {/* Etiquetas e ícono */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10">
            <div className="flex gap-2">
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Acc. ilimitado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Certificado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Evaluado
              </span>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H3V9h18v6zm-4-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
              </svg>
            </div>
          </div>
          <div className="p-6 mt-14">
            <h2 className="text-3xl font-bold text-gray-800 w-[100px]">
              Baño Poligel
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Aprende técnica profesional. Ideal para principiantes y expertos.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/bañopoli.jpg"
              alt="Curso de Manicure Permanente"
              width={400}
              height={250}
              className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
            />
            {/* Botón con efecto en hover de toda la tarjeta */}
            <button className="absolute bottom-4 left-4 flex items-center gap-2 backdrop-blur-md bg-white/20 text-white text-sm pl-5 py-0 rounded-full border border-white/30 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30">
              Saber más
              <span className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
        {/* tarjeta 4 */}
        <div className="flex-shrink-0 group relative max-w-[380px] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:translate-x-[-8px] hover:translate-y-[8px]">
          {/* Etiquetas e ícono */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center text-xs font-medium z-10">
            <div className="flex gap-2">
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Acc. ilimitado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Certificado
              </span>
              <span className="bg-gray-800 text-white px-2 py-2 rounded-full">
                Evaluado
              </span>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M21 7H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H3V9h18v6zm-4-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
              </svg>
            </div>
          </div>
          <div className="p-6 mt-14">
            <h2 className="text-3xl font-bold text-gray-800 w-[100px]">
              Manejo Torno
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Aprende técnica profesional. Ideal para principiantes y expertos.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/manejotorno.jpg"
              alt="Curso de Manicure Permanente"
              width={400}
              height={250}
              className="w-full object-cover object-[0_65%] h-[20rem] rounded-3xl"
            />
            {/* Botón con efecto en hover de toda la tarjeta */}
            <button className="absolute bottom-4 left-4 flex items-center gap-2 backdrop-blur-md bg-white/20 text-white text-sm pl-5 py-0 rounded-full border border-white/30 transition-all duration-300 group-hover:backdrop-blur-lg group-hover:bg-white/30">
              Saber más
              <span className="flex items-center justify-center w-8 h-8 bg-white text-gray-800 rounded-full text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
