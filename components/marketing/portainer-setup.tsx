"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { createInstallation, validateInstallation } from "@/lib/installation";
import type { MarketingLocale } from "@/lib/marketing-i18n";

export function PortainerSetup({ locale }: { locale: MarketingLocale }) {
  const de = locale === "de";
  const [hostname, setHostname] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ReturnType<typeof createInstallation> | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function generate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = { mode: "public" as const, hostname, email };
    const invalid = validateInstallation(input);
    if (invalid) {
      setError(invalid === "email" ? (de ? "Gib eine gültige E-Mail-Adresse ein." : "Enter a valid email address.") : (de ? "Gib nur den Domainnamen ein, ohne https://, Port oder Pfad." : "Enter only the hostname, without https://, a port or a path."));
      return;
    }
    try {
      setResult(createInstallation(input));
      setCopied(false);
      setShowPassword(false);
      setError("");
    } catch {
      setError(de ? "Die Konfiguration konnte nicht erstellt werden. Öffne diese Seite über HTTPS in einem aktuellen Browser." : "Could not generate the configuration. Open this page over HTTPS in an up-to-date browser.");
    }
  }

  async function copy() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.compose); setCopied(true); setError(""); }
    catch { setError(de ? "Kopieren ist nicht verfügbar. Lade stattdessen die Compose-Datei herunter." : "Clipboard access is unavailable. Download the Compose file instead."); }
  }

  function download() {
    if (!result) return;
    const url = URL.createObjectURL(new Blob([result.compose], { type: "text/yaml;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "open-inventory-compose.yaml";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-7">
    <h3 className="text-lg font-semibold">{de ? "Deine Portainer-Vorlage erstellen" : "Create your Portainer template"}</h3>
    <p className="mt-2 text-sm leading-7 text-muted">{de ? "Die Vorlage enthält Open Inventory, PostgreSQL, Dateispeicher und Caddy für automatisches HTTPS. Passwörter entstehen nur in deinem Browser und werden nicht an diese Webseite gesendet." : "The template includes Open Inventory, PostgreSQL, file storage and Caddy for automatic HTTPS. Passwords are generated only in your browser and are not sent to this website."}</p>
    {!result ? <form onSubmit={generate} className="mt-6 space-y-5">
      <label className="block text-sm font-semibold" htmlFor="setup-hostname">{de ? "Adresse deines Inventars" : "Your inventory hostname"}<input id="setup-hostname" required value={hostname} onChange={event => setHostname(event.target.value)} placeholder="inventory.your-domain.com" autoCapitalize="none" spellCheck={false} className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-3 font-normal" /></label>
      <label className="block text-sm font-semibold" htmlFor="setup-email">{de ? "E-Mail für deinen Administrator-Zugang" : "Administrator email"}<input id="setup-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-3 font-normal" /></label>
      <button type="submit" className="site-button site-button-primary">{de ? "Vorlage erstellen" : "Create template"}</button>
    </form> : <div className="mt-6 space-y-5">
      <div className="flex flex-wrap gap-4"><button type="button" onClick={copy} className="site-button site-button-primary">{copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}{copied ? (de ? "Kopiert" : "Copied") : (de ? "Compose-Vorlage kopieren" : "Copy Compose template")}</button><button type="button" onClick={download} className="site-link"><Download className="size-4" aria-hidden="true" />{de ? "Datei herunterladen" : "Download file"}</button></div>
      <dl className="space-y-3 text-sm"><div><dt className="text-muted">{de ? "Adresse" : "Address"}</dt><dd className="mt-1 break-all font-mono">{result.url}</dd></div><div><dt className="text-muted">{de ? "Anmeldung" : "Sign-in email"}</dt><dd className="mt-1 break-all font-mono">{result.email}</dd></div><div><dt className="text-muted">{de ? "Startpasswort" : "Initial password"}</dt><dd className="mt-1 flex flex-wrap items-center gap-3"><code className="break-all">{showPassword ? result.adminPassword : "••••••••••••••••"}</code><button type="button" onClick={() => setShowPassword(!showPassword)} className="site-link">{showPassword ? (de ? "Verbergen" : "Hide") : (de ? "Anzeigen" : "Show")}</button></dd></div></dl>
      <p className="text-sm leading-7 text-muted">{de ? "Speichere die Datei privat: Sie enthält deine Zugangsdaten. Verwende sie für eine neue Installation. Erzeuge für einen bestehenden Stack keine neuen Passwörter; behalte dort deine gespeicherte Vorlage." : "Keep the file private: it contains your credentials. Use it for a new installation. Do not generate new passwords for an existing stack; keep using its saved template."}</p>
      <button type="button" className="site-link" onClick={() => { setResult(null); setCopied(false); setError(""); }}>{de ? "Neue Installation vorbereiten" : "Prepare another installation"}</button>
    </div>}
    <p role="status" className="mt-3 text-sm text-muted">{error || (copied ? (de ? "Jetzt im Portainer-Editor einfügen." : "Now paste it into the Portainer editor.") : "")}</p>
  </div>;
}
