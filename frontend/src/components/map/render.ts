import { getGeoJson } from "./geojson";
import * as bertin from "../../bertin/src";
import { GeoJSON } from "../../types";

// todo use bertin.update()
export const render = (el: HTMLElement, items: any[], onClick: () => void) => {
    el.replaceChildren();
    const geojson: GeoJSON = getGeoJson(items);
    console.log(geojson);
    const map = bertin.draw({
        params: {
            projection: "VanDerGrinten4",
            clip: false,
        },
        layers: [
            {
                type: "bubble",
                dorling: true,
                geojson,
                values: "population",
                demers: true,
                iteration: 50,
                k: 50,
                tooltip: ["$title", "$population"],
                onClick,
            },
        ],
    });
    el.appendChild(map);
};
