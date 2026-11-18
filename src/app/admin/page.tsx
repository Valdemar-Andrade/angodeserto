import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminEditor from "../../components/admin/AdminEditor";
import AdminLogin from "../../components/admin/AdminLogin";
import Logout from "../../components/admin/Logout";
import Brand from "../../components/ui/Brand";
import { adminConfig } from "../../server/admin/config";
import { readEditorialState } from "../../server/admin/editorial-store";
import { sessionCookie, verifySession } from "../../server/admin/session";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gestão de Fotografias | Angodeserto",
  description: null,
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false },
};

async function panel() {
  const config = adminConfig();
  if (!config || !verifySession(config, (await cookies()).get(sessionCookie)?.value)) {
    return <AdminLogin enabled={Boolean(config)} />;
  }

  try {
    const [gallery, highlight] = await Promise.all([readEditorialState("gallery"), readEditorialState("highlight")]);
    return <AdminEditor initial={{ gallery, highlight }} />;
  } catch {
    return (
      <section className="admin-panel">
        <h1>Gestão de Fotografias</h1>
        <p role="alert">Não foi possível carregar as publicações. Recarregue a página para tentar novamente.</p>
        <Logout />
      </section>
    );
  }
}

export default async function AdminPage() {
  return (
    <div className="admin-shell">
      <header className="admin-brand"><div className="admin-container"><Brand /></div></header>
      <main className="admin-container admin-main">{await panel()}</main>
    </div>
  );
}
