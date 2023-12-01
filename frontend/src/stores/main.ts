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
    currentParty: Party | null;
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
        } as MainState;
    },
    getters: {
        voteSetsHeavy(state: MainState) {
            return state.votes
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
    },
});
