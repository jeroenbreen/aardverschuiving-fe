import { GeoJSON } from "./../../types";
import { getGeoJson } from "./geojson";

// todo use bertin.update()

const getMap = (geojson: GeoJSON): HTMLElement => {
    const bertin = window.bertin;
    const values = "population";
    const title = "title";

    return bertin.draw({
        params: {
            projection: "VanDerGrinten4",
            clip: false,
        },
        layers: [
            {
                type: "bubble",
                dorling: true,
                geojson,
                values,
                demers: true,
                iteration: 50,
                k: 50,
                fill: "black",
                tooltip: ["$" + title, "$" + values],
            },
        ],
    });
};

export const render = (el: HTMLElement, items: any[]) => {
    el.replaceChildren();
    const geoJson = getGeoJson(items);
    console.log(geoJson);
    const map = getMap(geoJson) as HTMLElement;
    el.appendChild(map);
};
