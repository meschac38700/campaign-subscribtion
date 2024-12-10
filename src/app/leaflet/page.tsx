"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {FeatureGroup, LatLngLiteral, LayerGroup, Map} from "leaflet";
import {useEffect} from "react";
import useFetch from "@/hooks/use-fetch";
import {addLegend} from "@/lib/map/legend";
import {
    getBoundsOfMultipleLayerGroups,
    getEstablishmentLayers
} from "@/lib/map/establishment_layer";
import {PartialEstablishment} from "@/interfaces/establishment";
import {getUserPosition, markerIcon} from "@/utils/maps";


const getDistance = (map: Map, start: LatLngLiteral, end: LatLngLiteral) => {
    const startPoint = map.latLngToLayerPoint(start)
    const endPoint = map.latLngToLayerPoint(end)
    return startPoint.distanceTo(endPoint)
}

const circleBetween = (map: Map, start: LatLngLiteral, end: LatLngLiteral) => {
    const distance = getDistance(map, start, end)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const circle = L.circleMarker(start, {radius: distance}).addTo(map)

    map.on('zoomend', function() {
        const distance = getDistance(map, start, end)
        circle.setRadius(distance)
    });
}

const markCurrentUserPosition = (map: Map) => {
    getUserPosition((userPosition) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        let icon = markerIcon(L, {
            iconUrl: "https://img.icons8.com/color/48/i-pronoun.png",
            iconSize: [48, 48],
            iconAnchor: [24, 48],
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        L.marker(userPosition, {icon}).addTo(map)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        icon = markerIcon(L, {
            iconUrl: "https://img.icons8.com/stickers/50/dollar-place-marker.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
        })
        const destination = {lat: 45.59438, lng: 4.76594}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        L.marker(destination, {icon}).addTo(map)

        circleBetween(map, userPosition, destination)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        L.polyline([userPosition, destination], {
            color: "#e7700d",
            weight: 8,
            dashArray: "5 20",
        }).addTo(map)

    })
}

export default function Page(){
    const map = useLeafletMap({zoom: 12});
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
            markCurrentUserPosition(map)
        }
    }, [map, data]);

    return <>
        <div id="map" className="h-full"></div>
        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="" defer></script>
    </>
}