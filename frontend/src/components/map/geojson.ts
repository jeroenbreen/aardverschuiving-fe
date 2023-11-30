import { Feature, GeoJSON, MapSourceItem } from "../../types";

const round = (value: number) => {
    return value;
};

export const getGeoJson = (mapSourceItems: MapSourceItem[]): GeoJSON => {
    const features = [];
    for (const item of mapSourceItems) {
        const feature = {
            type: "Feature",
            properties: {
                ...item,
            },
            geometry: {
                type: "Point",
                coordinates: [round(item.longitude), round(item.latitude)],
            },
        } as Feature;
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
