import { Municipality_code } from "./votes";

export interface Municipality {
    id: number;
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
