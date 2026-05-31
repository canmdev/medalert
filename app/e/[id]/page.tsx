import { supabase } from "../../../lib/supabase";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: patient } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (!patient) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-red-600 text-xl font-bold">
          Paciente no encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-red-50 p-4 flex items-center justify-center">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border-t-8 border-red-600 p-5">

        {/* HEADER CRÍTICO */}
        <h1 className="text-center text-red-600 font-bold text-lg">
          🚑 FICHA MÉDICA DE EMERGENCIA
        </h1>

        <h2 className="text-center text-2xl font-bold mt-2">
          {patient.name}
        </h2>

        {/* ALERTAS CRÍTICAS */}
        <div className="mt-5 space-y-3">

          <div className="bg-red-100 border border-red-400 p-3 rounded-xl">
            <p className="font-bold text-red-700">⚠️ Alergias</p>
            <p className="text-red-900">
              {patient.allergies || "No registradas"}
            </p>
          </div>

          <div className="bg-blue-100 border border-blue-400 p-3 rounded-xl">
            <p className="font-bold text-blue-700">💊 Medicamentos</p>
            <p className="text-blue-900">
              {patient.medications || "No registrados"}
            </p>
          </div>

          <div className="bg-yellow-100 border border-yellow-400 p-3 rounded-xl">
            <p className="font-bold text-yellow-700">🧠 Condición médica</p>
            <p className="text-yellow-900">
              {patient.condition || "No registrada"}
            </p>
          </div>

        </div>

        {/* INSTRUCCIONES */}
        <div className="mt-5 bg-gray-100 p-3 rounded-xl">
          <p className="font-bold">📌 Instrucciones</p>
          <p className="text-gray-700 text-sm mt-1">
            {patient.instructions || "Sin instrucciones especiales"}
          </p>
        </div>

        {/* ACCIONES CRÍTICAS */}
        <div className="mt-6 space-y-2">

          <a
            href={`tel:${patient.emergency_contact}`}
            className="block text-center bg-green-600 text-white font-bold py-3 rounded-xl"
          >
            📞 Llamar contacto de emergencia
          </a>

          <a
            href="tel:131"
            className="block text-center bg-red-600 text-white font-bold py-3 rounded-xl"
          >
            🚨 Llamar ambulancia (131)
          </a>

        </div>

      </div>
    </main>
  );
}