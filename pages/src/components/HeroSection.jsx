import React from "react";
import Image from "next/image";
import imgHero from "../../../public/imgHeroSection.jpg";

const HeroSection = () => {
  return (
    <section className="px-6 py-5 bg-gray-50 text-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-[1200px] mx-auto rounded-3xl overflow-visible h-[500px]">
          {/* Imagen principal */}
          <Image
            src={imgHero}
            alt="Hero"
            className="w-full h-full object-cover scale-x-[-1] rounded-3xl relative z-10"
            priority
          />
          {/* Contenido principal sobre la imagen */}
          <div className="absolute inset-0 flex flex-col justify-center bg-opacity-40 text-left px-6 py-8 z-20">
            <h2 className="text-white text-5xl font-bold mb-4 max-w-sm">
              Potencia tu talento con Lunéa
            </h2>
            <button className="px-6 py-2 bg-gray-800 text-white rounded-md shadow-md w-fit transition-all duration-300 ease-in-out hover:bg-gray-900 hover:translate-x-[-2px] hover:translate-y-[3px] hover:shadow-2xl">
              Explorar cursos
            </button>
          </div>
          <div className="absolute left-1/2 bottom-[-110px] transform -translate-x-1/2 w-[1100px] h-[210px] rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl z-30 flex flex-col justify-center px-10">
            {/* Línea de características */}
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-4">
              {/* Característica 1 */}
              <div>
                <div className="flex items-center gap-2 text-gray-800 font-black text-xl">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Diseño intuitivo</span>
                </div>
                <p className="text-sm text-gray-500 pl-8">
                  Fácil de usar, sin complicaciones.
                </p>
              </div>
              {/* Característica 2 */}
              <div>
                <div className="flex items-center gap-2 text-gray-800 font-black text-xl">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Estructura clara</span>
                </div>
                <p className="text-sm text-gray-500 pl-8">
                  Contenido ordenado y directo.
                </p>
              </div>
              {/* Característica 3 */}
              <div>
                <div className="flex items-center gap-2 text-gray-800 font-black text-xl">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Certificación profesional</span>
                </div>
                <p className="text-sm text-gray-500 pl-8">
                  Avalado por expertas del área.
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 px-4 ml-5">
              <div className="text-left">
                <p className="text-2xl text-gray-800 font-black">
                  Da el primer paso hacia tu futuro profesional
                </p>
                <p className="text-sm text-gray-500">
                  Conoce nuestros planes y accede a la formación que
                  transformará tu carrera.
                </p>
              </div>
              {/* Botón */}
              <button className="px-6 py-2 bg-gray-900 text-white rounded-md shadow-md w-fit transition-all duration-300 ease-in-out hover:bg-black hover:translate-x-[-2px] hover:translate-y-[3px] hover:shadow-2xl flex items-center gap-2 ml-4">
                Empieza ahora
                <span className="text-lg">{">"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
