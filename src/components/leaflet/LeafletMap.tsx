import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

import {PropsWithChildren} from "react";
import type {LatLngExpression} from "leaflet";

type Props = {position: LatLngExpression, zoom: number} & PropsWithChildren

export default function LeafletMap(props: Props) {
    /*
        TODO(Eliam): waiting for the issue to be fixed.
            Seems like there is an issue with leaflet and react latest version 19:
            https://github.com/PaulLeCam/react-leaflet/issues/1133
    */
    const { position, zoom } = props

    return <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
}