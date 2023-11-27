export interface Election {
    id: number;
    year: number;
    type: "tweede-kamer" | "gemeenteraad" | "provinciale-staten" | "waterschap";
}
