export type InstallationInput = {
  mode: "local" | "public";
  hostname: string;
  email: string;
};

export function validateInstallation(input: InstallationInput) {
  const email = input.email.trim();
  const hostname = input.hostname.trim().toLowerCase();
  if (!/^[a-zA-Z0-9._+%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "email";
  if (input.mode !== "local" && input.mode !== "public") return "hostname";
  if (input.mode === "public" && (
    hostname.length > 253 ||
    !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(hostname) ||
    /\.(localhost|local|internal|test|invalid|example)$/.test(hostname)
  )) return "hostname";
  return null;
}

function randomSecret(bytes: number) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), byte => byte.toString(16).padStart(2, "0")).join("");
}

export function createInstallation(input: InstallationInput) {
  const error = validateInstallation(input);
  if (error) throw new Error(`Invalid installation ${error}`);
  const email = input.email.trim();
  const hostname = input.hostname.trim().toLowerCase();
  const url = input.mode === "local" ? "http://localhost:3000" : `https://${hostname}`;
  const databasePassword = randomSecret(32);
  const authSecret = randomSecret(48);
  const adminPassword = randomSecret(16);
  const compose = `# Open Inventory — generated for a new installation.
# Contains private credentials. Keep this file private.
services:
  inventory:
    image: ghcr.io/utzel-butzel/inventory:latest
    restart: unless-stopped
    init: true
    environment:
      DATABASE_URL: "postgresql://inventory:${databasePassword}@postgres:5432/inventory"
      AUTH_SECRET: "${authSecret}"
      AUTH_URL: "${url}"
      AUTH_TRUST_HOST: "true"
      AUTH_PASSWORD_ENABLED: "true"
      BOOTSTRAP_ADMIN_EMAIL: "${email}"
      BOOTSTRAP_ADMIN_NAME: "Inventory admin"
      BOOTSTRAP_ADMIN_PASSWORD: "${adminPassword}"
      BOOTSTRAP_ADMIN_PASSWORD_ONCE: "true"
      SUPERADMIN_EMAILS: "${email}"
      USERS_CAN_CREATE_ORGANIZATIONS: "false"
      STORAGE_PROVIDER: "local"
      STORAGE_LOCAL_PATH: "/app/data/uploads"
    volumes:
      - inventory-uploads:/app/data/uploads
${input.mode === "local" ? '    ports:\n      - "127.0.0.1:3000:3000"\n' : ""}    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
      interval: 10s
      timeout: 5s
      retries: 18
      start_period: 60s

  postgres:
    image: postgres:16-bookworm
    restart: unless-stopped
    environment:
      POSTGRES_DB: "inventory"
      POSTGRES_USER: "inventory"
      POSTGRES_PASSWORD: "${databasePassword}"
    volumes:
      - inventory-postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U inventory -d inventory"]
      interval: 5s
      timeout: 5s
      retries: 20
      start_period: 10s
${input.mode === "public" ? `
  https:
    image: caddy:2-alpine
    restart: unless-stopped
    command: ["caddy", "reverse-proxy", "--from", "${hostname}", "--to", "inventory:3000"]
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - inventory-caddy-data:/data
      - inventory-caddy-config:/config
    depends_on:
      inventory:
        condition: service_healthy
` : ""}
volumes:
  inventory-postgres:
  inventory-uploads:
${input.mode === "public" ? "  inventory-caddy-data:\n  inventory-caddy-config:\n" : ""}`;

  return { compose, email, url, adminPassword };
}
