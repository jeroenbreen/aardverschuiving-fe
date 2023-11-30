import { defineStore } from "pinia";
import { Election, Municipality, Party, Vote } from "./../types";

interface MainState {
    loaded: boolean;
    elections: Election[];
    municipalities: Municipality[];
    parties: Party[];
    votes: Vote[];
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
    getters: {},
    actions: {
        selectMunicipality(cbs_code: string) {
            this.currentMunicipality = this.municipalities.find(
                (m) => m.cbs_code === cbs_code
            )!;
        },
    },
});
