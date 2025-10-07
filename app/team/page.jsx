"use client";

import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Team() {
  const [team, setTeam] = useState(1);
  const [out, setOut]   = useState("");

  async function upload(tipo, file) {
    if (!file) return alert("Selecione um PDF");
    const fd = new FormData();
    fd.append("team_numero", String(team));
    fd.append("tipo", tipo);
    fd.append("file", file);
    const r = await fetch(`${API}/deliverables/upload`, { method:"POST", body: fd });
    const j = await r.json(); setOut(JSON.stringify(j,null,2));
  }

  async function salvarLink(url) {
    if (!/^https?:\/\//i.test(url)) return alert("URL inválida");
    const r = await fetch(`${API}/deliverables/link`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ team_numero: team, url })
    });
    const j = await r.json(); setOut(JSON.stringify(j,null,2));
  }

  return (
    <main>
      <h2>Uploads — Equipe</h2>
      <label>Equipe:
        <input type="number" min={1} max={10} value={team} onChange={e=>setTeam(Number(e.target.value))}/>
      </label>

      <section>
        <h3>Canvas (PDF)</h3>
        <input type="file" accept="application/pdf" onChange={e=>upload("canvas_pdf", e.target.files?.[0])}/>
      </section>

      <section>
        <h3>MVP — One-Pager (PDF)</h3>
        <input type="file" accept="application/pdf" onChange={e=>upload("mvp_onepager_pdf", e.target.files?.[0])}/>
      </section>

      <section>
        <h3>MVP — Link (repositório / demo / vídeo)</h3>
        <input type="url" placeholder="https://..." onKeyDown={e=>{ if(e.key==='Enter') salvarLink(e.currentTarget.value); }} />
        <button onClick={()=>salvarLink(prompt("Cole o link https://") || "")}>Salvar link</button>
      </section>

      <section>
        <h3>Pitch (PDF)</h3>
        <input type="file" accept="application/pdf" onChange={e=>upload("pitch_pdf", e.target.files?.[0])}/>
      </section>

      <pre style={{background:"#f7f7f7", padding:12, borderRadius:8}}>{out}</pre>
    </main>
  );
}
