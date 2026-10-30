import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
export default withMDX({
  agentRules: false,
  output: 'standalone',
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname,
  redirects: async () => [{ source: '/', destination: '/en', permanent: false }],
  turbopack: { root: import.meta.dirname },
});
