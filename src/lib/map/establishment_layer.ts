import {Map} from "leaflet";
import {markerDivIcon, markerIcon} from "@/utils/maps";


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getEstablishmentMarker(establishment: PartialEstablishment, L): L.Marker {
    // Icon get from: https://icones8.fr/icons/set/map-marker
    let icon = null
    if(establishment.code_postal_uai.startsWith("01")){
        icon = icon = markerDivIcon(L, {
            className: "marker",
            html: "<div class='pin yellow'></div><div class='pulse'></div>"
        })
    }
    else if(establishment.code_postal_uai.startsWith("02")){
        icon = markerDivIcon(L, {
            className: "marker",
            html: "<div class='pin'></div><div class='pulse'></div>"
        })
    }else{
        icon = markerIcon(L, {
            iconUrl: "https://img.icons8.com/office/40/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
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
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const marker = getEstablishmentMarker(establishment, L)
            data.layer.addLayer(marker)
        }catch(error){
            console.log(error)
            debugger
        }
        return data

    }, {layer: layerGroup})
}
