import {
    Election,
    Municipality,
    VoteSet,
    DeviationItem,
    DistanceList,
    Origin,
    Party,
} from "../types";

import {
    resultsToPercentage,
    getResultsForMunicipality,
    getDeviationItem,
    getDistanceingList,
} from "./relations";

export const voteSetsToRelations = (
    election: Election,
    voteSets: VoteSet[],
    municipalities: Municipality[]
): DistanceList[] => {
    const results: DistanceList[] = [];
    const deviations: DeviationItem[] = [];
    const electionNormalised = resultsToPercentage(election.results, true);
    for (const municipality of municipalities) {
        const municipalityResults = getResultsForMunicipality(
            municipality.cbs_code,
            voteSets
        );
        const municipalityNormalised = resultsToPercentage(
            municipalityResults,
            true
        );
        const municipalityDeviationItem = getDeviationItem(
            municipality.cbs_code,
            electionNormalised,
            municipalityNormalised
        );
        deviations.push(municipalityDeviationItem);
    }
    for (const municipality of municipalities) {
        const distanceList = getDistanceingList(municipality, deviations);
        results.push(distanceList);
    }

    return results;
};

export const originToVotes = async (
    path: string,
    election_id: number,
    parties: Party[],
    municipalities: Municipality[]
) => {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then((response) => response.json())
            .then((data: Origin[]) => {
                const converted = data.map((d) => {
                    let party = parties.find((p) => p.full === d.Partij);
                    const municipality = municipalities.find(
                        (m) => "G" + m.cbs_code === d.RegioCode
                    );
                    if (!party) {
                        switch (d.RegioUitslag) {
                            case "AantalBlancoStemmen":
                                party = parties.find(
                                    (p) => p.name === "Blanco"
                                );
                                break;
                            case "AantalOngeldigeStemmen":
                                party = parties.find(
                                    (p) => p.name === "Ongeldig"
                                );
                                break;
                        }
                    }
                    return {
                        election_id,
                        party_id: party ? party.id : 0,
                        votes: d.AantalStemmen,
                        municipality_code: municipality
                            ? municipality.cbs_code
                            : "",
                    };
                });
                resolve(converted.filter((c) => c.party_id !== 0));
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    });
};

export const sumElection = (votes: VoteSet[]) => {
    const results = [];
    for (const vote of votes) {
        const index = results.findIndex((r) => r.party_id === vote.party_id);
        if (index !== -1) {
            results[index].votes += vote.votes;
        } else {
            results.push({
                party_id: vote.party_id,
                votes: vote.votes,
            });
        }
    }
    return results;
};

// const count = () => {
//     //
//     const votes = store.parties.map((party) => {
//         const votes = store.votes.filter((vote) => {
//             return vote.party_id === party.id;
//         });
//         const n = votes.reduce((acc, v) => {
//             return acc + v.votes;
//         }, 0);
//         return {
//             party_id: party.id,
//             votes: n,
//         };
//     });
//     console.log(votes);
// };
