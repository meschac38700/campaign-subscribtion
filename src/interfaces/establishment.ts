import {FeatureGroup, LatLngExpression, Layer, LayerGroup} from "leaflet";

export default interface Establishment {
    numero_uai: string;
    appellation_officielle: string;
    denomination_principale: string;
    patronyme_uai: string | null;
    secteur_public_prive_libe: "Public" | "Privé";
    adresse_uai: string | null;
    lieu_dit_uai: string | null;
    boite_postale_uai: string | null;
    code_postal_uai: string;
    localite_acheminement_uai: string;
    libelle_commune: string;
    coordonnee_x: number;
    coordonnee_y: number;
    epsg: string;
    latitude: number;
    longitude: number;
    appariement: string;
    localisation: string;
    nature_uai: number;
    nature_uai_libe: string;
    etat_etablissement: number;
    etat_etablissement_libe: "OUVRIR" | "A OUVRIR";
    code_departement: string;
    code_region: string;
    code_academie: string;
    code_commune: string;
    libelle_departement: string;
    libelle_region: string;
    libelle_academie: string;
    position: LatLngExpression;
    secteur_prive_code_type_contrat: number;
    secteur_prive_libelle_type_contrat: string;
    code_ministere: string;
    libelle_ministere: string;
    date_ouverture: string;
}

export const partialKeys = [
    "appellation_officielle",
    "code_postal_uai",
    "position",
    "adresse_uai",
    "libelle_commune",
    "secteur_public_prive_libe",
    "etat_etablissement_libe",
] as const;

type K =  typeof partialKeys[number]
export type PartialEstablishment = Pick<Establishment, K>

export interface EstablishmentApiResponse {
    total_count: number;
    results: Establishment[]
}


type LayersObject = {
    [name: string]: FeatureGroup<LayerGroup>
}

export interface EstablishmentLayers extends LayersObject{
    private: FeatureGroup<LayerGroup>,
    public: FeatureGroup<LayerGroup>,
    opened: FeatureGroup<LayerGroup>,
    closed: FeatureGroup<LayerGroup>,
}
