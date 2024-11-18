import CampaignInterface from "@/interfaces/Campaign";
import {NextRequest, NextResponse} from "next/server";
import fetchJSON from "@/utils/requests";

const BACKEND_API_CAMPAIGN = `${process.env.BACKEND_API}/campaigns`;

export async function GET(request: NextRequest) {
    const qParams = request.nextUrl.searchParams
    const response = await fetchJSON<CampaignInterface[]>(BACKEND_API_CAMPAIGN)
    return NextResponse.json(response.json, { status: response.status})
}
