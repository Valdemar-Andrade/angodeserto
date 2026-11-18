import type { NextRequest } from "next/server";
import { isSection } from "../../../../../content/editorial";
import { AdminError, adminFailure, adminJson, readJson, requireOrigin, requireSession } from "../../../../../server/admin/http";
import { publishEditorial } from "../../../../../server/admin/editorial-store";

export async function POST(request: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  try {
    requireOrigin(request);
    requireSession(request);
    const { section } = await params;
    if (!isSection(section)) throw new AdminError(404, "Área desconhecida.");
    return adminJson(await publishEditorial(section, await readJson(request, 16_000)));
  } catch (error) {
    return adminFailure(error);
  }
}
