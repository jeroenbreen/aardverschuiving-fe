import { Municipality_code } from "./votes";

export interface Municipality {
    title: string;
    cbs_code: Municipality_code;
    province: string;
    population: number;
    latitude: number;
    longitude: number;
    area: number;
    migrants: number;
    migrants_western: number;
    migrants_non_western: number;
    income: number;
    election_ids?: number[];
}
