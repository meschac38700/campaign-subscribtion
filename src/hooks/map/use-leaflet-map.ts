import {useEffect, useState} from "react";
import {LatLngExpression, Map, Layer} from "leaflet";

export default function useLeafletMap(
    position: LatLngExpression,
    zoom: number,
    legendCallback?: (map: Map) => string | HTMLElement
){
    const [layer, setLayer] = useState<Layer>();
    const [map, setMap] = useState<Map>();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setMap(L.map('map').setView(position, zoom));
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

        if(legendCallback){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const legendElement = L.control({position: "bottomright"})
            legendElement.onAdd = legendCallback
            legendElement.addTo(map);
        }

    }, [map]);

    useEffect(() => {
        if(map)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setLayer(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map));
    }, [map]);

    return {map, rootLayer: layer};
}