import { authMiddleware } from "@clerk/nextjs";
// import { auth } from "clerk"
export default authMiddleware({
  publicRoutes: ["/", '/api/role'],


  afterAuth(auth, req) {

    // if (auth.sessionClaims?.metadata.role === undefined && req.nextUrl.pathname.startsWith("/role") == false) {
    //   return Response.redirect(new URL('/role', req.url))

    // }
    if (auth.sessionClaims?.metadata.role !== undefined && req.nextUrl.pathname.startsWith("/role")) {
      return Response.redirect(new URL('/', req.url))

    }
    if (auth.sessionClaims?.metadata.role !== "teacher" && req.nextUrl.pathname.startsWith("/teacher")) {
      return Response.redirect(new URL('/', req.url))

    }

    if (auth.sessionClaims?.metadata.role !== "student" && req.nextUrl.pathname.startsWith("/student")) {
      return Response.redirect(new URL('/', req.url))

    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

