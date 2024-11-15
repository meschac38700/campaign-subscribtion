export default interface CampaignInterface {
    id: number;
    title: string;
    slug: string;
    image: string;
    description?: string;
    page_visits: number;
    success: boolean;
    updated_at: string;
    created_at: string;
}