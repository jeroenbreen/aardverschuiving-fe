import {Municipality_id} from "@/types/municipalities";

export interface Relation {
    municipality_code: string;
    relations: { municipality_id: number; strenth: number }[];
}

export interface DeviationItem {
    municipality_id: Municipality_id;
    deviations: { party_id: number; deviation: number }[];
}

export interface Distance {
    source_municipality_id: Municipality_id;
    target_municipality_id: Municipality_id;
    distance: number;
}

export interface DistanceList {
    municipality_id: Municipality_id;
    distances: Distance[];
}

export interface ElectionDistance {
    election_id: number;
    distances: DistanceList[];
}
