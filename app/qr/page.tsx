"use client";

import QRCode from "react-qr-code";

export default function QRPage() {
  const url = "http://localhost:3000/e/juan-perez";

  return (
    <main style={{ textAlign: "center", padding: "40px" }}>
      <h1>QR MedAlert</h1>

      <p>Escanea para ver ficha médica</p>

      <div style={{ marginTop: "20px" }}>
        <QRCode value={url} />
      </div>

      <p style={{ marginTop: "20px" }}>{url}</p>
    </main>
  );
}