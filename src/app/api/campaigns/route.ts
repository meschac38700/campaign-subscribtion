import CampaignInterface from "@/interfaces/Campaign";
import {NextRequest, NextResponse} from "next/server";
import fetchJSON from "@/utils/requests";

const BACKEND_API_CAMPAIGN = "http://localhost:8000/api/campaigns";

export async function GET(request: NextRequest) {
    const qParams = request.nextUrl.searchParams
    const response = await fetchJSON<CampaignInterface[]>(BACKEND_API_CAMPAIGN)
    console.log(qParams);
    return NextResponse.json(response.json, { status: response.status})
}
