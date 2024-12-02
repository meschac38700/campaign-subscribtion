import {FeatureGroup, Icon, Map, Marker} from "leaflet";
import Travel from "@/interfaces/travel";
import {markerIcon} from "@/utils/maps";


type LayerType = FeatureGroup<Marker<Icon>>

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function addTravelLegend(map: Map, layers: LayerType, L, nextCallback: (layers: LayerType) => void, prevCallback: (layers: LayerType) => void){
    const control = L.control({position: 'bottomleft'})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control.onAdd = function(_) {
        const div = L.DomUtil.create("div", "legend storyLegend");
        div.innerHTML = `
            <button id="prev">Précédent</button>
            <button id="next">Suivant</button>
        `;

        const prev = div.querySelector("#prev");
        const next = div.querySelector("#next");
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
    control.addTo(map);
}

export function moveMap(map: Map, index: number, layers: LayerType, zoom: number=6) {
    const travelPoint = layers.getLayers()[index]

    map.flyTo(travelPoint.getLatLng(), zoom)
    map.once("moveend", function() {
        const icon = travelPoint.getIcon()
        icon.options.iconUrl = "https://img.icons8.com/stickers/50/user-male-circle-skin-type-3.png"
        travelPoint.setIcon(icon)
    })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function getMarker(data: Travel, L): Marker{
    const icon = markerIcon(L, {
        iconUrl: "https://img.icons8.com/stickers/50/active-state.png",
        iconSize: [50, 50],
        iconAnchor:[25,50]
    })
    return L.marker([data.lat, data.lng], {icon});
}


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getTravelLayers(data: Travel[], L, map: Map): LayerType {
    const defaultData: LayerType = new L.FeatureGroup().addTo(map)
    return data.reduce((accumulator, travel) => {
        defaultData.addLayer(getMarker(travel, L))
        return defaultData
    }, defaultData)
}