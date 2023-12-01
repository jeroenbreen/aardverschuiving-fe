import { defineStore } from "pinia";
import { Election, Municipality, Party, VoteSet } from "./../types";

interface MainState {
    loaded: boolean;
    elections: Election[];
    municipalities: Municipality[];
    parties: Party[];
    votes: VoteSet[];
    currentMunicipality: Municipality | null;
    currentElection: Election | null;
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
        } as MainState;
    },
    getters: {
        voteSetsHeavy(state: MainState) {
            const votes = [];
            const set = state.votes
                .filter((v) => v.votes > window.config.votes.min)
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
            return set;
        },
    },
    actions: {
        selectMunicipality(cbs_code: string) {
            this.currentMunicipality = this.municipalities.find(
                (m) => m.cbs_code === cbs_code
            )!;
        },
    },
});
