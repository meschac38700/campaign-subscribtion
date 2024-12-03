import {Icon, LatLngExpression, Layer} from "leaflet";

export interface LayerFixed extends Layer {
    getLatLng: () => LatLngExpression;
    getIcon: () => Icon;
    setIcon: (icon: Icon) => void;
    getLayers: () => Layer[];
}