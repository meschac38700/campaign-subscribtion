import {Icon, LatLngLiteral, Layer} from "leaflet";

export interface LayerFixed extends Layer {
    getLatLng: () => LatLngLiteral;
    getIcon: () => Icon;
    setIcon: (icon: Icon) => void;
    getLayers: () => Layer[];
    _zIndex: number;
    _bringToFront: () => void;
}