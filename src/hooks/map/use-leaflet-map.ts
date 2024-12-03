import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LatLngLiteral, Map} from "leaflet";
import {getUserPosition} from "@/utils/maps";


type StateFn = Dispatch<SetStateAction<LatLngLiteral | null>>

function centerOnUserPosition(setterCallback: StateFn, prevCoords: null | LatLngLiteral) {
    if(prevCoords){
        return
    }

    getUserPosition((coords) => {
        setterCallback(prevValue => ({...prevValue, ...coords}))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }, (_) => {
        // set to Grenoble coordinates
        setterCallback({lat: 45.166672, lng: 5.71667})
    })
}

export default function useLeafletMap(
    {
        zoom=5,
        position=null,
        htmlElementId="map",
        geolocationEnabled = false,
    }: {zoom: number, position?: null | LatLngLiteral, htmlElementId?: string, geolocationEnabled?: boolean}
){
    const [userPosition, setUserPosition] = useState<LatLngLiteral | null>(position)
    const [map, setMap] = useState<Map>();
    useEffect(() => {
        if(geolocationEnabled)
            centerOnUserPosition(setUserPosition, userPosition)
        else
            setUserPosition({lat: 45.166672, lng: 5.71667})
    }, []);

    useEffect(() => {
        if(!userPosition) return

        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const rootLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setMap(L.map(htmlElementId, {layers: [rootLayer]}).setView(userPosition, zoom));
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