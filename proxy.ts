import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  UI_LANGUAGE_COOKIE,
  UI_LANGUAGE_HEADER,
} from "./i18n.config";

const MARKETING_REWRITE_HEADER = "x-inventory-marketing-rewrite-language";

const marketingRoots = [
  "/",
  "/features",
  "/use-cases",
  "/ios",
  "/open-source",
  "/blog",
  "/docs",
  "/api-docs",
  "/impressum",
] as const;

function isMarketingPath(pathname: string) {
  return marketingRoots.some(
    (root) =>
      pathname === root || (root !== "/" && pathname.startsWith(`${root}/`)),
  );
}

function localizedResponse(
  request: NextRequest,
  language: "de" | "en",
  rewritePath?: string,
) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(UI_LANGUAGE_HEADER, language);
  if (rewritePath) {
    requestHeaders.set(MARKETING_REWRITE_HEADER, language);
  } else {
    requestHeaders.delete(MARKETING_REWRITE_HEADER);
  }

  const response = rewritePath
    ? NextResponse.rewrite(new URL(rewritePath + request.nextUrl.search, request.url), {
        request: { headers: requestHeaders },
      })
    : NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set("Content-Language", language);
  response.cookies.set(UI_LANGUAGE_COOKIE, language, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const rewrittenLanguage = request.headers.get(MARKETING_REWRITE_HEADER);

  // A production rewrite passes through the proxy again at its destination.
  // Preserve the public locale instead of treating that internal path as German.
  if (
    (rewrittenLanguage === "de" || rewrittenLanguage === "en") &&
    isMarketingPath(pathname)
  ) {
    return localizedResponse(request, rewrittenLanguage);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const pathWithoutLocale = pathname.slice(3) || "/";
    if (isMarketingPath(pathWithoutLocale)) {
      return localizedResponse(request, "en", pathWithoutLocale);
    }
  }

  if (isMarketingPath(pathname)) {
    return localizedResponse(request, "de");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/en/:path*",
    "/features/:path*",
    "/use-cases/:path*",
    "/ios",
    "/open-source",
    "/blog/:path*",
    "/docs",
    "/api-docs",
    "/impressum",
  ],
};
