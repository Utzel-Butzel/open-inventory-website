FROM node:22-bookworm-slim AS dependencies
WORKDIR /workspace/docs-site
COPY docs-site/package.json docs-site/package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /workspace/docs-site
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /workspace/docs-site/node_modules ./node_modules
COPY docs-site ./
COPY public/openapi.yaml /workspace/public/openapi.yaml
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /workspace/docs-site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/docs-site/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /workspace/docs-site/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
