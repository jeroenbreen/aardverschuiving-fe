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
            threshold: 0 * 1000,
            // the numbers based on ranking
        } as MainState;
    },
    getters: {
        cellDistance: (state: MainState) => {
            return 264 / state.grid;
        },
    },
    actions: {
        addElections(elections: Election[]) {
            for (const election of elections) {
                election.totals = [];
                for (const voteSet of election.results) {
                    const total = election.totals?.find(
                        (t) => t.party.id === voteSet[1]
                    );
                    if (!total) {
                        const party = this.partyLib[voteSet[1]];
                        if (party) {
                            election.totals.push({
                                party,
                                votes: voteSet[2],
                            });
                        } else {
                            console.log("party not found: ");
                        }
                    } else {
                        total.votes += voteSet[2];
                    }
                }
                election.totals.sort((a, b) => b.votes - a.votes);
            }
            this.elections = elections;
        },
        addMunicipalities(municipalities: Municipality[]) {
            this.municipalities = municipalities;
            this.municipalityLib = {};
            municipalities.forEach((m) => {
                this.municipalityLib[m.id] = m;
            });
        },
        addParties(parties: Party[]) {
            this.parties = parties;
            this.partyLib = {};
            parties.forEach((p) => {
                this.partyLib[p.id] = p;
            });
        },
        reset() {
            this.parties = [];
            this.partyLib = {};
            this.municipalities = [];
            this.municipalityLib = {};
            this.elections = [];
            this.distances = [];
            this.init = false;
        },
    },
});
