// app/lib/auth.js
"use client";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUser() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function hasRole(roles = []) {
  const u = getUser();
  if (!u) return false;
  if (roles.length === 0) return true;
  return roles.includes(u.role);
}
