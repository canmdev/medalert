import { supabase } from "@/lib/supabase";
import EmergencyCard from "../components/EmergencyCard";

export default async function Home() {
  const { data: patients } = await supabase
    .from("patients")
    .select("*");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* HEADER */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight">
            MedAlert
          </h1>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="max-w-6xl mx-auto px-6 py-8">

        {/* GRID */}
        {!patients?.length ? (
          <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
            <p className="text-gray-500">
              No hay pacientes registrados
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {patients.map((patient) => (
              <div
                key={patient.id}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                "
              >
                <EmergencyCard
                  name={patient.name}
                  condition={patient.condition}
                  allergies={patient.allergies}
                  medications={patient.medications}
                  instructions={patient.instructions}
                  emergencyContact={patient.emergency_contact}
                />
              </div>
            ))}

          </div>
        )}

      </section>
    </main>
  );
}