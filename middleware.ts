import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root
    "/",
    // Match locale prefixes
    "/(de|en)/:path*",
    // Match all paths except Next.js internals and files with extensions
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
