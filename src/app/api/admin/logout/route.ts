import type { NextRequest } from "next/server";
import { adminFailure, adminJson, requireOrigin } from "../../../../server/admin/http";
import { sessionCookie, sessionOptions } from "../../../../server/admin/session";

export function POST(request: NextRequest) {
  try {
    requireOrigin(request);
    const response = adminJson({ ok: true });
    response.cookies.set(sessionCookie, "", { ...sessionOptions, maxAge: 0 });
    return response;
  } catch (error) {
    return adminFailure(error);
  }
}
