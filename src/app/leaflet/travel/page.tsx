"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {useCallback, useEffect, useState} from "react";
import useFetch from "@/hooks/use-fetch";
import Travel from "@/interfaces/travel";
import {addTravelLegend, getTravelLayers, moveMap} from "@/lib/map/travel_layer";
import {FeatureGroup} from "leaflet";

let index = 0

export default function Page(){
    const map = useLeafletMap(12);
    const {data} = useFetch<Travel[] | null>("/api/maps/travel", null)

    const nextCallback = useCallback((layers: FeatureGroup) => {
        if(!map) return

        const nextIndex = (index + 1 ) % (data?.length || 0)
        index = nextIndex
        moveMap(map, nextIndex, layers)
    }, [map, data])
    const prevCallback = useCallback((layers: FeatureGroup) => {
        if(!map) return

        const dataLength = data?.length || 1
        const nextIndex = (index - 1 + dataLength ) % dataLength
        index = nextIndex
        moveMap(map, nextIndex, layers)
    }, [map, data])

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
                moveMap(map, index, layers)
            }
        }
    }, [map, data]);

    return <>
        <div id="map"></div>
        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossOrigin="" defer></script>
    </>
}