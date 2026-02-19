import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const MARKDOWN_MIME = "text/markdown";
const LLMS_PATH = "/llms.txt";

export function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === LLMS_PATH) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept")?.toLowerCase() ?? "";
  if (!accept.includes(MARKDOWN_MIME)) {
    return NextResponse.next();
  }

  const rewriteUrl = new URL(LLMS_PATH, request.url);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/"],
};
