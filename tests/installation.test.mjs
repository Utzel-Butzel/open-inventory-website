import assert from "node:assert/strict";
import { test } from "node:test";
import { parse } from "yaml";
import { createInstallation, validateInstallation } from "../lib/installation.ts";

const input = { mode: "public", hostname: "inventory.example.com", email: "owner@example.com" };

test("public template connects its database, persists files and exposes only HTTPS routing", () => {
  const result = createInstallation(input);
  const { services, volumes } = parse(result.compose);
  assert.equal(services.inventory.environment.AUTH_URL, "https://inventory.example.com");
  assert.equal(services.inventory.environment.BOOTSTRAP_ADMIN_EMAIL, input.email);
  assert.equal(services.inventory.environment.SUPERADMIN_EMAILS, input.email);
  assert.equal(services.inventory.environment.BOOTSTRAP_ADMIN_PASSWORD, result.adminPassword);
  assert.match(result.adminPassword, /^[a-f0-9]{32}$/);
  assert.match(services.inventory.environment.AUTH_SECRET, /^[a-f0-9]{96}$/);
  const database = new URL(services.inventory.environment.DATABASE_URL);
  assert.equal(database.password, services.postgres.environment.POSTGRES_PASSWORD);
  assert.equal(database.hostname, "postgres");
  assert.equal(services.inventory.ports, undefined);
  assert.equal(services.postgres.ports, undefined);
  assert.deepEqual(services.https.ports, ["80:80", "443:443"]);
  assert.deepEqual(services.https.command, ["caddy", "reverse-proxy", "--from", input.hostname, "--to", "inventory:3000"]);
  assert.deepEqual(Object.keys(volumes).sort(), ["inventory-caddy-config", "inventory-caddy-data", "inventory-postgres", "inventory-uploads"]);
  assert.equal(services.inventory.depends_on.postgres.condition, "service_healthy");
  assert.equal(services.https.depends_on.inventory.condition, "service_healthy");
});

test("each new installation has independent credentials", () => {
  const first = createInstallation(input);
  const second = createInstallation(input);
  assert.notEqual(first.adminPassword, second.adminPassword);
  const a = parse(first.compose).services;
  const b = parse(second.compose).services;
  assert.notEqual(a.inventory.environment.AUTH_SECRET, b.inventory.environment.AUTH_SECRET);
  assert.notEqual(a.postgres.environment.POSTGRES_PASSWORD, b.postgres.environment.POSTGRES_PASSWORD);
});

test("unsafe input cannot become Compose configuration or a shell expression", () => {
  for (const hostname of ["https://inventory.example.com", "x.example.com:3000", "x.example.com/path", "localhost", "127.0.0.1", "x.local", "x.example.com\nservices:", "${HOST}", "-x.example.com", "x..com"]) {
    assert.equal(validateInstallation({ ...input, hostname }), "hostname", hostname);
    assert.throws(() => createInstallation({ ...input, hostname }));
  }
  for (const email of ['owner"@example.com', "${SECRET}@example.com", "owner@example.com\nAUTH_SECRET=x", "owner@example.com'", "`id`@example.com"]) {
    assert.equal(validateInstallation({ ...input, email }), "email", email);
  }
  assert.equal(validateInstallation({ ...input, hostname: " Inventory.Example.COM ", email: "owner+inventory@example.com" }), null);
});

test("local verification configuration binds only to loopback", () => {
  const { services } = parse(createInstallation({ ...input, mode: "local" }).compose);
  assert.deepEqual(services.inventory.ports, ["127.0.0.1:3000:3000"]);
  assert.equal(services.inventory.environment.AUTH_URL, "http://localhost:3000");
  assert.equal(services.https, undefined);
});
