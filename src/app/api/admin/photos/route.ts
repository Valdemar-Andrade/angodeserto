import type { NextRequest } from "next/server";
import { adminFailure, adminJson, requireOrigin, requireSession } from "../../../../server/admin/http";
import { uploadPhoto } from "../../../../server/admin/image";

export async function POST(request: NextRequest) {
  try {
    requireOrigin(request);
    requireSession(request);
    return adminJson(await uploadPhoto(request), 201);
  } catch (error) {
    return adminFailure(error);
  }
}
