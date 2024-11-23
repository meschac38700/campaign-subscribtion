import {Map} from "leaflet";
import {markerDivIcon, markerIcon} from "@/utils/maps";
import {PartialEstablishment} from "@/interfaces/establishment";


/**
 * Build a marker and popup for the given establishment
 * @param establishment
 * @param L
 */
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
        <div><h4 style="font-weight: 700; font-size: 1rem; margin-bottom: 1rem;" class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">${establishment.appellation_officielle}</h4></div>
        <div><b>Adresse:</b> <span>${establishment.adresse_uai}, ${establishment.code_postal_uai} ${establishment.libelle_commune}</span></div>
        <div><b>Etablissement:</b> <span>${establishment.etat_etablissement_libe}</span></div>
        <div><b>Etablissement Secteur:</b> <span>${establishment.secteur_public_prive_libe}</span></div>
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
            console.error(error)
        }
        return data

    }, {layer: layerGroup})
}
