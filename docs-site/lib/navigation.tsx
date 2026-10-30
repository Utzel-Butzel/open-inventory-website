import type { Item, Root } from 'fumadocs-core/page-tree';
import { BookOpen, House, Printer, Rocket, Server, Workflow } from 'lucide-react';
import { source } from './source';

function page(slug: string): Item {
  const entry = source.getPage(slug ? [slug] : []);
  if (!entry) throw new Error(`Missing documentation page: ${slug}`);
  return { type: 'page', name: entry.data.title, url: entry.url };
}

export const navigation: Root = {
  name: 'Open Inventory',
  children: [
    { ...page(''), icon: <House className="text-emerald-500" /> },
    { type: 'folder', name: 'Getting started', icon: <Rocket className="text-amber-500" />, children: ['installation', 'configuration', 'authentication'].map(page) },
    { type: 'folder', name: 'API guide', icon: <Workflow className="text-emerald-500" />, children: [page('api')] },
    { type: 'folder', name: 'API reference', icon: <BookOpen className="text-sky-500" />, children: [page('api-reference'), ...source.getPageTree().children.filter(node => node.type === 'folder').flatMap(node => node.children)] },
    { type: 'folder', name: 'Printing', icon: <Printer className="text-violet-500 dark:text-violet-400" />, children: [page('printing')] },
    { type: 'folder', name: 'Stock & assembly', icon: <Workflow className="text-orange-500" />, children: ['planning', 'variant-stock'].map(page) },
    { type: 'folder', name: 'Operations', icon: <Server className="text-rose-500" />, children: [page('operations')] },
  ],
};
