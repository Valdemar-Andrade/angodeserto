"use client";

import { useState, type FormEvent } from "react";
import { adminRequest } from "./request";

export default function AdminLogin({ enabled }: { enabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !enabled) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setFailure("");
    try {
      await adminRequest("/api/admin/login", {
        username: fields.get("username"),
        password: fields.get("password"),
      });
      form.reset();
      window.location.reload();
    } catch (error) {
      const password = form.elements.namedItem("password");
      if (password instanceof HTMLInputElement) password.value = "";
      setFailure(error instanceof Error ? error.message : "Não foi possível entrar.");
      setBusy(false);
    }
  }

  return (
    <section className="admin-login admin-panel" aria-labelledby="admin-login-title">
      <h1 id="admin-login-title">Entrar</h1>
      <form method="post" onSubmit={login}>
        <fieldset disabled={!enabled || busy}>
          <label htmlFor="admin-username">Username</label>
          <input id="admin-username" name="username" autoComplete="username" required maxLength={80} />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={256} />
          <button type="submit" className="admin-button admin-button--solid">{busy ? "A entrar…" : "Entrar"}</button>
        </fieldset>
        {failure && <p className="admin-notice admin-notice--error" role="alert">{failure}</p>}
        {!enabled && <p className="admin-notice" role="status">O painel ainda não está configurado neste ambiente.</p>}
      </form>
    </section>
  );
}
