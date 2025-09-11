export default function CourseCatalog() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
          {/* Lado izquierdo: título */}
          <div className="lg:w-2/3">
            <p className="text-base ml-2 mb-2 text-gray-500">
              Catálogo de cursos
            </p>
            <h1 className="text-5xl font-black text-left max-w-[800px] mb-4">
              Haz de tu vocación una inspiración siendo una manicurista excelente.
            </h1>
          </div>

          {/* Lado derecho: texto descriptivo */}
          <div className="lg:w-1/3">
            <p className="text-sm text-gray-600 leading-relaxed">
              En esta sección encontrarás una variedad de cursos diseñados para 
              que desarrolles tus habilidades, mejores tu técnica y logres un 
              estilo único en el mundo de la manicura profesional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
