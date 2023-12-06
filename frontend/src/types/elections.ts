import { Election_id } from "./votes";
import { VoteSet } from "./votes";

export interface Election {
    id: Election_id;
    year: number;
    type: "tweede-kamer" | "gemeenteraad" | "provinciale-staten" | "waterschap";
    url: string;
    loaded: boolean;
    voteSets: VoteSet[];
    results: {
        party_id: number;
        votes: number;
    }[];
}
