import { uploadDimensions } from "../../../../content/editorial";
import { publicEditorial } from "../../../../server/admin/editorial-store";
import { photoResponse } from "../../../../server/admin/image";

function unavailable(status: number) {
  return new Response(null, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!uploadDimensions(key)) return unavailable(404);
  const sections = await Promise.all([publicEditorial("gallery"), publicEditorial("highlight")]);
  if (!sections.some(({ photos }) => photos.some((photo) => photo.key === key))) return unavailable(404);
  try {
    return await photoResponse(key, false);
  } catch {
    return unavailable(503);
  }
}
