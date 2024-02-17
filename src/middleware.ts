import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import { EPath } from "./constants/path";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth: (auth, req) => {
    if (auth.userId && auth.isPublicRoute) {
      let path = `${EPath.SELECT_ORGANIZATION}`;

      if (auth.orgId) {
        path = `${EPath.ORGANIZATION}/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== EPath.SELECT_ORGANIZATION
    ) {
      return NextResponse.redirect(new URL(EPath.SELECT_ORGANIZATION, req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
