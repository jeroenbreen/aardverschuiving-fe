import { Election } from "./elections";
import { Party } from "./parties";
import { Municipality } from "./municipalities";

export interface Data {
    elections: Election[];
    parties: Party[];
    municipalities: Municipality[];
}
