import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { source } from '@/lib/source';
import { i18n, translations } from '@/lib/i18n';
import '../global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.openinventory.polyxo.de'),
  title: { default: 'Open Inventory Docs', template: '%s · Open Inventory Docs' },
};

export default async function Layout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!i18n.languages.includes(lang as 'en' | 'de')) notFound();
  const de = lang === 'de';
  return <html lang={lang} suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <RootProvider i18n={i18nProvider(translations, lang)}>
        <DocsLayout
          tree={source.getPageTree(lang)}
          nav={{ title: 'Open Inventory / Docs', url: `/${lang}` }}
          githubUrl="https://github.com/Utzel-Butzel/inventory"
          links={[
            { text: de ? 'Einfach einrichten' : 'Easy setup', url: `https://openinventory.polyxo.de${de ? '/de' : ''}/docs`, external: true },
            { text: de ? 'Zur Webseite' : 'Website', url: `https://openinventory.polyxo.de${de ? '/de' : ''}`, external: true },
          ]}
        >{children}</DocsLayout>
      </RootProvider>
    </body>
  </html>;
}
