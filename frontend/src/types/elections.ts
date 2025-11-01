import { Election_id } from "./votes";
import { VoteSet } from "./votes";

export interface Election {
    id: Election_id;
    year: number;
    type: "tweede-kamer" | "gemeenteraad" | "provinciale-staten" | "waterschap";
    results: VoteSet[];
    loaded?: boolean;
}
