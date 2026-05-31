"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import QRCodeLib from "qrcode";
import { supabase } from "@/lib/supabase";

export default function QRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [patient, setPatient] = useState<any>(null);
  const [qrImage, setQrImage] = useState("");
  const [id, setId] = useState<string>("");

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setId(resolved.id);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const { data } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();

      setPatient(data);

      if (data) {
        const url = `${baseUrl}/e/${id}`;
        const img = await QRCodeLib.toDataURL(url);
        setQrImage(img);
      }
    }

    load();
  }, [id]);

  if (!id) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando QR...</p>
      </main>
    );
  }

  if (!patient) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 font-semibold">
          Paciente no encontrado
        </p>
      </main>
    );
  }

  const url = `${baseUrl}/e/${id}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border-t-8 border-black">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">
            MedAlert
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            QR de acceso a emergencia médica
          </p>
        </div>

        {/* PACIENTE */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-semibold">
            {patient.name}
          </h2>

          <p className="text-gray-400 text-sm">
            ID: {id}
          </p>
        </div>

        {/* QR BOX */}
        <div className="mt-6 flex justify-center">
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <QRCode value={url} size={180} />
          </div>
        </div>

        {/* LINK */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 break-all">
            {url}
          </p>
        </div>

        {/* BOTÓN DESCARGA */}
        {qrImage && (
          <a
            href={qrImage}
            download={`MedAlert-QR-${id}.png`}
            className="mt-6 block text-center bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
          >
            ⬇ Descargar QR
          </a>
        )}

        {/* FOOTER INFO */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Este código permite acceso directo a información médica de emergencia
        </p>

      </div>
    </main>
  );
}