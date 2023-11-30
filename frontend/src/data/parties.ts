import { Party } from "../types";

const parties: Party[] = [
    {
        id: 1,
        name: "Blanco",
        isParty: false,
        color: "grey",
    },
    {
        id: 2,
        name: "Ongeldig",
        isParty: false,
        color: "grey",
    },
    {
        id: 3,
        name: "VVD",
        isParty: true,
        color: "#4c44ff",
    },
    {
        id: 4,
        name: "PVV",
        isParty: true,
        color: "#70d4ff",
    },
    {
        id: 5,
        name: "CDA",
        isParty: true,
        color: "#005c00",
    },
];

export default parties;
