import type { MetadataRoute } from "next";
import { canonicalUrl } from "../content/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: canonicalUrl ? new URL("/sitemap.xml", canonicalUrl).href : undefined,
  };
}
