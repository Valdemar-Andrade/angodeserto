import { originalUploadLimit, photoSideLimit, uploadLimit } from "../../content/editorial";

const formats = ["image/jpeg", "image/png", "image/webp"];

export async function preparePhoto(file: File): Promise<Blob> {
  if (!formats.includes(file.type)) throw new Error("Escolha uma fotografia JPEG, PNG ou WebP.");
  if (file.size > originalUploadLimit) throw new Error("O ficheiro original pode ter até 28 MB.");
  if (file.size <= uploadLimit) return file;

  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" })
    .catch(() => { throw new Error("Não foi possível abrir a fotografia."); });
  try {
    const scale = Math.min(1, photoSideLimit / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Este navegador não conseguiu preparar a fotografia.");
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const result = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", .94));
    if (!result || result.size > uploadLimit) {
      throw new Error("A fotografia ainda é demasiado grande. Exporte-a em JPEG ou WebP e tente novamente.");
    }
    return result;
  } finally {
    bitmap.close();
  }
}
