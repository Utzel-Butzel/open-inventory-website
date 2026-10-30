import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';
import { openapi } from './openapi';

const docs = defineDocs({ dir: 'content/docs' });
export const source = loader({
  docs: docs.toFumadocsSource(),
  openapi: await openapi.staticSource({ baseDir: 'reference', groupBy: 'tag' }),
}, {
  baseUrl: '/',
  plugins: [openapi.loaderPlugin()],
});
