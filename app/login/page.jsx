"use client";
import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPass]=useState("");
  const [msg,setMsg]=useState("");

  async function onSubmit(e){
    e.preventDefault();
    setMsg("");
    const r = await fetch(`${API}/auth/login`, {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, password })
    });
    const j = await r.json();
    if (!r.ok) return setMsg(j.error || "erro");
    localStorage.setItem("token", j.token);
    localStorage.setItem("user", JSON.stringify(j.user));
    location.href = "/";
  }

  return (
    <main className="grid">
      <section className="card">
        <h2>Entrar</h2>
        <form onSubmit={onSubmit} className="grid">
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/>
          <input className="input" type="password" value={password} onChange={e=>setPass(e.target.value)} placeholder="senha"/>
          <button className="btn">Entrar</button>
        </form>
        {msg && <p className="note">{msg}</p>}
      </section>
    </main>
  );
}
