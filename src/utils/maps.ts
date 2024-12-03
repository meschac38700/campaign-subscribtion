import {LatLngLiteral} from "leaflet";

type Options = {
    iconUrl?: string;
    iconSize?: number[];
    iconAnchor?: number[];
    popupAnchor?: number[];
    className?: string;
    html?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function markerIcon(L, options: Options | null = {}) {
    // Icon get from: https://icones8.fr/icons/set/map-marker
    let _options: Options = {
        iconUrl: "https://img.icons8.com/windows/32/visit.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    }

    if(options){
        _options = {
            ..._options,
            ...options,
        }
    }
    _options["popupAnchor"] = [0, (_options.iconSize?.[0] ?? 1) * -1]
    return L.icon(_options)
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function markerDivIcon(L, options: Options | null = {}) {
    // Icon get from: https://icones8.fr/icons/set/map-marker
    let _options: Options = {
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        html: "Hello World",
    }
    _options["popupAnchor"] = [0, (_options.iconSize?.[0] ?? 1) * -1]

    if(options){
        _options = {
            ..._options,
            ...options,
        }
    }
    return L.divIcon(_options)
}

export function getUserPosition(successCallback: (coords: LatLngLiteral) => void, errorCallback?:PositionErrorCallback | null): void {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            successCallback({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },
        (err) => errorCallback?.(err),
    )
}

export function watchUserPosition(successCallback: (coords: LatLngLiteral) => void, errorCallback?:PositionErrorCallback | null): number{
    return navigator.geolocation.watchPosition(
        (position) => {
            successCallback({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        },
        (err) => errorCallback?.(err),
    )
}
