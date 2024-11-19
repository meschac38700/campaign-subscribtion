import {NextResponse} from "next/server";
import SubscriberInterface from "@/interfaces/subscriber";
import fetchJSON from "@/utils/requests";
import {HttpErrorResponse} from "@/interfaces/http";
import {auth} from "@/auth";
import {Session} from "@/types/next-auth";


const SUBSCRIBER_CREATE_API = `${process.env.EXTERNAL_API}/campaigns/[slug]/subscribers/create`;

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<HttpErrorResponse | SubscriberInterface>> {
    const body = await request.json()
    const {slug} = await params

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const session: Session | null = await auth()
    if (!session) {
        return NextResponse.json({detail: "Authentication required!"}, {status: 401})
    }
    const url = SUBSCRIBER_CREATE_API.replace("[slug]", slug)
    const  headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${session.accessToken}`
    }
    const response = await fetchJSON<HttpErrorResponse | SubscriberInterface>(
        url,
        {method: "POST", body: JSON.stringify(body), headers}
    )

    return NextResponse.json(response.json, {status: response.status})
}
