import { GeoJSON, Municipality } from "../../types";

export const getGeoJson = (municipalities: Municipality[]): GeoJSON => {
    const features = [];
    for (const municipality of municipalities) {
        const feature = {
            type: "Feature",
            properties: {
                Municipality_name_2022: municipality.title,
                population_2021MM10: municipality.population,
            },
            geometry: {
                type: "Point",
                coordinates: [municipality.longitude, municipality.latitude],
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
