import { NextResponse, type NextRequest } from "next/server";
import { hasMalformedPercentEncoding } from "@/lib/case-designs";

export function proxy(request: NextRequest) {
  if (hasMalformedPercentEncoding(request.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/designs/case/:path*"],
};
