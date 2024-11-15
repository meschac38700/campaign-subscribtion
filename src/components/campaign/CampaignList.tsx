"use client";

import Campaign from "@/components/campaign/Campaign";
import CampaignInterface from "@/interfaces/Campaign";
import useFetch from "@/hooks/useFetch";
import AlertComponent from "@/components/ui/alerts/AlertComponent";

export default function CampaignList() {
    const {data, errors, isLoading} = useFetch<CampaignInterface[]>("/api/campaigns?page=1", [])

    return <>
        <h1 className="text-4xl font-extrabold dark:text-white text-center mt-4 mb-7">List of available campaigns</h1>
        <div className="campaign-list">
            {isLoading &&
                <AlertComponent variant="info" text="Wait while we are fetching campaigns data.."
                                title="Fetch campaigns"/>}
            {!!errors.length &&
                <AlertComponent variant="destructive" text={<ErrorList errors={errors}/>}
                                title="Error fetch campaigns"/>}
            {!!data.length && data.map((campaign) => (<Campaign key={campaign.slug} campaign={campaign}/>))}
        </div>
    </>
}

function ErrorList({errors}: { errors: string[] }) {
    return <ul className="error-list">
        {errors.map((error, i) => <li key={"error-" + i}>{error}</li>)}
    </ul>;
}