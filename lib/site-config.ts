const fallbackAppUrl = "http://localhost:3001";

export const publicDemoUrl =
  "https://inventory.paperlesspaper.de/login?demo=1";

export function appHref(path = "/") {
  const baseUrl = (
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    fallbackAppUrl
  ).replace(
    /\/+$/,
    "",
  );
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}
