import type { NextRequest } from "next/server";
import { isRecord } from "../../../../content/editorial";
import { adminConfig } from "../../../../server/admin/config";
import { AdminError, adminFailure, adminJson, readJson, requireOrigin } from "../../../../server/admin/http";
import { verifyPassword } from "../../../../server/admin/password";
import { reserveLoginAttempt } from "../../../../server/admin/rate-limit";
import { issueSession, sameUsername, sessionCookie, sessionOptions } from "../../../../server/admin/session";

export async function POST(request: NextRequest) {
  try {
    requireOrigin(request);
    const config = adminConfig();
    if (!config) throw new AdminError(503, "O painel ainda não está configurado neste ambiente.");
    const data = await readJson(request);
    if (!isRecord(data) || typeof data.username !== "string" || data.username.length > 80 ||
        typeof data.password !== "string" || Buffer.byteLength(data.password) > 256 ||
        !data.username || !data.password) {
      throw new AdminError(400, "Preencha o username e a password.");
    }
    await reserveLoginAttempt(request, config);
    const passwordMatches = await verifyPassword(data.password, config.password);
    if (!sameUsername(config.username, data.username) || !passwordMatches) {
      throw new AdminError(401, "Username ou password incorretos.");
    }
    const response = adminJson({ ok: true });
    response.cookies.set(sessionCookie, issueSession(config), sessionOptions);
    return response;
  } catch (error) {
    return adminFailure(error);
  }
}
