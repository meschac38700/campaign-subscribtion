import {EstablishmentApiResponse, PartialEstablishment, partialKeys} from "@/interfaces/establishment";
import fetchJSON from "@/utils/requests";
import {NextResponse} from "next/server";

const API_URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre/records?limit=100&order_by=libelle_departement&where=position is not null"


export async function GET(): Promise<NextResponse<PartialEstablishment[]>> {
    const {json, status} = await fetchJSON<EstablishmentApiResponse | null>(API_URL)
    if (!json) { return NextResponse.json([], {status}) }

    return NextResponse.json(json.results.map(establishment => {

        return partialKeys.reduce<PartialEstablishment>((acc: PartialEstablishment, key: keyof PartialEstablishment) =>  {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            acc[key] = establishment[key];
            return acc
        } , {} as PartialEstablishment)
    }), {status})
}