// app/components/NavClient.jsx
"use client";
import { useEffect, useState } from "react";
import { getUser, clearSession } from "../lib/auth";

export default function NavClient() {
  const [role, setRole] = useState(null);

  useEffect(() => { setRole(getUser()?.role || null); }, []);

  return (
    <nav className="nav">
      <a href="/">Home</a>
      <a href="/ranking">Ranking</a>

      {/* participante e admin podem enviar entregáveis */}
      {(role === "participant" || role === "admin") && <a href="/team">Enviar Entregáveis</a>}

      {/* juiz e admin veem o painel do juiz */}
      {(role === "judge" || role === "admin") && <a href="/judge">Painel do Juiz</a>}

      {/* só admin vê o painel admin */}
      {role === "admin" && <a href="/admin">Admin</a>}

      {/* login / sair */}
      {!role ? (
        <a href="/login">Entrar</a>
      ) : (
        <a
          href="#"
          onClick={(e)=>{ e.preventDefault(); clearSession(); location.href="/"; }}
          title="Sair"
        >
          Sair
        </a>
      )}
    </nav>
  );
}
