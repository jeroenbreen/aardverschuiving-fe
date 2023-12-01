import { Feature, GeoJSON, MapSourceItem } from "../../types";

const round = (value: number, addRandom: boolean) => {
    let base = value * 1000;
    if (addRandom) {
        base += 30 * Math.random();
    }
    return Math.round(base) / 1000;
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
                coordinates: [
                    round(item.longitude, true),
                    round(item.latitude, true),
                ],
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
