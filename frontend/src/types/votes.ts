import { Party, Election, Municipality } from "./index";

export interface VoteSet {
    party_id: number;
    election_id: number;
    municipality_code: string;
    votes: number;
}

export interface VoteSetHeavy {
    party: Party | null;
    election: Election | null;
    municipality: Municipality;
    votes: number;
}

export interface VoteResult {
    party_id: number;
    votes: number;
}
