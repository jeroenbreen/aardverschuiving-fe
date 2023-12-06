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
    loaded: boolean;
    elections: Election[];
    municipalities: Municipality[];
    municipalityLib: { [key: string]: Municipality };
    parties: Party[];
    partyLib: { [key: number]: Party };
    currentMunicipality: Municipality | null;
    currentElection: Election | null;
    currentParty: Party | null;
    grid: number;
    selectedPartyRanks: number[];
    distances: ElectionDistance[];
}

interface MainStateWithGetters extends MainState {
    electionResults: { party: Party; votes: number }[];
}

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            init: false,
            loaded: false,
            elections: [],
            municipalities: [],
            municipalityLib: {},
            parties: [],
            partyLib: {},
            distances: [],
            currentMunicipality: null,
            currentElection: null,
            currentParty: null,
            grid: 30,
            // the numbers based on ranking
            selectedPartyRanks: [0, 1, 2, 3, 4, 5, 6],
        } as MainState;
    },
    getters: {
        selectedParties(state: MainState) {
            const st = state as MainStateWithGetters;
            return state.selectedPartyRanks.map((i) => {
                return st.electionResults[i]?.party.id;
            });
        },
        electionResults(state: MainState) {
            if (!state.currentElection) {
                return [];
            } else {
                return state.currentElection.results
                    .sort((a, b) => {
                        return b.votes - a.votes;
                    })
                    .map((r) => {
                        return {
                            votes: r.votes,
                            party: state.partyLib[r.party_id],
                        };
                    })
                    .filter((r) => {
                        return r.party;
                    });
            }
        },
        voteSetsHeavy(state: MainState) {
            if (!state.currentElection) {
                return [];
            } else {
                return state.currentElection.voteSets
                    .map((v) => {
                        const e = state.elections.find((e) => e.id === v[0]);
                        const m = state.municipalityLib[v[1]];
                        const p = state.partyLib[v[2]];
                        return [e, m, p, v[3]];
                    })
                    .filter((v) => v[0] && v[1] && v[2]);
            }
        },
        voteSetsForMunicipality(state: MainState) {
            if (!state.currentElection) {
                return [];
            }
            return state.currentElection.voteSets
                .filter((v) => {
                    return (
                        v[1] === state.currentMunicipality?.cbs_code &&
                        v[0] === state.currentElection?.id
                    );
                })
                .sort((a, b) => {
                    return b[3] - a[3];
                });
        },
        distanceList(state: MainState): DistanceList | null {
            const electionDistance = state.distances.find(
                (d) => d.election_id === state.currentElection?.id
            );
            if (electionDistance) {
                const distanceList = electionDistance.distances.find((d) => {
                    return (
                        d.municipality_code ===
                        state.currentMunicipality?.cbs_code
                    );
                });
                return distanceList ? distanceList : null;
            } else {
                return null;
            }
        },
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
        selectMunicipality(cbs_code: string) {
            this.currentMunicipality = this.municipalityLib[cbs_code];
        },
        selectParty(id: number) {
            this.currentParty = this.partyLib[id];
        },
        toggleParty(i: number) {
            const index = this.selectedPartyRanks.indexOf(i);
            if (index === -1) {
                this.selectedPartyRanks.push(i);
            } else {
                this.selectedPartyRanks.splice(index, 1);
            }
        },
    },
});
