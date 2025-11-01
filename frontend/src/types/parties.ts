import { Party_id } from "./votes";

export interface Party {
    id: Party_id;
    name: string;
    full_name: string;
    isParty: boolean;
    color: string;
}
