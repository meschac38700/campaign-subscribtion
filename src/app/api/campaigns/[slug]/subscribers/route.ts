import {NextResponse} from "next/server";
import SubscriberInterface from "@/interfaces/subscriber";
import {cookies} from "next/headers";
import fetchJSON from "@/utils/requests";
import {HttpErrorResponse} from "@/interfaces/http";
import {COOKIE_KEYS} from "@/constants/cookies";
import {auth} from "@/auth";


const SUBSCRIBER_CREATE_API = `${process.env.EXTERNAL_API}/campaigns/[slug]/subscribers/create`;

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<HttpErrorResponse | SubscriberInterface>> {
    const body = await request.json()
    const {slug} = await params
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)
    if (!token) {
        return NextResponse.json({detail: "Authentication required!"}, {status: 401})
    }
    const url = SUBSCRIBER_CREATE_API.replace("[slug]", slug)
    const  headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${token.value}`
    }
    const response = await fetchJSON<HttpErrorResponse | SubscriberInterface>(
        url,
        {method: "POST", body: JSON.stringify(body), headers}
    )

    return NextResponse.json(response.json, {status: response.status})
}
