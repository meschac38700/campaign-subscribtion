"use client";
import useLeafletMap from "@/hooks/map/use-leaflet-map";
import {LatLngExpression, LeafletMouseEvent} from "leaflet";
import {useEffect} from "react";

const GrenoblePosition: LatLngExpression = {lat: 45.166672, lng: 5.71667}
export default function Page(){
    const {map} = useLeafletMap(GrenoblePosition, 12);

    useEffect(() => {
        if(map){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
           // @ts-expect-error
            L.marker(GrenoblePosition).bindPopup("Center of Grenoble city.").addTo(map)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            L.popup({
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
            }).setLatLng([45.169570, 5.62897]).setContent(
                `<img src="/2023-09-15.jpg" alt="image"><p>Indepence popup element.</p>`
            ).openOn(map)

            map.on("click", (e: LeafletMouseEvent) => {
                const pos = e.latlng
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-errorconst popup = L.popup().setContent(`Coord: ${e.latlng}`).openOn(map)
                L.popup().setLatLng(pos).setContent(`Coord: ${pos}`).openOn(map)
                navigator.clipboard.writeText(`[${pos.lat.toFixed(5)},${pos.lng.toFixed(5)}]`)
            })

        }
    }, [map]);

    return <>
        <div id="map"></div>
        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="" defer></script>
    </>
}