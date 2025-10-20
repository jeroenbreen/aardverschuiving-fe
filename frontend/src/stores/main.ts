import { defineStore } from "pinia";
import { Election, Municipality, Party, ElectionDistance } from "./../types";

interface MainState {
    measured: boolean;
    width: number;
    mapMode: boolean;
    winnerTakesAll: boolean;
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

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            measured: false,
            width: 300,
            mapMode: true,
            winnerTakesAll: false,
            init: false,
            elections: [],
            municipalities: [],
            municipalityLib: {},
            parties: [],
            partyLib: {},
            distances: [],
            grid: 30,
            threshold: 100 * 1000,
            // the numbers based on ranking
        } as MainState;
    },
    getters: {
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
