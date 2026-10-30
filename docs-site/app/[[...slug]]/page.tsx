import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocsPage, DocsTitle, DocsDescription, DocsBody } from 'fumadocs-ui/page';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { OpenAPIPage } from '@/components/api-page';

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const path = slug?.length ? `/${slug.join('/')}` : '';
  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: path || '/' },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  if (page.type === 'openapi') {
    return <DocsPage full toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody>
        <p className="text-sm text-fd-muted-foreground">The API runs on your own Open Inventory instance. Session-authenticated requests require a session on that instance.</p>
        <OpenAPIPage {...page.data.getOpenAPIPageProps()} />
      </DocsBody>
    </DocsPage>;
  }
  const MDX = page.data.body;
  const apiGroups = new Map<string, ReturnType<typeof source.getPages>>();
  if (slug?.[0] === 'api-reference') {
    for (const endpoint of source.getPages()) {
      if (endpoint.type !== 'openapi') continue;
      const group = endpoint.slugs[1] ?? 'API';
      const pages = apiGroups.get(group) ?? [];
      pages.push(endpoint);
      apiGroups.set(group, pages);
    }
  }
  return <DocsPage toc={page.data.toc}>
    <DocsTitle>{page.data.title}</DocsTitle>
    <DocsDescription>{page.data.description}</DocsDescription>
    <DocsBody><MDX components={getMDXComponents()} />
      {[...apiGroups].map(([group, pages]) => <details key={group} className="my-3 rounded-xl border p-4">
        <summary className="cursor-pointer font-medium capitalize">{group.replaceAll('-', ' ')} <span className="text-fd-muted-foreground">({pages.length})</span></summary>
        <ul>{pages.map(endpoint => <li key={endpoint.url}><a href={endpoint.url}>{endpoint.data.title}</a></li>)}</ul>
      </details>)}
    </DocsBody>
  </DocsPage>;
}
