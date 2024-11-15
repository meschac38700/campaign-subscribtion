import CampaignInterface from "@/interfaces/Campaign";
import {formatDatetime} from "@/lib/date_manipulations";
import "./campaign.css"

export default function Campaign ({campaign}: {campaign:CampaignInterface}){
    const isSuccessClassName =  campaign.success ? "success" : "fail"
    return <div className={"card campaign " + isSuccessClassName}>
        <div className="card-content">
            <div className="card-image"><img src={campaign.image} alt="Campaign image"/></div>
            <div className="card-main">
                <h4 className="card-title mb-2">{campaign.title}</h4>
                <p className="card-text">{campaign.description}</p>
                <span className="card-footer mt-2">Added {formatDatetime({date: campaign.created_at})}</span>
            </div>
        </div>
    </div>
}