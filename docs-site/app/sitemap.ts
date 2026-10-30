import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['en', 'de'].flatMap(lang => source.getPages(lang).map(page => ({
    url: `https://docs.openinventory.polyxo.de${page.url}`,
  })));
}
