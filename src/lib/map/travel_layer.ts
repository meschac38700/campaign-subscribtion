import {FeatureGroup, Icon, Map, Marker, LatLngExpression, MarkerOptions} from "leaflet";
import Travel from "@/interfaces/travel";
import {markerIcon} from "@/utils/maps";
import {LayerFixed} from "@/interfaces/maps";
import {Dispatch, SetStateAction} from "react";
import {preventClickBehaviour} from "@/utils/click-vents";


type LayerType = FeatureGroup<Marker<Icon>>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getTravelLegend(map: Map, layers: LayerType, L, nextCallback: (layers: LayerType) => void, prevCallback: (layers: LayerType) => void){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function(_: Map) {
        const div = L.DomUtil.create("div", "legend storyLegend");
        div.innerHTML = `
            <button id="prev">Précédent</button>
            <button id="next">Suivant</button>
        `;

        const prev = div.querySelector("#prev");
        const next = div.querySelector("#next");
        div.addEventListener("click", preventClickBehaviour);
        div.addEventListener("dblclick", preventClickBehaviour);
        prev.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            prevCallback(layers)
        });
        next.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            nextCallback(layers)
        });
        return div
    }
}

function resetPreviousTravelPoint(map: Map, layers: LayerType, previousIndex: number | null) {
    if (previousIndex === null) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const previousLayer: LayerFixed = layers.getLayers()[previousIndex]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const resetIcon = markerIcon(L, {
        iconUrl: "https://img.icons8.com/stickers/50/active-state.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
    })
    previousLayer.setIcon(resetIcon)
}

type SetterCallback =  Dispatch<SetStateAction<LayerFixed | null>>

export function moveMap(map: Map, index: number, layers: LayerType, setCurrentPoint: SetterCallback, previousIndex:  null | number=null, zoom: number=6) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const travelPoint: LayerFixed = layers.getLayers()[index]
    setCurrentPoint(travelPoint);

    map.flyTo(travelPoint.getLatLng(), zoom)
    map.once("moveend", function() {
        const icon = travelPoint.getIcon()
        icon.options.iconUrl = "https://img.icons8.com/stickers/50/user-male-circle-skin-type-3.png"
        travelPoint.setIcon(icon)
        resetPreviousTravelPoint(map, layers, previousIndex)
        travelPoint._bringToFront()
    })
}

interface ExtendingMarkerOptions extends MarkerOptions {
    objId: number;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getTravelMarker(objId: number, position: LatLngExpression, L, iconUrl?: string): Marker<ExtendingMarkerOptions>{

    const icon = markerIcon(L, {
        iconUrl: iconUrl ?? "https://img.icons8.com/stickers/50/active-state.png",
        iconSize: [50, 50],
        iconAnchor:[25,50],
    })
    return new L.Marker(position, {icon, objId});
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getTravelLayers(data: Travel[], L, map: Map): LayerType {
    const defaultData: LayerType = new L.FeatureGroup().addTo(map)
    return data.reduce((accumulator, travel, index, arr) => {
        let iconUrl = undefined
        const last = arr[arr.length - 1]
        const first = arr[0]
        const sameCoords = last.lat === first.lat && last.lng === first.lng
        if(index === 0 || (index == arr.length - 1 && sameCoords) )
            iconUrl = "https://img.icons8.com/stickers/50/user-male-circle-skin-type-3.png"

        defaultData.addLayer(getTravelMarker(travel.id, {lat: travel.lat, lng: travel.lng}, L, iconUrl))
        return defaultData
    }, defaultData)
}