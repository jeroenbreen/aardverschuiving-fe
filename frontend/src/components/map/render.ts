import { GeoJSON } from "./../../types";
import * as d3 from "d3";

const v: "1" | "2" = "2";

const getMap = (geojson: GeoJSON): HTMLElement => {
    const bertin = window.bertin;

    // @ts-ignore
    const values = v === "1" ? "level" : "population_2021MM10";
    // @ts-ignore
    const name = v === "1" ? "name" : "Municipality_name_2022";

    return bertin.draw({
        params: {
            projection: "VanDerGrinten4",
            clip: false,
        },
        layers: [
            {
                type: "layer",
                geojson,
                values,
                demers: false,
                k: 50,
                fill: "red",
                tooltip: ["$" + name, "$" + values, "thousands inh."],
            },
        ],
    });
};

const toMultiPolygon = (geojson: GeoJSON) => {
    const features = geojson.features.map((feature: any) => {
        const coordinates = feature.geometry.coordinates;
        if (feature.geometry.type === "Polygon") {
            feature.geometry.coordinates = [coordinates];
            feature.geometry.type = "MultiPolygon";
        }
        return feature;
    });

    geojson.features = [features[0]];
    return geojson;
};

export const render = (el: HTMLElement) => {
    el.replaceChildren();

    const geoJsonFile = "geojson/netherlands" + v + ".json";

    d3.json(geoJsonFile).then((g) => {
        // const set = toMultiPolygon(geoJson);
        // @ts-ignore
        const set = v === "1" ? g : toMultiPolygon(g);
        const map = getMap(set) as HTMLElement;
        el.appendChild(map);
    });
};
