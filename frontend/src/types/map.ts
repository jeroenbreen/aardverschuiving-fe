export interface GeoJSON {
    type: "FeatureCollection";
    crs: {
        type: "name";
        properties: {
            name: string;
        };
    };
    features: Feature[];
}

export interface FeatureProperties {
    title: string;
    population: number;
    color: string;
    cbs_code: string;
    party_id: number;
}

export interface Feature {
    type: string;
    properties: FeatureProperties;
    geometry: {
        type: "Point";
        coordinates: number[];
    };
}
