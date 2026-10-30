import type { Metadata } from 'next';
import { Boxes, ExternalLink } from 'lucide-react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { navigation } from '@/lib/navigation';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.openinventory.polyxo.de'),
  title: { default: 'Open Inventory Docs', template: '%s · Open Inventory Docs' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col">
      <RootProvider>
        <DocsLayout
          tree={navigation}
          nav={{ title: <><Boxes className="size-6 text-violet-500 dark:text-violet-400" /><span>Open Inventory <span className="text-fd-muted-foreground">docs</span></span></>, url: '/' }}
          githubUrl="https://github.com/Utzel-Butzel/inventory"
          themeSwitch={{ mode: 'light-dark-system' }}
          sidebar={{ defaultOpenLevel: 0, footer: <div className="docs-sidebar-footer">
            <a href="https://openinventory.polyxo.de/docs" className="docs-setup-card">
              <strong>New to Open Inventory?</strong>
              <span>Start with the simple Dokploy or Coolify setup guide.</span>
              <span className="mt-2 inline-flex items-center gap-1 font-medium underline underline-offset-4">Set up your instance <ExternalLink className="size-3" /></span>
            </a>
            <a href="https://openinventory.polyxo.de" className="mt-3 flex items-center gap-1 text-fd-muted-foreground hover:text-fd-foreground">Open Inventory website <ExternalLink className="size-3" /></a>
          </div> }}
        >{children}</DocsLayout>
      </RootProvider>
    </body>
  </html>;
}
