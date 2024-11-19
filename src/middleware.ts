import {auth} from "@/auth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {NextAuthRequest} from "next-auth/lib";
import {apiRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT_URL, LOGIN_PATH, publicRoutes} from "../routes";


export default auth((req: NextAuthRequest) => {
    // Do whatever you want here, before the request is passed down to `NextAuth`
    const {nextUrl} = req
    const pathname = nextUrl.pathname;
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = pathname.startsWith(apiRoutes)
    const isAuthRoute = authRoutes.some((path: string) => pathname.startsWith(path))
    const isPublicRoute = publicRoutes.includes(pathname)

    if(isApiAuthRoute){
        return null
    }

    if(isLoggedIn && isAuthRoute){
        const path = nextUrl.searchParams.get("next") ?? DEFAULT_LOGIN_REDIRECT_URL
        return Response.redirect(new URL(path, nextUrl))
    }

    if( !isLoggedIn && !isPublicRoute){
        const loginUrl = new URL(LOGIN_PATH, nextUrl)
        loginUrl.searchParams.append("next", pathname)
        return Response.redirect(loginUrl);
    }

    return null
})



// Routes Middleware should not run on
export const config = {
    //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
