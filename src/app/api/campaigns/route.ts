import CampaignInterface from "@/interfaces/Campaign";
import {NextResponse} from "next/server";
import fetchJSON from "@/utils/requests";

const EXTERNAL_API_CAMPAIGN = `${process.env.EXTERNAL_API}/campaigns`;

export async function GET() {
    // const qParams = request.nextUrl.searchParams
    // TODO(Eliam): sending querystring to the server api
    const response = await fetchJSON<CampaignInterface[]>(EXTERNAL_API_CAMPAIGN)
    return NextResponse.json(response.json, { status: response.status})
}
