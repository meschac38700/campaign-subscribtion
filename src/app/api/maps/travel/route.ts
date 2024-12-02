import {NextResponse} from "next/server";
import Travel from "@/interfaces/travel";

const data: Travel[] = [
    {
        "name": "Londres",
        "lat": 51.509865,
        "lng": -0.118092,
        "id": 1,
        "text": "<p>Londres est la capitale et plus grande ville d'Angleterre et du Royaume-Uni.</p><p>La ville est située près de l'estuaire de la Tamise dans le sud-est de l'Angleterre.</p>"
    },
    {
        "name": "Brindisi",
        "lat": 40.633331,
        "lng": 17.933332,
        "id": 2,
        "text": "<p>Brindisi est une ville de la province de Brindisi dans les Pouilles en Italie, située sur la côte adriatique dans le sud de la péninsule, sur le saillant externe du talon de la « botte ».</p>"
    },
    {
        "name": "Suez",
        "lat": 29.993,
        "lng": 32.51953,
        "id": 3,
        "text": "<p>Suez est un port d'Égypte, situé à l'embouchure du canal de Suez au nord du golfe de Suez, lui-même relié plus au sud à la mer Rouge.</p><p>L'économie de la ville repose essentiellement sur le trafic maritime avec la présence fondamentale du canal, ainsi que sur les raffineries de pétrole.</p>"
    },
    {
        "name": "Aden",
        "lat": 12.8,
        "lng": 45.03333,
        "id": 4,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Bombay",
        "lat": 19.07609,
        "lng": 72.877426,
        "id": 5,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Allahabad",
        "lat": 25.44529,
        "lng": 81.8327,
        "id": 6,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Calcutta",
        "lat": 22.572645,
        "lng": 88.363892,
        "id": 7,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Singapour",
        "lat": 1.29027,
        "lng": 103.851959,
        "id": 8,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Hong Kong",
        "lat": 22.302711,
        "lng": 114.177216,
        "id": 9,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Yokohama",
        "lat": 35.443707,
        "lng": 139.638031,
        "id": 10,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "San Francisco",
        "lat": 37.733795,
        "lng": -122.446747,
        "id": 11,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "New York City",
        "lat": 40.72781,
        "lng": -73.96957,
        "id": 12,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Liverpool",
        "lat": 53.430759,
        "lng": -2.961425,
        "id": 13,
        "text": "<p>(prochainement)</p>"
    },
    {
        "name": "Londres",
        "lat": 51.509865,
        "lng": -0.118092,
        "id": 14,
        "text": "<p>(prochainement)</p>"
    }
]


export async function GET() {
    return NextResponse.json<Travel[]>(data, {status: 200})
}