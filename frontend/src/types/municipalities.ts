import { Municipality_code } from "./votes";

export type Municipality_id = number


export interface Municipality {
    id: Municipality_id;
    name: string;
    latitude: number;
    longitude: number;
    cbs_code?: Municipality_code;
    province?: string;
    population?: number;
    area?: number;
    migrants?: number;
    migrants_western?: number;
    migrants_non_western?: number;
    income?: number;
}
