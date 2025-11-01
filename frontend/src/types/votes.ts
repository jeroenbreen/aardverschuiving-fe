import { Party, Election, Municipality } from "./index";

export interface Origin {
    RegioNaam: string;
    RegioCode: string;
    RegioUitslag: string;
    Partij: string;
    AantalStemmen: Votes;
    AantalZetels: string;
}

export type Party_id = number;
export type Election_id = number;
export type Municipality_code = string;
export type Votes = number;

export interface VoteResult {
    party_id: number;
    votes: Votes;
}

export type CellDistance = number;

export type Municipality_id = number

export type VoteSet = [Municipality_id, Party_id, Votes];

export type VoteSetHeavy = [Election | null, Municipality, Party | null, Votes];

export type VoteSetHeavyWithDistance = [
    Election | null,
    Municipality,
    Party | null,
    Votes,
    CellDistance
];
