import { getGeoJson } from "./geojson";
import * as bertin from "../../bertin/src";
import { GeoJSON, MapSourceItem, VoteSetHeavy } from "../../types";

export const voteSetsToMapSourceItems = (
    voteSets: VoteSetHeavy[]
): MapSourceItem[] => {
    return voteSets.map((voteSet) => {
        return {
            title:
                voteSet.municipality.title +
                " " +
                (voteSet.party ? voteSet.party.name : "totaal"),
            population: voteSet.votes,
            color: voteSet.party ? voteSet.party.color : "black",
            cbs_code: voteSet.municipality.cbs_code,
            party_id: voteSet.party ? voteSet.party.id : 0,
            latitude: voteSet.municipality.latitude,
            longitude: voteSet.municipality.longitude,
        };
    });
};

// todo use bertin.update()
export const render = (
    el: HTMLElement,
    voteSets: VoteSetHeavy[],
    onClick: () => void
) => {
    el.replaceChildren();
    const mapSourceItems: MapSourceItem[] = voteSetsToMapSourceItems(voteSets);
    const geojson: GeoJSON = getGeoJson(mapSourceItems);
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
