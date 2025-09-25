"use client";
import React from "react";

const steps = [
  {
    id: 1,
    title: "Inscríbete al curso",
    description: "Regístrate y accede de inmediato a la plataforma.",
  },
  {
    id: 2,
    title: "Aprende a tu ritmo",
    description: "Contenido grabado disponible las 24 horas.",
  },
  {
    id: 3,
    title: "Practica con guía",
    description: "Desarrolla habilidades reales con ejercicios.",
  },
  {
    id: 4,
    title: "Certifícate y lanza tu carrera",
    description: "Recibe tu certificado y aplica lo aprendido.",
  },
];

const StepProcess = () => {
  return (
    <section className="py-16 bg-white">
      <p className="text-base ml-28 mb-2 text-gray-500">
        ¿No sabes como empezar?
      </p>
      <h1 className="text-5xl font-black text-left max-w-[800px] ml-28 mb-8">
        Aquí te presentamos paso a paso como hacerlo.
      </h1>
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Imagen principal */}
        <div className="relative w-[1200px] mb-12">
          <div className="rounded-3xl border-10 border-white bg-white/10 backdrop-blur-md shadow-lg overflow-hidden">
            <img
              src="ejemplo.png"
              alt="Ejemplo"
              className="w-full max-h-[400px] object-cover object-center rounded-3xl"
            />
          </div>
        </div>
        {/* Pasos horizontales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex items-start gap-4 h-full min-h-[120px] bg-white p-4 rounded-xl shadow-sm"
            >
              {/*El Número */}
              <div className="flex-shrink-0">
                <div className="text-gray-600 font-bold leading-none text-[2.6rem]">
                  {step.id}
                </div>
              </div>
              {/*El Texto */}
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepProcess;
