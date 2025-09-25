"use client";

const faqs = [
  {
    question: "¿Puedo inscribirme sin experiencia previa?",
    answer:
      "¡Sí! Nuestros cursos están diseñados tanto para principiantes como para quienes ya tienen conocimientos previos. Te llevamos paso a paso.",
  },
  {
    question: "¿Los cursos incluyen certificado?",
    answer:
      "Todos los cursos incluyen certificado digital una vez completados. Podrás descargarlo y compartirlo en tus redes o portafolio profesional.",
  },
  {
    question: "¿Los videos están disponibles de forma permanente?",
    answer:
      "Tendrás acceso ilimitado a los videos del curso una vez que te inscribas. Puedes repasar las lecciones cuando lo necesites.",
  },
  {
    question: "¿Puedo acceder desde mi celular?",
    answer:
      "Claro. Nuestra plataforma es responsiva y funciona perfectamente desde computadoras, tablets y smartphones.",
  },
  {
    question: "¿Hay soporte si tengo dudas durante el curso?",
    answer:
      "Sí. Cada curso cuenta con soporte técnico y académico para ayudarte durante tu aprendizaje. También puedes acceder a foros de estudiantes.",
  },
  {
    question: "¿Se puede pagar en cuotas?",
    answer:
      "Aceptamos pagos con tarjeta de crédito y débito. En algunos países también ofrecemos opciones de pago en cuotas según el proveedor.",
  },
  {
    question: "¿Qué plataformas usan para alojar los videos?",
    answer:
      "Utilizamos servidores privados y seguros para alojar los contenidos, garantizando acceso rápido y sin interrupciones.",
  },
  {
    question: "¿Puedo cancelar mi suscripción?",
    answer:
      "Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil. El acceso se mantendrá hasta el final del ciclo de pago.",
  },
  {
    question: "¿Puedo ver una clase antes de comprar?",
    answer:
      "Muchos de nuestros cursos ofrecen una lección gratuita de muestra para que puedas evaluar el contenido antes de inscribirte.",
  },
  {
    question: "¿Cómo contacto con soporte?",
    answer:
      "Puedes escribirnos desde el chat de la plataforma o enviar un correo a soporte@tucurso.com. Respondemos en menos de 24 horas.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-28">
      <p className="text-base text-gray-500">Preguntas frecuentes</p>
      <h1 className="text-5xl font-black text-gray-900 mt-2 mb-2 max-w-3xl">
        Aclaramos tus dudas para que tomes decisiones con confianza.
      </h1>
      <div className="bg-gray-50 rounded-3xl shadow-md p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
