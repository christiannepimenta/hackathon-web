"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Judge() {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(1);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  // pega e-mail logado no NextAuth (cookie de sessão)
  useEffect(() => {
    fetch("/api/auth/session").then(r=>r.json()).then(s=>{
      setEmail(s?.user?.email || "");
    });
  }, []);

  const [c20,setC20]=useState(0); const [m30,setM30]=useState(0);
  const [p1,setP1]=useState(0), [p2,setP2]=useState(0), [p3,setP3]=useState
