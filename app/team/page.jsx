// app/team/page.jsx
"use client";

import { useEffect, useState } from "react";
import RequireRole from "../components/RequireRole";
import { getToken } from "../lib/auth";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Team() {
  return (
    <RequireRole roles={["participant", "admin"]}>
      <TeamInner />
    </RequireRole>
  );
}

function TeamInner() {
  const [team, setTeam] = useState(1);
  const [email, setEmail] = useState("");
  const [log, setLog] = useState("");

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setEmail(u?.email || "");
    } catch {}
  }, []);

  async function upload(tipo, file) {
    setLog("");
    const tok = getToken();
    if (!tok) return setLog("Faça login em /login");
    if (!file) return alert("Selecione um PDF");
    const fd = new FormData();
    fd.append("team_numero", String(team));
    fd.append("tipo", tipo);
    fd.append("file", file);
    const r = await fetch(`${API}/deliverables/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${tok}` },
      body: fd,
    });
    const j = await r.json();
    setLog(JSON.stringify(j, null, 2));
  }

  async function salvarLink() {
    setLog("");
    const tok = getToken();
    if (!tok) return setLog("Faça login em /login");
    const url = prompt("Cole o link https:// (repo, demo ou vídeo)");
    if (!url || !/^https?:\/\//i.test(url)) return;
    const r = await fetch(`${API}/deliverables/link`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${tok}` },
      body: JSON.stringify({ team_numero: team, url }),
    });
    const j = await r.json();
    setLog(JSON.stringify(j, null, 2));
  }

  return (
    <main className="grid">
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Envio de Entregáveis</h2>
        <p className="note">Logado como: <b>{email || "—"}</b></p>
        <label>Equipe
          <input className="input" type="number" min={1} max={10}
