import { GeoJSON, Municipality } from "../../types";

const round = (value: number) => {
    return value;
};

export const getGeoJson = (municipalities: Municipality[]): GeoJSON => {
    const features = [];
    for (const municipality of municipalities) {
        const feature = {
            type: "Feature",
            properties: {
                title: municipality.title,
                population: municipality.population,
            },
            geometry: {
                type: "Point",
                coordinates: [
                    round(municipality.longitude),
                    round(municipality.latitude),
                ],
            },
        };
        features.push(feature);
    }
    return {
        type: "FeatureCollection",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84",
            },
        },
        features,
    };
};
