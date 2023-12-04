export interface Relation {
    municipality_code: string;
    relations: { municipality_id: number; strenth: number }[];
}

export interface DeviationItem {
    municipality_code: string;
    deviations: { party_id: number; deviation: number }[];
}

export interface Distance {
    source_municipality_code: string;
    target_municipality_code: string;
    distance: number;
}

export interface DistanceList {
    municipality_code: string;
    distances: Distance[];
}

export interface ElectionDistance {
    election_id: number;
    distances: DistanceList[];
}
