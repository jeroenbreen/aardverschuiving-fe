import { defineStore } from "pinia";
import {
    Election,
    Municipality,
    Party,
    VoteSet,
    ElectionDistance,
    DistanceList,
} from "./../types";

interface MainState {
    init: boolean;
    elections: Election[];
    municipalities: Municipality[];
    municipalityLib: { [key: string]: Municipality };
    parties: Party[];
    partyLib: { [key: number]: Party };
    grid: number;
    threshold: number;
    distances: ElectionDistance[];
}

interface MainStateWithGetters extends MainState {
    electionResults: { party: Party; votes: number }[];
}

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            init: false,
            elections: [],
            municipalities: [],
            municipalityLib: {},
            parties: [],
            partyLib: {},
            distances: [],
            grid: 30,
            threshold: 500 * 1000,
            // the numbers based on ranking
        } as MainState;
    },
    getters: {
        // distanceList(state: MainState): DistanceList | null {
        //     const electionDistance = state.distances.find(
        //         (d) => d.election_id === state.currentElection?.id
        //     );
        //     if (electionDistance) {
        //         const distanceList = electionDistance.distances.find((d) => {
        //             return (
        //                 d.municipality_code ===
        //                 state.currentMunicipality?.cbs_code
        //             );
        //         });
        //         return distanceList ? distanceList : null;
        //     } else {
        //         return null;
        //     }
        // },
        cellDistance: (state: MainState) => {
            return 264 / state.grid;
        },
    },
    actions: {
        addMunicipalities(municipalities: Municipality[]) {
            this.municipalities = municipalities;
            this.municipalityLib = {};
            municipalities.forEach((m) => {
                this.municipalityLib[m.cbs_code] = m;
            });
        },
        addParties(parties: Party[]) {
            this.parties = parties;
            this.partyLib = {};
            parties.forEach((p) => {
                this.partyLib[p.id] = p;
            });
        },
    },
});
