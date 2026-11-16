function httpsOrigin(value: string | undefined): URL | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) {
      return new URL(url.origin);
    }
  } catch {
    return undefined;
  }
}

const productionUrl = httpsOrigin(process.env.SITE_URL);
const previewUrl = httpsOrigin(process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`);

export const canonicalUrl = process.env.NODE_ENV === "production"
  && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production")
  ? productionUrl
  : undefined;

export const metadataBase = canonicalUrl ?? previewUrl;
export const socialPhoto = "/media/partilha-angodeserto.jpg";
