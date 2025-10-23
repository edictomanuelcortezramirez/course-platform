"use client";
import { useState, useEffect } from "react";
import { Video, FileText, PlusCircle, HelpCircle, X } from "lucide-react";

export default function CreateCourse({
  existingCourse = null,
  isEditing = false,
}) {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [accessType, setAccessType] = useState("unlimited");
  const [certification, setCertification] = useState(true);
  const [evaluation, setEvaluation] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [language, setLanguage] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [modules, setModules] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState("");

  useEffect(() => {
    if (existingCourse) {
      setTitle(existingCourse.title || "");
      setShortDescription(existingCourse.shortDescription || ""); 
      setDescription(existingCourse.description || "");
      setPrice(existingCourse.price || "");
      setAccessType(existingCourse.accessType || "unlimited");
      setCertification(existingCourse.hasCertificate ?? true);
      setEvaluation(existingCourse.hasEvaluation ?? true);
      setIsPaid(existingCourse.isPaid ?? false);
      setLanguage(existingCourse.language || "");
      setUpdateDate(
        existingCourse.updateDate ? existingCourse.updateDate.split("T")[0] : ""
      );
      setImagePreview(existingCourse.image || "");
      setWhatYouWillLearn(existingCourse.whatYouWillLearn || "");

      const mappedModules = existingCourse.modules?.map((m) => ({
        id: m.id || Date.now() + Math.random(),
        name: m.title || "",
        sections: m.sections?.map((s) => ({
          id: s.id || Date.now() + Math.random(),
          name: s.title || "",
          video: s.videoUrl || "",
          material: s.material || "",
          duration: s.duration || "", 
        })) || [
          {
            id: Date.now() + Math.random(),
            name: "",
            video: "",
            material: "",
            duration: "",
          },
        ],
      })) || [
        {
          id: Date.now(),
          name: "",
          sections: [
            {
              id: Date.now() + 1,
              name: "",
              video: "",
              material: "",
              duration: "",
            },
          ],
        },
      ];

      setModules(mappedModules);
    } else {
      setModules([
        {
          id: Date.now(),
          name: "",
          sections: [
            {
              id: Date.now() + 1,
              name: "",
              video: "",
              material: "",
              duration: "",
            },
          ],
        },
      ]);
    }
  }, [existingCourse]);

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(),
        name: "",
        sections: [{ id: Date.now() + 1, name: "", video: "", material: "" }],
      },
    ]);
  };

  const removeModule = (moduleId) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  const addSection = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections.push({
      id: Date.now(),
      name: "",
      video: "",
      material: "",
    });
    setModules(updatedModules);
  };

  const removeSection = (moduleIndex, sectionId) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections = updatedModules[
      moduleIndex
    ].sections.filter((s) => s.id !== sectionId);
    setModules(updatedModules);
  };

  const handleSectionChange = (moduleIndex, sectionIndex, field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].sections[sectionIndex][field] = value;
    setModules(updatedModules);
  };

  const onConfirm = async () => {
    let imageBase64 = "";

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        imageBase64 = reader.result;
        await sendCourse(imageBase64);
      };
    } else {
      await sendCourse(imagePreview);
    }
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const sendCourse = async (imageData) => {
    const payload = {
      title,
      shortDescription, 
      description,
      price: parseFloat(price) || 0,
      image: imageData || "",
      modules,
      accessType,
      hasCertificate: certification,
      hasEvaluation: evaluation,
      isPaid,
      language,
      updateDate,
      whatYouWillLearn,
    };

    try {
      const endpoint = isEditing
        ? `/api/courses/${existingCourse.id}`
        : "/api/courses/create";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert(
        isEditing ? "Curso actualizado con éxito" : "Curso creado con éxito"
      );
      window.location.href = "/pages/views/tutorcourses";
    } catch (err) {
      alert("Error inesperado al guardar curso.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800">
        {isEditing ? "Editar curso" : "Crear curso"}
      </h2>
      <p className="mt-2 text-gray-600 flex items-center gap-1">
        Aquí podrás {isEditing ? "editar" : "agregar"} un curso y sus lecciones.
        Consulta nuestra
        <HelpCircle className="w-5 h-5 text-gray-700 inline-block" />
        <span className="text-sm font-medium text-gray-700">Guía de uso</span>
      </p>

      <div className="mt-6 p-6 bg-white rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Características del Curso
        </h3>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Nombre del curso
            </label>
            <input
              type="text"
              placeholder="Nombre del curso"
              className="mt-1 p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Descripción corta */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Descripción corta
            </label>
            <textarea
              placeholder="Agrega una breve descripción"
              className={`mt-1 p-2 border rounded resize-none h-10 ${
                shortDescription.length > 90
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              value={shortDescription}
              onChange={(e) => {
                if (e.target.value.length <= 90) {
                  setShortDescription(e.target.value);
                } else {
                  setShortDescription(e.target.value.slice(0, 90));
                }
              }}
            />
            <span
              className={`text-xs mt-1 ${
                shortDescription.length >= 90 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {shortDescription.length}/90 caracteres
              {shortDescription.length >= 90 && " (límite alcanzado)"}
            </span>
          </div>

          {/* Descripción larga */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Descripción larga
            </label>
            <textarea
              placeholder="Describe el curso en detalle..."
              className="mt-1 p-2 border border-gray-300 rounded resize-none h-10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Modalidad */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Modalidad de acceso
            </label>
            <select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="unlimited">Acceso ilimitado</option>
              <option value="temporary">Temporal</option>
            </select>
          </div>

          {/* Certificación */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Certificación
            </label>
            <select
              value={certification ? "certified" : "nonCertified"}
              onChange={(e) => setCertification(e.target.value === "certified")}
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="certified">Certificado</option>
              <option value="nonCertified">Sin certificado</option>
            </select>
          </div>

          {/* Evaluación */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Evaluación
            </label>
            <select
              value={evaluation ? "evaluated" : "notEvaluated"}
              onChange={(e) => setEvaluation(e.target.value === "evaluated")}
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="evaluated">Evaluado</option>
              <option value="notEvaluated">Sin evaluación</option>
            </select>
          </div>

          {/* Pago */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Acceso</label>
            <select
              value={isPaid ? "paid" : "free"}
              onChange={(e) => setIsPaid(e.target.value === "paid")}
              className="mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="free">Gratis</option>
              <option value="paid">Pago</option>
            </select>
          </div>

          {/* Idioma */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Idioma del curso
            </label>
            <input
              type="text"
              placeholder="Ej: Español"
              className="mt-1 p-2 border border-gray-300 rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          {/* Fecha */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Fecha de actualización
            </label>
            <input
              type="date"
              className="mt-1 p-2 border border-gray-300 rounded"
              value={updateDate}
              onChange={(e) => setUpdateDate(e.target.value)}
            />
          </div>

          {/* Imagen */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Imagen del curso
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 p-2 border border-gray-300 rounded"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Precio individual
            </label>
            <input
              type="number"
              placeholder="Precio en USD"
              className="mt-1 p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </form>

        {/* Lo que aprenderás */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-2">
            Lo que aprenderán
          </h4>

          <textarea
            placeholder="Describe lo que aprenderán los estudiantes..."
            className="w-full p-2 border border-gray-300 rounded resize-none"
            value={whatYouWillLearn}
            onChange={(e) => setWhatYouWillLearn(e.target.value)}
          />
        </div>
      </div>

      {/* Módulos y Secciones */}
      <div className="mt-8 flex flex-wrap gap-6">
        {modules.map((module, moduleIndex) => (
          <div
            key={module.id}
            className="relative p-4 bg-white rounded-2xl shadow-md w-[calc(33.333%-1rem)]"
          >
            {moduleIndex > 0 && (
              <button
                type="button"
                onClick={() => removeModule(module.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {moduleIndex + 1}º Módulo
            </h3>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600">
                Nombre del módulo
              </label>
              <input
                type="text"
                value={module.name}
                onChange={(e) => {
                  const updatedModules = [...modules];
                  updatedModules[moduleIndex].name = e.target.value;
                  setModules(updatedModules);
                }}
                placeholder="Nombre del módulo"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Secciones del módulo
            </h4>

            {module.sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="mb-4 border p-4 rounded-lg relative"
              >
                {/* Nombre de sección */}
                <div className="flex flex-col mb-2">
                  <label className="text-sm font-medium text-gray-600 flex justify-between items-center">
                    <span>Nombre de la sección</span>
                    <span>({sectionIndex + 1})</span>
                  </label>
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) =>
                      handleSectionChange(
                        moduleIndex,
                        sectionIndex,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Nombre de la sección"
                    className="mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Video */}
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-5 h-5 text-gray-700" />
                  <input
                    type="url"
                    placeholder="Ingresa el enlace del video"
                    value={section.video}
                    onChange={(e) =>
                      handleSectionChange(
                        moduleIndex,
                        sectionIndex,
                        "video",
                        e.target.value
                      )
                    }
                    className="p-2 border border-gray-300 rounded w-[80%]"
                  />
                  <input
                    type="number"
                    placeholder="min"
                    min="0"
                    className="p-2 border border-gray-300 rounded w-[25%] text-center"
                    value={section.duration || ""}
                    onChange={(e) =>
                      handleSectionChange(
                        moduleIndex,
                        sectionIndex,
                        "duration",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Material */}
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <input
                    type="url"
                    placeholder="Enlace del material (PDF, Drive, etc.)"
                    value={section.material || ""}
                    onChange={(e) =>
                      handleSectionChange(
                        moduleIndex,
                        sectionIndex,
                        "material",
                        e.target.value
                      )
                    }
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                {/* Botón eliminar sección */}
                {sectionIndex === module.sections.length - 1 &&
                  module.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(moduleIndex, section.id)}
                      className="absolute -bottom-9 -right-0.5 w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addSection(moduleIndex)}
              className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Agregar sección
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addModule}
          className="p-6 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-400 flex flex-col items-center justify-center w-[calc(33.333%-1rem)] hover:bg-gray-200"
        >
          <PlusCircle className="w-8 h-8 text-gray-600" />
          <span className="mt-2 text-gray-700 font-medium">Agregar módulo</span>
        </button>
      </div>

      {/* Confirmación */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="uppercase tracking-widest inline-block mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          {isEditing ? "Guardar cambios" : "Crear curso"}
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              {isEditing
                ? "¿Deseas guardar los cambios de este curso?"
                : "¿Deseas crear este curso?"}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {isEditing
                ? "Se actualizarán los datos del curso seleccionado."
                : "Una vez creado, podrás editar los detalles desde tu panel."}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 mt-2 rounded tracking-widest bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={async () => {
                  setShowConfirm(false);
                  await onConfirm();
                }}
                className=" tracking-widest inline-block mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                {isEditing ? "Guardar cambios" : "Crear curso"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
