import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LatLngLiteral, Map} from "leaflet";
import {getUserPosition} from "@/utils/maps";
import {round_number} from "@/lib/round_number";


type StateFn = Dispatch<SetStateAction<LatLngLiteral | null>>

function centerOnUserPosition(setterCallback: StateFn, prevCoords: LatLngLiteral | null) {
    getUserPosition((coords) => {
        const current_lat = round_number(coords.lat)
        const current_lng = round_number(coords.lng)

        const prevCoords_lat = round_number(prevCoords?.lat ?? 0)
        const prevCoords_lng = round_number(prevCoords?.lng ?? 0)
        if(current_lat !== prevCoords_lat || current_lng !== prevCoords_lng)
            setterCallback(coords)
    })
}

export default function useLeafletMap(
    position: LatLngLiteral | null,
    zoom: number,
){
    const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(position)
    const [map, setMap] = useState<Map>();
    useEffect(() => {
        centerOnUserPosition(setUserPosition, userPosition)

        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const rootLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setMap(L.map('map', {layers: [rootLayer]}).setView(userPosition, zoom));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(_: unknown){
            window.location.reload();
        }

    }, [userPosition, zoom]);

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