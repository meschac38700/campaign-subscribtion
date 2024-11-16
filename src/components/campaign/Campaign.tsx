"use client";

import CampaignInterface from "@/interfaces/Campaign";
import {formatDatetime} from "@/lib/date_manipulations";
import "./campaign.css"
import {useCallback} from "react";
import { useRouter } from 'next/navigation'

type CampaignArgs = {
    campaign:CampaignInterface,
}

export default function Campaign ({campaign}: CampaignArgs){
    const isSuccessClassName =  campaign.success ? "success" : "fail"
    const router = useRouter();
    const redirectToSubscribeView = useCallback(() => {
        router.push(`/campaigns/${campaign.slug}/subscribe`)
    }, [])

    return <div className={"card campaign " + isSuccessClassName} onClick={redirectToSubscribeView}>
        <div className="card-content">
            <div className="card-image"><img src={campaign.image} alt="Campaign image"/></div>
            <div className="card-main w-full">
                <h4 className="card-title mb-2">{campaign.title}</h4>
                <p className="card-text">{campaign.description}</p>
                <div className="card-footer flex justify-between align-items-center flex-wrap gap-2 w-full">
                    <span className="created-at">{formatDatetime({date: campaign.created_at})}</span>
                    <span className="">{campaign.subscribers} Subscribers</span>
                </div>
            </div>
        </div>
    </div>
}