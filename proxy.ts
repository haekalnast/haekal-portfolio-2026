import { NextResponse, type NextRequest } from "next/server";

const CASE_ROUTE_PREFIX = "/designs/case/";
const HEX_BYTE_PATTERN = /^[\da-fA-F]{2}$/;

function hasMalformedPercentEncoding(pathname: string): boolean {
  let percentIndex = pathname.indexOf("%");

  while (percentIndex !== -1) {
    if (!HEX_BYTE_PATTERN.test(pathname.slice(percentIndex + 1, percentIndex + 3))) {
      return true;
    }

    percentIndex = pathname.indexOf("%", percentIndex + 1);
  }

  return false;
}

export function proxy(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname.startsWith(CASE_ROUTE_PREFIX) && hasMalformedPercentEncoding(url.pathname)) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/designs/case/:path*",
};
