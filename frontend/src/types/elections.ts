import { Election_id } from "./votes";
import { VoteSet } from "./votes";
import { Party } from "./parties";

export interface ElectionTotal {
    party: Party;
    votes: number;
}

export interface Election {
    id: Election_id;
    year: number;
    type: "tweede-kamer" | "gemeenteraad" | "provinciale-staten" | "waterschap";
    results: VoteSet[];
    totals?: ElectionTotal[];
}
