import { defineStore } from "pinia";
import { Election, Municipallity, Party, Vote } from "./../types";

interface MainState {
    elections: Election[];
    municipallities: Municipallity[];
    parties: Party[];
    votes: Vote[];
}

export const useMainStore = defineStore("main", {
    state: () => {
        return {
            elections: [],
            municipallities: [],
            parties: [],
            votes: [],
        } as MainState;
    },
    getters: {},
    actions: {},
});
