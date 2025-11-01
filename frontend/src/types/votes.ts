import { Party, Election, Municipality, Municipality_id } from "./index";

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

export type CellDistance = number;

export type VoteSet = [Municipality_id, Party_id, Votes];

export interface VoteSetHeavy {
    municipality: Municipality;
    party: Party | null;
    votes: Votes;
    distance: CellDistance;
}
