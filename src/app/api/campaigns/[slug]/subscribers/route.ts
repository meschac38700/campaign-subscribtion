import {NextRequest, NextResponse} from "next/server";
import SubscriberInterface from "@/interfaces/subscriber";
import {cookies} from "next/headers";
import fetchJSON from "@/utils/requests";


type ErrorResponse = {
    detail: string;
}

const SUBSCRIBER_CREATE_API = `${process.env.BACKEND_API}/campaigns/[slug]/subscribers/create`;

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<ErrorResponse | SubscriberInterface>> {
    const body = await request.json()
    const {slug} = await params
    const cookieStore = await cookies()
    const token = {value: "c5aceb22a875694252d0cfd1873aa7f0abd8d408"} //cookieStore.get("AUTH_TOKEN")
    if (!token) {
        return NextResponse.json({detail: "Authentication required!"}, {status: 401})
    }
    const csrfToken = cookieStore.get("csrftoken")
    const url = SUBSCRIBER_CREATE_API.replace("[slug]", slug)
    const  headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFToken": csrfToken?.value || "",
        "Authorization": `Token ${token.value}`
    }
    console.log(headers)
    const response = await fetchJSON<ErrorResponse | SubscriberInterface>(
        url,
        {method: "POST", body: JSON.stringify(body), headers}
    )

    return NextResponse.json(response.json, {status: response.status})
}
