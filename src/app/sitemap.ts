import type { MetadataRoute } from "next";
import { canonicalUrl } from "../content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalUrl ? [{ url: canonicalUrl.href }] : [];
}
