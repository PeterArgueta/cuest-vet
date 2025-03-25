
import React, { useState } from "react";
import cuestionario from "./cuestionario_expandido_completo.json";

export default function CuestionarioApp() {
  const temas = Object.keys(cuestionario);
  const [temaSeleccionado, setTemaSeleccionado] = useState(temas[0]);
  const preguntas = cuestionario[temaSeleccionado];

  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleSelect = (index, opcion) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = opcion;
    setRespuestas(nuevasRespuestas);
  };

  const calcularPuntaje = () => {
    return preguntas.filter((p, i) => p.respuesta_correcta === respuestas[i]).length;
  };

  const reiniciar = () => {
    setRespuestas(Array(preguntas.length).fill(null));
    setMostrarResultados(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
          Cuestionario Veterinaria
        </h1>

        <div className="mb-8">
          <label className="block font-semibold mb-2 text-slate-700">Selecciona un tema:</label>
          <select
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm bg-white"
            value={temaSeleccionado}
            onChange={(e) => {
              setTemaSeleccionado(e.target.value);
              setRespuestas(Array(cuestionario[e.target.value].length).fill(null));
              setMostrarResultados(false);
            }}
          >
            {temas.map((tema, i) => (
              <option key={i} value={tema}>{tema}</option>
            ))}
          </select>
        </div>

        {preguntas.map((pregunta, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
            <p className="text-lg font-semibold text-slate-800 mb-2">{index + 1}. {pregunta.pregunta}</p>
            <p className="text-sm italic text-gray-500 mb-4">({pregunta.tipo})</p>
            {pregunta.opciones.map((opcion, i) => (
              <label key={i} className={`block cursor-pointer p-3 rounded-lg border transition duration-300 mb-2 ${
                respuestas[index] === opcion
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 hover:bg-blue-50 border-gray-300"
              }`}>
                <input
                  type="radio"
                  name={`pregunta-${index}`}
                  value={opcion}
                  checked={respuestas[index] === opcion}
                  onChange={() => handleSelect(index, opcion)}
                  className="mr-2"
                />
                {opcion}
              </label>
            ))}
            {mostrarResultados && (
              <p className={`mt-3 text-sm font-semibold ${
                respuestas[index] === pregunta.respuesta_correcta
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {respuestas[index] === pregunta.respuesta_correcta
                  ? "Correcto ✅"
                  : `Incorrecto ❌ — Correcta: ${pregunta.respuesta_correcta}`}
              </p>
            )}
          </div>
        ))}

        {!mostrarResultados ? (
          <button
            onClick={() => setMostrarResultados(true)}
            className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Ver resultados
          </button>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-slate-800">
              Puntaje: {calcularPuntaje()} / {preguntas.length}
            </p>
            <button
              onClick={reiniciar}
              className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Reiniciar cuestionario
            </button>
          </div>
        )}
      </div>
    </div>
  );
}