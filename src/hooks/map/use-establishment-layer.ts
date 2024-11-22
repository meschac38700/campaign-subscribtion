import useFetch from "@/hooks/useFetch";
import Establishment from "@/interfaces/establishment";
import {LatLngExpression, LayerGroup, Map} from "leaflet";
import {markerDivIcon, markerIcon} from "@/utils/maps";


const API_URL = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-adresse-et-geolocalisation-etablissements-premier-et-second-degre/records?limit=100"

const partialKeys = [
    "appellation_officielle",
    "code_postal_uai",
    "position",
    "adresse_uai",
    "libelle_commune"
] as const;

type K =  typeof partialKeys[number]
type PartialEstablishment = Pick<Establishment, K>



interface ApiResponse {
    total_count: number;
    results: Establishment[]
}


export function usePartialEstablishment(): PartialEstablishment[]{
    const {data} = useFetch<ApiResponse | null>(API_URL, null)
    if (data === null) { return [] }

    return data.results.map(establishment => {

        const defaultAcc = {
            appellation_officielle: "", code_postal_uai: "", position: {lat: 0, lng: 0},
            adresse_uai: "", libelle_commune: "",
        }

        return partialKeys.reduce<PartialEstablishment>((acc: PartialEstablishment, key: keyof PartialEstablishment) =>  {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            acc[key] = establishment[key];
            return acc
        } , defaultAcc)
    })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getEstablishmentMarker(establishment: PartialEstablishment, L): L.Marker {
    // Icon get from: https://icones8.fr/icons/set/map-marker
    let icon = null
    if(establishment.code_postal_uai.startsWith("03")){
        icon = markerIcon(L, {
            iconUrl: "https://img.icons8.com/office/40/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        })
    }
    else if(establishment.code_postal_uai.startsWith("02")){
        icon = markerIcon(L, {
            iconUrl: "https://img.icons8.com/color/48/region-code.png",
            iconSize: [48, 48],
            iconAnchor: [24, 48],
        })
    }else{
        icon = markerDivIcon(L, {
            className: "marker",
            html: "<div class='pin'></div><div class='pulse'></div>"
        })
    }
    const m =  L.marker(establishment.position, {icon});
    m.bindPopup(`
    <div>
        <div><strong>${establishment.appellation_officielle}</strong></div>
        <div><span>${establishment.adresse_uai}, ${establishment.code_postal_uai} ${establishment.libelle_commune}</span></div>
    </div>
    `)
    return m
}

type ReturnType = {layer: L.FeatureGroup}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getEstablishmentLayer(establishments: PartialEstablishment[], leaflet: L, map: Map): ReturnType {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const layerGroup = new L.FeatureGroup().addTo(map)

    return establishments.reduce<ReturnType>((data, establishment) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const marker = getEstablishmentMarker(establishment, L)
        data.layer.addLayer(marker)
        return data
    }, {layer: layerGroup})
}