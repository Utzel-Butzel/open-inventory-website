import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { parse } from 'yaml';

const root = new URL('../public/', import.meta.url);
await mkdir(root, { recursive: true });
const yaml = await readFile(new URL('../../public/openapi.yaml', root), 'utf8');
const spec = parse(yaml);
spec.servers = [{ url: process.env.APP_URL ? `${process.env.APP_URL.replace(/\/+$/, '')}/api/v1` : 'https://inventory.example.com/api/v1', description: 'Your Open Inventory instance' }];
await writeFile(new URL('openapi.json', root), JSON.stringify(spec));
await writeFile(new URL('openapi.yaml', root), yaml);
