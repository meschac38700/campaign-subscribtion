import {useEffect, useState} from "react";
import {LatLngExpression, Map} from "leaflet";

export default function useLeafletMap(
    position: LatLngExpression,
    zoom: number,
){
    const [map, setMap] = useState<Map>();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const rootLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setMap(L.map('map', {layers: [rootLayer]}).setView(position, zoom));
    }, [position, zoom]);

    useEffect(() => {
        if(!map) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        L.control.scale({
            position: "topright",
            maxWidth: 70,
            metric: true,
            imperial: false,
        }).addTo(map)

    }, [map]);

    return map;
}