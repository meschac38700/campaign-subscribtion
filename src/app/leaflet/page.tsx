"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {FeatureGroup, LatLngExpression, LayerGroup, Map} from "leaflet";
import {useCallback, useEffect} from "react";
import useFetch from "@/hooks/useFetch";
import {mapLegendBuilder} from "@/lib/map/legend";
import {
    getBoundsOfMultipleLayerGroups,
    getEstablishmentLayers
} from "@/lib/map/establishment_layer";
import {PartialEstablishment} from "@/interfaces/establishment";

const GrenoblePosition: LatLngExpression = {lat: 45.166672, lng: 5.71667}

export default function Page(){

    const legendCallback = useCallback((map: Map): string | HTMLElement => {
        const builder = mapLegendBuilder({title: "Map Legend Title"})
        const onClick = (element: HTMLDivElement) => {
            element.classList.toggle('active')

        }
        const closeEstablishment = `
            <img src="https://img.icons8.com/fluency-systems-filled/48/hotel-door-hanger.png" alt="">
            <p class="legend-text">Établissements fermés</p>
        `
        builder.addLegendRow({html: closeEstablishment, onClick})

        const openEstablishment = `
            <img src="https://img.icons8.com/?size=100&id=3721&format=png&color=000000" alt="">
            <p class="legend-text">Établissements ouvert</p>
        `
        builder.addLegendRow({html: openEstablishment, onClick})

        const privateSector = `
            <img src="https://img.icons8.com/color/48/private--v1.png" alt="">
            <p class="legend-text">Secteur Privé</p>
        `
        builder.addLegendRow({html: privateSector, onClick})

        const publicSector = `
            <img src="https://img.icons8.com/ultraviolet/40/public.png" alt="">
            <p class="legend-text">Secteur Public</p>
        `
        builder.addLegendRow({html: publicSector, onClick})

        return builder.create()
    }, [])
    const {map} = useLeafletMap(GrenoblePosition, 12, legendCallback);
    const {data} = useFetch<PartialEstablishment[] | null>("/api/gouv/establishments", null)

    useEffect(() => {
        if (map) {
            if (data?.length){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layers = getEstablishmentLayers(data, L, map)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const layerControl = L.control.layers(undefined, layers, {hideSingleBase: true}).addTo(map);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                // const {layer} = getEstablishmentLayer(data, L, map)
                //layer.addTo(map)
                const layerGroups = Object.values<FeatureGroup<LayerGroup>>(layers)
                map.fitBounds(getBoundsOfMultipleLayerGroups(layerGroups))
            }
            /*
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
           // @ts-expect-error
            L.marker(GrenoblePosition).bindPopup("Center of Grenoble city.").addTo(map)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            L.popup().setLatLng([45.169570, 5.62897]).setContent(
                `<img src="/2023-09-15.jpg" alt="image"><p>Indepence popup element.</p>`
            ).openOn(map)

            map.on("click", async (e: LeafletMouseEvent) => {
                const pos = e.latlng
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-errorconst popup = L.popup().setContent(`Coord: ${e.latlng}`).openOn(map)
                L.popup().setLatLng(pos).setContent(`Coord: ${pos}`).openOn(map)
                try{
                    await navigator.clipboard.writeText(`[${pos.lat.toFixed(5)},${pos.lng.toFixed(5)}]`)
                }catch(_: unknown){}
            })*/
        }
    }, [map, data]);

    return <>
        <div id="map"></div>
        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="" defer></script>
    </>
}