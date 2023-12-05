import { Party_id } from "./votes";

export interface Party {
    id: Party_id;
    name: string;
    full: string;
    isParty: boolean;
    color: string;
}
