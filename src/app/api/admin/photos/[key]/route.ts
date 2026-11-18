import type { NextRequest } from "next/server";
import { adminFailure, requireSession } from "../../../../../server/admin/http";
import { photoResponse } from "../../../../../server/admin/image";

export async function GET(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  try {
    requireSession(request);
    return await photoResponse((await params).key, true);
  } catch (error) {
    return adminFailure(error);
  }
}
