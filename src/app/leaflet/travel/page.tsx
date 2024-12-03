"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {useCallback, useEffect, useMemo, useState} from "react";
import useFetch from "@/hooks/use-fetch";
import Travel from "@/interfaces/travel";
import {addTravelLegend, getTravelLayers, getTravelMarker, moveMap} from "@/lib/map/travel_layer";
import {FeatureGroup, Marker} from "leaflet";
import {LayerFixed} from "@/interfaces/maps";

let index = 0

export default function Page(){
    const map = useLeafletMap({zoom: 12});
    const minimap = useLeafletMap({zoom: 14, htmlElementId: "minimap"});

    const [minimapMarker, setMinimapMarker] = useState<Marker | null>(null)
    const [currentLayer, setCurrentLayer] = useState<LayerFixed|null>(null);
    const {data} = useFetch<Travel[] | null>("/api/maps/travel", null)

    const nextCallback = useCallback((layers: FeatureGroup) => {
        if(!map) return

        const nextIndex = (index + 1 ) % (data?.length || 0)
        moveMap(map, nextIndex, layers, setCurrentLayer, index)
        index = nextIndex
    }, [map, data])
    const prevCallback = useCallback((layers: FeatureGroup) => {
        if(!map) return

        const dataLength = data?.length || 1
        const nextIndex = (index - 1 + dataLength ) % dataLength
        moveMap(map, nextIndex, layers, setCurrentLayer, index)
        index = nextIndex
    }, [map, data])

    const getMinimapMarker = useMemo(() => {
        if((!minimap || !currentLayer) || minimapMarker) return minimapMarker;
        const position = currentLayer.getLatLng() ?? {lat: 45.166672, lng: 5.71667}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const marker = getTravelMarker(currentLayer.options.objId, position, L, "https://img.icons8.com/color/48/standing-man-skin-type-3.png")
        setMinimapMarker(marker)
        return marker
    }, [minimap, currentLayer])

    const currentTravelPoint = useMemo(() => {
        if(!currentLayer) return null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return data?.find(travel => travel.id === currentLayer.options.objId)
    }, [data, currentLayer])

    useEffect(() => {
        if (map) {
            if (data?.length){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layers = getTravelLayers(data, L, map)
                map.fitBounds(layers.getBounds())

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                addTravelLegend(map, layers, L, nextCallback, prevCallback)
                moveMap(map, index, layers, setCurrentLayer)
            }
        }
    }, [map, data]);

    useEffect(() => {
        if(minimap && currentLayer){
            minimap.setView(currentLayer.getLatLng(), 16,)
            if(!minimapMarker && getMinimapMarker)
                getMinimapMarker.addTo(minimap)
            else
                minimapMarker?.setLatLng(currentLayer.getLatLng()).addTo(minimap)
        }
    }, [minimap, currentLayer]);

    return <div className="flex flex-col gap-3 h-full">
        <div className="flex gap-3 justify-center minimap-container">
            <div id="minimap" className="flex-none"></div>
            {
                currentTravelPoint
                &&
                <div className="description">
                    <h4 className="text-2xl mb-2">{currentTravelPoint.name}</h4>
                    <p>{currentTravelPoint.text}</p>
                </div>
            }
        </div>
        <div id="map"></div>


        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin="" defer></script>
    </div>
}