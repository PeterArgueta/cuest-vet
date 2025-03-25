
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cuestionario Veterinaria</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Selecciona un tema:</label>
        <select
          className="w-full p-2 border rounded"
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
        <div key={index} className="mb-6 border p-4 rounded shadow">
          <p className="font-semibold">{index + 1}. {pregunta.pregunta}</p>
          <p className="text-sm italic text-gray-600 mb-2">({pregunta.tipo})</p>
          {pregunta.opciones.map((opcion, i) => (
            <label key={i} className="block">
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
            <p className={`mt-2 text-sm font-semibold ${respuestas[index] === pregunta.respuesta_correcta ? 'text-green-600' : 'text-red-600'}`}>
              {respuestas[index] === pregunta.respuesta_correcta ? 'Correcto ✅' : `Incorrecto ❌ — Correcta: ${pregunta.respuesta_correcta}`}
            </p>
          )}
        </div>
      ))}

      {!mostrarResultados ? (
        <button
          onClick={() => setMostrarResultados(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ver resultados
        </button>
      ) : (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">Puntaje: {calcularPuntaje()} / {preguntas.length}</p>
          <button
            onClick={reiniciar}
            className="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}
