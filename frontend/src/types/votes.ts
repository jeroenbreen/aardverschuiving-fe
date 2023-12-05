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

export type VoteSet = [Party_id, Election_id, Municipality_code, Votes];

export type VoteSetHeavy = [Party | null, Election | null, Municipality, Votes];

export interface VoteResult {
    party_id: number;
    votes: Votes;
}

export interface VoteSetHeavyWithDistance extends VoteSetHeavy {
    distance: number;
}
