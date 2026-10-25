import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const access_token = request.cookies.get("access_token");
    if (!access_token)
        return NextResponse.redirect(new URL("/login", request.url));

    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*"
};
