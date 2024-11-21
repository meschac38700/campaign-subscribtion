"use client";
import {useEffect, useState} from "react";
import {Layer} from "leaflet";

export default function Page(){
    const [layer, setLayer] = useState<Layer>();
    const [map, setMap] = useState();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setMap(L.map('map').setView([45.166672, 5.71667 ], 12));
    }, []);

    useEffect(() => {
        if(map)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setLayer(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map));

        return () => {
            layer?.remove()
        }
    }, [map]);

    return <>
        <div id="map"></div>
        <script async src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="" defer></script>
    </>
}