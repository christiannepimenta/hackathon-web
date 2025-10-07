"use client";

import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Judge() {
  const [email, setEmail] = useState("");
  const [team, setTeam]   = useState(1);
  const [c20, setC20]     = useState(0);
  const [m30, setM30]     = useState(0);
  const [p1, setP1]       = useState(0);
  const [p2, setP2]       = useState(0);
  const [p3, setP3]       = useState(0);
  const [p4, setP4]       = useState(0);
  const [px, setPx]       = useState(0);
  const [out, setOut]     = useState("");

  async function post(body) {
    const r = await fetch(`${API}/scores`, {
      method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)
    });
    const j = await r.json(); setOut(JSON.stringify(j,null,2));
  }

  return (
    <main>
      <h2>Lançar notas (Juiz)</h2>
      <label>Email do juiz: <input value={email} onChange={e=>setEmail(e.target.value)} /></label><br/>
      <label>Equipe: <input type="number" min={1} max={10} value={team} onChange={e=>setTeam(Number(e.target.value))}/></label>

      <h3>Canvas (0–20)</h3>
      <input type="range" min="0" max="20" value={c20} onChange={e=>setC20(Number(e.target.value))}/> {c20}
      <button onClick={()=>post({ judge_email:email, team_numero:team, etapa:"canvas", canvas_0a20:c20 })}>Salvar Canvas</button>

      <h3>MVP (0–30)</h3>
      <input type="range" min="0" max="30" value={m30} onChange={e=>setM30(Number(e.target.value))}/> {m30}
      <button onClick={()=>post({ judge_email:email, team_numero:team, etapa:"mvp", mvp_0a30:m30 })}>Salvar MVP</button>

      <h3>Pitch (0–100 cada)</h3>
      <div>Impacto: <input type="range" min="0" max="100" value={p1} onChange={e=>setP1(Number(e.target.value))}/> {p1}</div>
      <div>Modelo:  <input type="range" min="0" max="100" value={p2} onChange={e=>setP2(Number(e.target.value))}/> {p2}</div>
      <div>Inovação:<input type="range" min="0" max="100" value={p3} onChange={e=>setP3(Number(e.target.value))}/> {p3}</div>
      <div>Viab.:    <input type="range" min="0" max="100" value={p4} onChange={e=>setP4(Number(e.target.value))}/> {p4}</div>
      <div>Extra:    <input type="range" min="0" max="100" value={px} onChange={e=>setPx(Number(e.target.value))}/> {px}</div>
      <button onClick={()=>post({
        judge_email:email, team_numero:team, etapa:"pitch",
        impacto_0a100:p1, modelo_0a100:p2, inovacao_0a100:p3, viabilidade_0a100:p4, criterio_extra_0a100:px
      })}>Salvar Pitch</button>

      <pre style={{background:"#f7f7f7", padding:12, borderRadius:8}}>{out}</pre>
    </main>
  );
}
