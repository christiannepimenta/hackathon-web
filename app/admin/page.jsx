// app/admin/page.jsx
"use client";

import { useEffect, useState } from "react";
import RequireRole from "../components/RequireRole";
import { getToken } from "../lib/auth";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Admin() {
  return (
    <RequireRole roles={["admin"]}>
      <AdminInner />
    </RequireRole>
  );
}

function AdminInner() {
  const tok = getToken();
  const [users, setUsers] = useState([]);
  const [f, setF] = useState({
    nome: "",
    email: "",
    role: "judge",        // judge | participant | admin
    team_numero: "",      // obrigatório p/ participant (1..10)
    password: ""          // senha temporária
  });

  useEffect(() => {
    if (!tok) { location.href="/login"; return; }
    fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${tok}` } })
      .then(r => r.json())
      .then(j => Array.isArray(j) ? setUsers(j) : setUsers([]))
      .catch(() => {});
  }, []);

  function onChange(k, v) { setF(prev => ({ ...prev, [k]: v })); }

  async function addUser() {
    if (!f.email || !f.role || !f.password) {
      alert("Preencha email, role e senha.");
      return;
    }
    if (f.role === "participant" && !f.team_numero) {
      alert("Para participant informe team_numero (1..10).");
      return;
    }
    const r = await fetch(`${API}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tok}`
      },
      body: JSON.stringify(f)
    });
    const j = await r.json();
    if (!r.ok) return alert(j.error || "Erro ao criar usuário");
    setUsers(prev => [...prev, j.user]);
    setF({ nome:"", email:"", role:"judge", team_numero:"", password:"" });
  }

  return (
    <main className="grid">
      <section className="card">
        <h2 style={{marginTop:0}}>Admin — criar usuários</h2>
        <div className="grid grid-2">
          <input className="input" placeholder="nome"
                 value={f.nome} onChange={e=>onChange("nome", e.target.value)} />
          <input className="input" placeholder="email"
                 value={f.email} onChange={e=>onChange("email", e.target.value)} />
          <select value={f.role} onChange={e=>onChange("role", e.target.value)}>
            <option value="judge">judge</option>
            <option value="participant">participant</option>
            <option value="admin">admin</option>
          </select>
          <input className="input" placeholder="team_numero (1..10) p/ participant"
                 value={f.team_numero} onChange={e=>onChange("team_numero", e.target.value)} />
          <input className="input" placeholder="senha temporária"
                 value={f.password} onChange={e=>onChange("password", e.target.value)} />
          <button className="btn" onClick={addUser}>Criar</button>
        </div>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Usuários</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>email</th><th>role</th><th>team_id</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.team_id ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Para <b>participant</b>, informe o <b>team_numero</b>.  
          Juízes são adicionados automaticamente na tabela <code>judges</code>.
        </p>
      </section>
    </main>
  );
}
