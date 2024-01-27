import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getCookies } from "cookies-next";
import { jwtVerify } from "jose";

import { UserSession } from "./types/types";
import { ROLES } from "./consts";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  const session = await verify({ req, res });

  const path = req.nextUrl.pathname;


  if (path.startsWith("/maintenances") && (!session))
    return NextResponse.redirect(new URL("/", req.url));

  if (path.startsWith("/estimates") && (!session || session.role == ROLES.TECHNICIEN))
    return NextResponse.redirect(new URL("/", req.url));

  else if (path.startsWith("/accounts") && (!session || session.role == ROLES.CLIENT))
    return NextResponse.redirect(new URL("/", req.url));

  else if (path.startsWith("/places") && (!session || session.role == ROLES.CLIENT))
    return NextResponse.redirect(new URL("/", req.url));

  else if (path.startsWith("/units") && (!session || session.role == ROLES.CLIENT))
    return NextResponse.redirect(new URL("/", req.url));

  else if (path.startsWith("/references") && (!session || session.role == ROLES.CLIENT))
    return NextResponse.redirect(new URL("/", req.url));


  else if (path.startsWith("/api/auth") || path.startsWith("/api/logout")) return

  else if (path.startsWith("/api") && !session) return Response.json(
    { success: false, message: 'authentication failed' },
    { status: 401 }
  )

  else if (path.startsWith("/api") && session) {


    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-user-role", session.role)
    requestHeaders.set("x-user-client_id", session.client_id?.toString())

    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })

    return response
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};

export async function verify(req: {
  req: NextRequest;
  res: NextResponse;
}): Promise<UserSession> {
  const { session } = getCookies(req);

  if (!session) return null;

  const { payload } = await jwtVerify(
    session,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload as UserSession;
}

// export function decodeSessionCookie(req: any){
//   const { session } = getCookies(req);
//   let decoded;
//   if (session) {
//     decoded = jwt.verify(session, process.env.JWT_SECRET);
//     return decoded
//   } else return null

// }
