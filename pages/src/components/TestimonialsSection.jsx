"use client";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sofía Martínez",
    image: "/test1.jpeg",
    text: "Memorisely me ha ayudado a organizar mis ideas de forma clara. Me encanta cómo explican cada concepto y cómo lo aplican con ejemplos reales. Ha sido una experiencia de aprendizaje distinta a todo lo que he probado.",
  },
  {
    id: 2,
    name: "Lucas Fernández",
    image: "/test2.jpg",
    text: "Nunca pensé que aprender diseño UX pudiera ser tan divertido y accesible. La comunidad es lo que más destaco: activa, solidaria y muy profesional. Memorisely me motivó a seguir creciendo.",
  },
  {
    id: 3,
    name: "Valentina Rojas",
    image: "/test3.jpg",
    text: "El enfoque paso a paso me ayudó a no sentirme abrumada. Pude avanzar a mi ritmo y aplicar lo aprendido en mi trabajo real. Recomiendo Memorisely a quien quiera comenzar en el mundo del diseño.",
  },
  {
    id: 4,
    name: "Diego Castillo",
    image: "/test4.jpg",
    text: 'Cada módulo está cuidadosamente pensado para que entiendas no solo el "cómo", sino también el "por qué". He mejorado mucho mi forma de pensar los productos digitales desde que comencé.',
  },
  {
    id: 5,
    name: "Camila Torres",
    image: "/test5.jpg",
    text: "Lo que más valoro es que no solo aprendí teoría, sino también cómo aplicarla en contextos reales. Memorisely me dio herramientas prácticas que uso a diario. Todo explicado con claridad y empatía.",
  },
  {
    id: 6,
    name: "Nicolás Herrera",
    image: "/test6.jpg",
    text: "Después de probar varios cursos, este fue el único que realmente me enganchó. Está bien estructurado, visualmente atractivo y con ejercicios aplicables desde el primer día. Se nota el cariño con que fue hecho.",
  },
  {
    id: 7,
    name: "Isabella Vega",
    image: "/test7.jpg",
    text: "Cada clase es clara, directa y sin relleno innecesario. El diseño de los recursos y el acompañamiento del equipo hicieron que todo fluyera de forma natural. ¡Gracias por tanto valor entregado!",
  },
  {
    id: 8,
    name: "Matías Díaz",
    image: "/test8.jpg",
    text: "Me sentí acompañado en todo momento. Los ejemplos, los ejercicios y la comunidad hicieron que aprender UX fuera menos intimidante y más accesible. Es la mejor inversión que he hecho en formación.",
  },
  {
    id: 9,
    name: "Antonia Silva",
    image: "/test9.jpg",
    text: "Lo recomendaría a cualquier persona que quiera aprender diseño centrado en el usuario desde cero. Todo está muy bien explicado, y el estilo visual lo hace súper ameno. Se nota que lo hicieron con amor.",
  },
];

export default function TestimonialsSection() {
  return (
    <div>
      <p className="text-base ml-28 mb-2 text-gray-500">
        Lo que dicen nuestros estudiantes
      </p>
      <h1 className="text-5xl font-black text-left max-w-[800px] ml-28 mb-4">
        Ellos confiaron en nosotros y hoy tienen una historia que contar.
      </h1>
      <div className="bg-white rounded-2xl p-4 shadow-md max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-4 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-13 h-13 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-700 mt-2">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
