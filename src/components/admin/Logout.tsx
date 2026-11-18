"use client";

import { useState } from "react";
import { adminRequest } from "./request";

export default function Logout({ disabled = false }: { disabled?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function logout() {
    setBusy(true);
    setFailed(false);
    try {
      await adminRequest("/api/admin/logout", {});
      window.location.reload();
    } catch {
      setBusy(false);
      setFailed(true);
    }
  }

  return (
    <div className="admin-logout">
      <button type="button" className="admin-button" disabled={busy || disabled} onClick={logout}>
        {busy ? "A terminar…" : "Terminar sessão"}
      </button>
      {failed && <p className="admin-notice admin-notice--error" role="alert">Não foi possível terminar a sessão.</p>}
    </div>
  );
}
