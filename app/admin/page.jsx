// app/admin/page.jsx
"use client";
import RequireRole from "../components/RequireRole";

export default function Admin() {
  return (
    <RequireRole roles={["admin"]}>
      <main className="grid">
        <section className="card">
          <h2 style={{marginTop:0}}>Admin</h2>
          <p className="note">Rota /admin carregada com sucesso.</p>
        </section>
      </main>
    </RequireRole>
  );
}
