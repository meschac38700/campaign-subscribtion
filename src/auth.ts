import Credentials from "next-auth/providers/credentials"
import fetchJSON from "@/utils/requests";
import {AuthTokenResponse, HttpErrorResponse} from "@/interfaces/http";
import {isInstanceOf} from "@/lib/utils";
import {cookies} from "next/headers";
import {COOKIE_KEYS} from "@/constants/cookies"
import {SignInSchema} from "@/lib/login-zod";
import NextAuth from "next-auth";
import {JWT} from "@auth/core/jwt";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {SessionToken} from "@auth/core/lib/utils/cookie";


type CredentialInputType = Partial<Record<"username" | "password", unknown>>
type AuthResponseType = AuthTokenResponse | HttpErrorResponse


const AUTH_API = `${process.env.EXTERNAL_API}/token-auth/`
const TOKEN_MAX_AGE = Number.parseInt(process.env.AUTH_TOKEN_LIFETIME || "350" )   - 60*5

async function setAuthCookie(data: AuthTokenResponse){
    const cookieStore = await cookies()
    const maxAge = TOKEN_MAX_AGE
    cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, data.token, {maxAge})
}

async function authorize(credentials: CredentialInputType):  Promise<AuthTokenResponse | null>  {
    const {username, password} = await SignInSchema.parseAsync(credentials)
    const body = JSON.stringify({username, password})
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    const response = await fetchJSON<AuthResponseType>(AUTH_API, {method: "POST", body, headers})
    if (isInstanceOf<AuthTokenResponse>(response.json, "email")) {
        await setAuthCookie(response.json)
        return response.json
    }
    return null
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize,
        }),
    ],
    session: {
      strategy: 'jwt',
      maxAge: TOKEN_MAX_AGE
    },
    // Utils links: https://github.com/nextauthjs/next-auth/issues/7645, https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async jwt({token}) {
            const cookieStore = await cookies()
            const accessToken = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)
            if (!accessToken) {
                return null
            }
            // since we are using DRF Token et not jWT and prisma, instead of token.id= account.providerAccountId
            token.id = token.email
            // Set DRF Access Token
            token.accessToken = accessToken.value
            return token
        },
        async session({ session, token }: {session: SessionToken, token: JWT}) {
            // Send properties to the client, like an access_token and user id from a provider.
            if(!token.accessToken)
                return null
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        }
    }
})