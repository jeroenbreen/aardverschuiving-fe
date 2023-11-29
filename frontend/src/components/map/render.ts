import { GeoJSON } from "./../../types";
import { getGeoJson } from "./geojson";

// todo use bertin.update()

const getMap = (geojson: GeoJSON): HTMLElement => {
    const bertin = window.bertin;
    const values = "population_2021MM10";
    const name = "Municipality_name_2022";

    return bertin.draw({
        params: {
            projection: "VanDerGrinten4",
            clip: false,
        },
        layers: [
            {
                type: "square",
                geojson,
                values,
                demers: true,
                k: 40,
                fill: "red",
                tooltip: ["$" + name, "$" + values],
            },
        ],
    });
};

const getGeometry = (geometry: any) => {
    const list = geometry.coordinates[0];
    const point = list[0];
    return {
        type: "Point",
        coordinates: point,
    };
};

const geometryToPoint = (geojson: GeoJSON) => {
    const features = geojson.features.map((feature: any) => {
        feature.geometry = getGeometry(feature.geometry);
        return feature;
    });

    geojson.features = features;
    return geojson;
};

export const render = (el: HTMLElement, items: any[]) => {
    el.replaceChildren();
    const geoJson = getGeoJson(items);
    const map = getMap(geoJson) as HTMLElement;
    el.appendChild(map);
};
