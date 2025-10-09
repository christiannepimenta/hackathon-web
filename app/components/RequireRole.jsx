// app/components/RequireRole.jsx
"use client";
import { useEffect, useState } from "react";
import { getToken, getUser, clearSession } from "../lib/auth";

export default function RequireRole({ roles, children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const t = getToken();
    const u = getUser();
    if (!t || !u) { setOk(false); return; }
    if (!roles || roles.length === 0 || roles.includes(u.role)) setOk(true);
    else setOk(false);
  }, [roles]);

  if (ok === null) return <p className="note">Verificando acesso…</p>;
  if (!ok) {
    // opcional: limpar sessão inválida
    // clearSession();
    if (typeof window !== "undefined") window.location.href = "/forbidden";
    return null;
  }
  return children;
}
