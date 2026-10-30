import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
export default withMDX({
  agentRules: false,
  output: 'standalone',
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname,
  redirects: async () => ['de', 'en'].flatMap(locale => [
    { source: `/${locale}`, destination: '/', permanent: true },
    { source: `/${locale}/:path+`, destination: '/:path+', permanent: true },
  ]),
  turbopack: { root: import.meta.dirname },
});
