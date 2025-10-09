// app/page.js
export default function Home() {
  return (
    <main style={{
      display: "grid",
      placeItems: "center",
      minHeight: "60vh"
    }}>
      {/* Ajuste width/alt conforme sua necessidade */}
      <img
        src="/hackathon-logo.png"
        alt="Hackathon GO! Uai Tech"
        style={{
          width: "320px",
          maxWidth: "80vw",
          height: "auto",
          filter: "drop-shadow(0 12px 32px rgba(0,0,0,.35))"
        }}
      />
    </main>
  );
}
