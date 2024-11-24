"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {FeatureGroup, LatLngExpression, LayerGroup} from "leaflet";
import {useEffect} from "react";
import useFetch from "@/hooks/useFetch";
import {buildMapLegend} from "@/lib/map/legend";
import {
    getBoundsOfMultipleLayerGroups,
    getEstablishmentLayers
} from "@/lib/map/establishment_layer";
import {PartialEstablishment} from "@/interfaces/establishment";

const GrenoblePosition: LatLngExpression = {lat: 45.166672, lng: 5.71667}

export default function Page(){
    const {map} = useLeafletMap(GrenoblePosition, 12);
    const {data} = useFetch<PartialEstablishment[] | null>("/api/gouv/establishments", null)

    useEffect(() => {
        if (map) {
            if (data?.length){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layers = getEstablishmentLayers(data, L, map)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layerControl = L.control.layers(undefined, layers, {collapsed: false}).addTo(map);
                map.removeControl(layerControl)

                // Create map legend
                const legendDescriptions = {
                    closed: {text: `Établissement fermés (${layers['closed'].getLayers().length})`, img: "https://img.icons8.com/fluency-systems-filled/48/hotel-door-hanger.png"},
                    opened: {text: `Établissement ourvers (${layers['opened'].getLayers().length})`, img: "https://img.icons8.com/?size=100&id=3721&format=png&color=000000"},
                    private: {text: `Établissement privés (${layers['private'].getLayers().length})`, img: "https://img.icons8.com/color/48/private--v1.png"},
                    public: {text: `Établissement publics (${layers['public'].getLayers().length})`, img: "https://img.icons8.com/ultraviolet/40/public.png"},
                }
                // TODO(Eliam): Review legend filter logic, Using AND operator instead the default OR
                buildMapLegend({map, layers, legendDescriptions})
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