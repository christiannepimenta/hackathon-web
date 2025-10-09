// app/login/page.jsx
"use client";

import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!email || !password) return setMsg("Preencha e-mail e senha.");
    setBusy(true);
    try {
      const r = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Falha no login");
      localStorage.setItem("token", j.token);
      localStorage.setItem("user", JSON.stringify(j.user));
      // redireciona pela role
      const role = j.user?.role;
      const go =
        role === "admin" ? "/admin" :
        role === "judge" ? "/judge" :
        role === "participant" ? "/team" : "/";
      window.location.href = go;
    } catch (err) {
      setMsg(String(err.message || err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid">
      <section className="card" style={{ maxWidth: 520 }}>
        <h2 style={{ marginTop: 0 }}>Entrar</h2>
        <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
          />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder="senha"
            autoComplete="current-password"
          />
          <button className="btn" disabled={busy}>
            {busy ? "Entrando..." : "Entrar"}
          </button>
        </form>
        {msg && <p className="note" style={{ marginTop: 10 }}>{msg}</p>}
      </section>
    </main>
  );
}
