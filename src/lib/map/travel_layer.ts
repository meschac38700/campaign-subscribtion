import {FeatureGroup, Icon, Map, Marker, Layer, LatLngExpression} from "leaflet";
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

interface LayerFixed extends Layer {
    getLatLng: () => LatLngExpression;
    getIcon: () => Icon;
    setIcon: (icon: Icon) => void;
}

export function moveMap(map: Map, index: number, layers: LayerType, zoom: number=6) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const travelPoint: LayerFixed = layers.getLayers()[index]

    map.flyTo(travelPoint.getLatLng(), zoom)
    map.once("moveend", function() {
        const icon = travelPoint.getIcon()
        icon.options.iconUrl = "https://img.icons8.com/stickers/50/user-male-circle-skin-type-3.png"
        travelPoint.setIcon(icon)
    })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function getMarker(data: Travel, L, iconUrl?: string): Marker{
    const icon = markerIcon(L, {
        iconUrl: iconUrl ?? "https://img.icons8.com/stickers/50/active-state.png",
        iconSize: [50, 50],
        iconAnchor:[25,50]
    })
    return L.marker([data.lat, data.lng], {icon});
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

        defaultData.addLayer(getMarker(travel, L, iconUrl))
        return defaultData
    }, defaultData)
}