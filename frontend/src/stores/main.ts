import { defineStore } from "pinia";
import {
    Election,
    Municipality,
    Party,
    VoteResult,
    VoteSet,
    ElectionDistance,
    DistanceList,
} from "./../types";
import { getDeviation, resultsToPercentage } from "../tools/votes";

interface MainState {
    loaded: boolean;
    elections: Election[];
    municipalities: Municipality[];
    parties: Party[];
    votes: VoteSet[];
    currentMunicipality: Municipality | null;
    currentElection: Election | null;
    currentParty: Party | null;
    grid: number;
    selectedParties: number[];
    distances: ElectionDistance[];
}

interface MainStateWithGetters extends MainState {
    electionResults: { party: Party; votes: number }[];
    voteSetsForMunicipality: VoteSet[];
    electionResultsNormalised: VoteResult[];
    municipalityResultsNormalised: VoteResult[];
}

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            loaded: false,
            elections: [],
            municipalities: [],
            parties: [],
            votes: [],
            distances: [],
            currentMunicipality: null,
            currentElection: null,
            currentParty: null,
            grid: 40,
            selectedParties: [1, 2, 3, 4, 6, 9, 12, 14],
        } as MainState;
    },
    getters: {
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
                            party: state.parties.find(
                                (p) => p.id === r.party_id
                            )!,
                        };
                    })
                    .filter((r) => {
                        return r.party;
                    });
            }
        },
        voteSetsHeavy(state: MainState) {
            return state.votes
                .filter((v) => {
                    return v.election_id === state.currentElection?.id;
                })
                .map((v) => {
                    return {
                        votes: v.votes,
                        party: state.parties.find((p) => p.id === v.party_id)!,
                        election: state.elections.find(
                            (e) => e.id === v.election_id
                        ),
                        municipality: state.municipalities.find(
                            (m) => m.cbs_code === v.municipality_code
                        ),
                    };
                })
                .filter((v) => v.municipality && v.party && v.election);
        },
        voteSetsForMunicipality(state: MainState) {
            return state.votes
                .filter((v) => {
                    return (
                        v.municipality_code ===
                            state.currentMunicipality?.cbs_code &&
                        v.election_id === state.currentElection?.id
                    );
                })
                .sort((a, b) => {
                    return b.votes - a.votes;
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
    },
    actions: {
        selectMunicipality(cbs_code: string) {
            this.currentMunicipality = this.municipalities.find(
                (m) => m.cbs_code === cbs_code
            )!;
        },
        selectParty(id: number) {
            this.currentParty = this.parties.find((p) => p.id === id)!;
        },
        toggleParty(party: Party) {
            const index = this.selectedParties.indexOf(party.id);
            if (index === -1) {
                this.selectedParties.push(party.id);
            } else {
                this.selectedParties.splice(index, 1);
            }
        },
        setSelected(party_ids: number[]) {
            this.selectedParties.length = 0;
            party_ids.forEach((id) => {
                this.selectedParties.push(id);
            });
        },
    },
});
