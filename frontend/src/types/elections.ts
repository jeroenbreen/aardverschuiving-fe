export interface Election {
    id: number;
    year: number;
    type: "tweede-kamer" | "gemeenteraad" | "provinciale-staten" | "waterschap";
    results: {
        party_id: number;
        votes: number;
    }[];
}
