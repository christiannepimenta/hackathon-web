// app/judge/page.jsx
"use client";
import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Judge() {
  const [email, setEmail] = useState("");
  const [team, setTeam]   = useState(1);
  const [msg, setMsg]     = useState("");
  const [busy, setBusy]   = useState(false);

  const [c20, setC20] = useState(0);
  const [m30, setM30] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [px, setPx] = useState(0);

  async function post(body){
    setBusy(true); setMsg("");
    try{
      const r = await fetch(`${API}/scores`, {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(body)
      });
      const j = await r.json();
      setMsg(JSON.stringify(j,null,2));
    }catch(e){ setMsg(String(e)); }
    setBusy(false);
  }

  return (
    <main className="grid">
      <section className="card">
        <h2 style={{marginTop:0}}>Painel do Juiz</h2>
        <div className="grid grid-2">
          <label>Seu e-mail
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="juiz@exemplo.com"/>
          </label>
          <label>Número do time
            <input className="input" type="number" min={1} max={10} value={team} onChange={e=>setTeam(Number(e.target.value))}/>
          </label>
        </div>
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
            <span className="badge">{p2}</span>
          </label>
          <label>Inovação
            <input type="range" min="0" max="100" value={p3} onChange={e=>setP3(Number(e.target.value))}/>
            <span className="badge">{p3}</span>
          </label>
          <label>Viabilidade
            <input type="range" min="0" max="100" value={p4} onChange={e=>setP4(Number(e.target.value))}/>
            <span className="badge">{p4}</span>
          </label>
          <label>Extra (opcional)
            <input type="range" min="0" max="100" value={px} onChange={e=>setPx(Number(e.target.value))}/>
            <span className="badge">{px}</span>
          </label>
        </div>
        <div style={{marginTop:12}}>
          <button className="btn" disabled={busy}
            onClick={()=>post({
              judge_email:email, team_numero:team, etapa:"pitch",
              impacto_0a100:p1, modelo_0a100:p2, inovacao_0a100:p3,
              viabilidade_0a100:p4, criterio_extra_0a100:px
            })}>
            Salvar Pitch
          </button>
        </div>
      </section>

      {msg && <pre className="log">{msg}</pre>}
    </main>
  );
}
