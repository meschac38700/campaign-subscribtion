"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {FeatureGroup, LatLngLiteral, LayerGroup} from "leaflet";
import {useEffect} from "react";
import useFetch from "@/hooks/use-fetch";
import {addLegend} from "@/lib/map/legend";
import {
    getBoundsOfMultipleLayerGroups,
    getEstablishmentLayers
} from "@/lib/map/establishment_layer";
import {PartialEstablishment} from "@/interfaces/establishment";


export default function Page(){
    const map = useLeafletMap(12);
    const {data} = useFetch<PartialEstablishment[] | null>("/api/gouv/establishments", null)

    useEffect(() => {
        if (map) {
            if (data?.length){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layers = getEstablishmentLayers(data, L, map)
                addLegend(map, layers)
                const layerGroups = Object.values<FeatureGroup<LayerGroup>>(layers)
                map.fitBounds(getBoundsOfMultipleLayerGroups(layerGroups))
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