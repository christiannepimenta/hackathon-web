"use client";
import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Team() {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(1);
  const [log, setLog] = useState("");

  useEffect(()=>{
    fetch("/api/auth/session").then(r=>r.json()).then(s=>setEmail(s?.user?.email || ""));
  },[]);

  async function upload(tipo, file) {
    if (!email) { setLog("Faça login em /api/auth/signin"); return; }
    if (!file) return alert("Selecione um PDF");
    const fd = new FormData();
    fd.append("team_numero", String(team));
    fd.append("tipo", tipo);
    fd.append("file", file);
    const r = await fetch(`${API}/deliverables/upload`, { method:"POST", body: fd });
    const j = await r.json(); setLog(JSON.stringify(j,null,2));
  }

  async function salvarLink() {
    if (!email) { setLog("Faça login em /api/auth/signin"); return; }
    const url = prompt("Cole o link https:// (repo, demo ou vídeo)");
    if (!url || !/^https?:\/\//i.test(url)) return;
    const r = await fetch(`${API}/deliverables/link`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ team_numero: team, url })
    });
    const j = await r.json(); setLog(JSON.stringify(j,null,2));
  }

  return (
    <main className="grid">
      <section className="card">
        <h2 style={{marginTop:0}}>Envio de Entregáveis</h2>
        <p className="note">Logado como: <b>{email || "não autenticado"}</b> — <a href="/api/auth/signin">Entrar</a> / <a href="/api/auth/signout">Sair</a></p>
        <label>Equipe
          <input className="input" type="number" min={1} max={10}
                 value={team} onChange={e=>setTeam(Number(e.target.value))}/>
        </label>
      </section>

      <section className="card grid grid-2">
        <div>
          <h3 style={{marginTop:0}}>Canvas (PDF)</h3>
          <input type="file" accept="application/pdf" onChange={e=>upload("canvas_pdf", e.target.files?.[0])}/>
        </div>
        <div>
          <h3 style={{marginTop:0}}>MVP — One-Pager (PDF)</h3>
          <input type="file" accept="application/pdf" onChange={e=>upload("mvp_onepager_pdf", e.target.files?.[0])}/>
        </div>
        <div>
          <h3 style={{marginTop:0}}>MVP — Link</h3>
          <button className="btn secondary" onClick={salvarLink}>Salvar link</button>
        </div>
        <div>
          <h3 style={{marginTop:0}}>Pitch (PDF)</h3>
          <input type="file" accept="application/pdf" onChange={e=>upload("pitch_pdf", e.target.files?.[0])}/>
        </div>
      </section>

      {log && <pre className="log">{log}</pre>}
    </main>
  );
}
