import { defineStore } from "pinia";
import { Election, Municipality, Party, VoteResult, VoteSet } from "./../types";
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
            currentMunicipality: null,
            currentElection: null,
            currentParty: null,
            grid: 40,
            selectedParties: [1, 2, 3, 4, 6, 9, 12, 14],
        } as MainState;
    },
    getters: {
        voteSetsHeavy(state: MainState) {
            return state.votes
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
                        state.currentMunicipality?.cbs_code
                    );
                })
                .sort((a, b) => {
                    return b.votes - a.votes;
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
                            party: state.parties.find(
                                (p) => p.id === r.party_id
                            )!,
                        };
                    });
            }
        },
        electionResultsNormalised(state: MainState) {
            const st = state as MainStateWithGetters;
            const set = st.electionResults.map((r) => {
                return {
                    votes: r.votes,
                    party_id: r.party.id,
                };
            });
            return resultsToPercentage(set);
        },
        municipalityResultsNormalised(state: MainState) {
            const st = state as MainStateWithGetters;
            return resultsToPercentage(st.voteSetsForMunicipality);
        },
        municipalityResultsDeviation(state: MainState) {
            const st = state as MainStateWithGetters;
            const election = st.electionResultsNormalised;
            const municipality = st.municipalityResultsNormalised;
            return getDeviation(election, municipality);
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
    },
});
