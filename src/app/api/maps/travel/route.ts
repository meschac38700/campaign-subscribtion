import {NextResponse} from "next/server";
import Travel from "@/interfaces/travel";

const data: Travel[] = [
    {
        "name": "Londres",
        "lat": 51.509865,
        "lng": -0.118092,
        "id": 1,
        "text": "Londres est la capitale et plus grande ville d'Angleterre et du Royaume-Uni.La ville est située près de l'estuaire de la Tamise dans le sud-est de l'Angleterre."
    },
    {
        "name": "Brindisi",
        "lat": 40.633331,
        "lng": 17.933332,
        "id": 2,
        "text": "Brindisi est une ville de la province de Brindisi dans les Pouilles en Italie, située sur la côte adriatique dans le sud de la péninsule, sur le saillant externe du talon de la « botte »."
    },
    {
        "name": "Suez",
        "lat": 29.993,
        "lng": 32.51953,
        "id": 3,
        "text": "Suez est un port d'Égypte, situé à l'embouchure du canal de Suez au nord du golfe de Suez, lui-même relié plus au sud à la mer Rouge.L'économie de la ville repose essentiellement sur le trafic maritime avec la présence fondamentale du canal, ainsi que sur les raffineries de pétrole."
    },
    {
        "name": "Aden",
        "lat": 12.8,
        "lng": 45.03333,
        "id": 4,
        "text": "Aden est une ville du Yémen, située à 170 km à l'est du détroit Bab el Mandeb. Elle est peuplée d'environ 990 000 habitants. C'est aussi un port naturel, construit sur un ancien site volcanique, déjà utilisé par le royaume antique d'Awsan entre les VIIᵉ et Vᵉ siècles av. J.-C.. La ville donne son nom au golfe d'Aden. "
    },
    {
        "name": "Bombay",
        "lat": 19.07609,
        "lng": 72.877426,
        "id": 5,
        "text": "Mumbai (anciennement Bombay) est une ville densément peuplée qui se trouve sur la côte ouest de l'Inde. Ce centre financier est la plus grande ville du pays. Sur le front de mer du port de Mumbai, la Porte de l'Inde est une arche en pierre emblématique qui a été construite en 1924, sous le Raj britannique. "
    },
    {
        "name": "Allahabad",
        "lat": 25.44529,
        "lng": 81.8327,
        "id": 6,
        "text": "Prayagraj, anciennement Allahabad, est une ville indienne du sud de l’État d’Uttar Pradesh, capitale de l'une des 18 divisions territoriales de cet État et du District de Prayagraj."
    },
    {
        "name": "Calcutta",
        "lat": 22.572645,
        "lng": 88.363892,
        "id": 7,
        "text": "Kolkata (anciennement Calcutta) est la capitale d’un État de l’Inde appelé Bengale-Occidental. Établie en tant que ville-comptoir par la Compagnie britannique des Indes orientales, elle fut la capitale de l’Inde de 1773 à 1911, pendant le Raj britannique. Elle est aujourd’hui célèbre pour son architecture coloniale grandiose, ses galeries d’art et ses festivals culturels. "
    },
    {
        "name": "Singapour",
        "lat": 1.29027,
        "lng": 103.851959,
        "id": 8,
        "text": "Singapour est une cité-État insulaire au large du sud de la Malaisie. Ce centre financier mondial est doté d'un climat tropical et d'une population multiculturelle.Singapour est une cité-État insulaire au large du sud de la Malaisie. Ce centre financier mondial est doté d'un climat tropical et d'une population multiculturelle."
    },
    {
        "name": "Hong Kong",
        "lat": 22.302711,
        "lng": 114.177216,
        "id": 9,
        "text": "Hong Kong, officiellement la région administrative spéciale de Hong Kong de la république populaire de Chine, est la plus grande et la plus peuplée des deux régions administratives spéciales de la république populaire de Chine, l'autre étant Macao."
    },
    {
        "name": "Yokohama",
        "lat": 35.443707,
        "lng": 139.638031,
        "id": 10,
        "text": "Yokohama, ville japonaise située au sud de Tokyo, fut l'un des premiers ports japonais à s'ouvrir au commerce extérieur en 1859. Elle comprend un grand quartier chinois avec des centaines de restaurants et de boutiques. Elle est également réputée pour le jardin Sankei-en, parc botanique abritant des résidences japonaises bien conservées datant de différentes époques, et le quartier du Minato Mirai en bord de mer, site de la Landmark Tower de 296 mètres de haut."
    },
    {
        "name": "San Francisco",
        "lat": 37.733795,
        "lng": -122.446747,
        "id": 11,
        "text": "San Francisco, en Californie du Nord, est une ville vallonnée à la pointe d'une péninsule entourée par l'océan Pacifique et la baie de San Francisco. Elle est célèbre pour son brouillard permanent, l'emblématique pont du Golden Gate, ses Cable Cars et ses maisons victoriennes colorées. "
    },
    {
        "name": "New York City",
        "lat": 40.72781,
        "lng": -73.96957,
        "id": 12,
        "text": "New York est une ville composée de 5 arrondissements à l'embouchure du fleuve Hudson et de l'océan Atlantique."
    },
    {
        "name": "Liverpool",
        "lat": 53.430759,
        "lng": -2.961425,
        "id": 13,
        "text": "Liverpool est une ville maritime située au nord-ouest de l'Angleterre, là où la Mersey se jette dans la mer d'Irlande."
    },
    {
        "name": "Londres",
        "lat": 51.509865,
        "lng": -0.118092,
        "id": 14,
        "text": "Fin du voyage, retour au point de départ."
    }
]


export async function GET() {
    return NextResponse.json<Travel[]>(data, {status: 200})
}