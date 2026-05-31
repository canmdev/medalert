type EmergencyCardProps = {
  name: string;
  condition: string;
  allergies: string;
  medications: string;
  instructions: string;
  emergencyContact: string;
};

export default function EmergencyCard({
  name,
  condition,
  allergies,
  medications,
  instructions,
  emergencyContact,
}: EmergencyCardProps) {
  return (
    <div style={{ border: "2px solid red", padding: "16px", borderRadius: "10px" }}>
      <h2>⚠️ Ficha Médica de Emergencia</h2>

      <p><strong>Nombre:</strong> {name}</p>
      <p><strong>Condición:</strong> {condition}</p>
      <p><strong>Alergias:</strong> {allergies}</p>
      <p><strong>Medicamentos:</strong> {medications}</p>
      <p><strong>Instrucciones:</strong> {instructions}</p>
      <p><strong>Contacto de emergencia:</strong> {emergencyContact}</p>
    </div>
  );
}