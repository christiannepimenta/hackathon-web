// app/judge/page.jsx
"use client";

import { useState, useEffect } from "react";
import RequireRole from "../components/RequireRole";
import { getToken } from "../lib/auth";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Judge() {
  return (
    <RequireRole roles={["judge", "admin"]}>
      <JudgeInner />
    </RequireRole>
  );
}

function JudgeInner() {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(1);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // sliders
  const [c20, setC20] = useState(0);
  const [m30, setM30] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [px, setPx] = useState(0);

  useEffect(() => {
    // pega user do localStorage só para mostrar o email
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      setEmail(u?.email || "");
    } catch {}
  }, []);

  async function post(body) {
    setMsg("");
    const tok = getToken();
    if (!tok) {
      setMsg("Faça login em /login");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`${API}/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tok}`,
        },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Erro ao salvar");
      setMsg("Salvo com sucesso ✅");
    } catch (e) {
      setMsg(String(e.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid">
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Painel do Juiz</h2>
        <p className="note">
          Logado como: <b>{email || "—"}</b>
        </p>
        <label>Número do time
          <input className="input" type="number" min={1} max={10}
                 value={team} onChange={(e)=>setTeam(Number(e.target.value))}/>
        </label>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Canvas (0–20)</h3>
        <div className="kv">
          <input type="range" min="0" max="20" value={c20} onChange={e=>setC20(Number(e.target.value))}/>
          <span className="badge">{c20}</span>
          <button className="btn" disabled={busy}
            onClick={()=>post({ judge_email:email, team_numero:team, etapa:"canvas", canvas_0a20:c20 })}>
            Salvar Canvas
          </button>
        </div>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>MVP (0–30)</h3>
        <div className="kv">
          <input type="range" min="0" max="30" value={m30} onChange={e=>setM30(Number(e.target.value))}/>
          <span className="badge">{m30}</span>
          <button className="btn" disabled={busy}
            onClick={()=>post({ judge_email:email, team_numero:team, etapa:"mvp", mvp_0a30:m30 })}>
            Salvar MVP
          </button>
        </div>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Pitch — critérios (0–100)</h3>
        <div className="grid grid-2">
          <label>Impacto
            <input type="range" min="0" max="100" value={p1} onChange={e=>setP1(Number(e.target.value))}/>
            <span className="badge">{p1}</span>
          </label>
          <label>Modelo
            <input type="range" min="0" max="100" value={p2} onChange={e=>setP2(Number(e.target.value))}/>
            <
