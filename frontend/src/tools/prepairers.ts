import {
    Election,
    Municipality,
    Relation,
    VoteResult,
    VoteSet,
    DeviationItem,
    DistanceList,
    Distance,
} from "../types";

const resultsToPercentage = (results: VoteResult[], doSort: boolean) => {
    const votesTotal = results.reduce((acc, v) => {
        return acc + v.votes;
    }, 0);
    const normalised = results.map((r) => {
        return {
            votes: Math.round((100 * r.votes) / votesTotal),
            party_id: r.party_id,
        };
    });
    if (doSort) {
        return normalised.sort((a, b) => {
            return b.votes - a.votes;
        });
    } else {
        return normalised;
    }
};

const getResultsForMunicipality = (
    municipalityCode: string,
    voteSets: VoteSet[]
) => {
    return voteSets.filter((v) => {
        return v.municipality_code === municipalityCode;
    });
};

const getDeviationItem = (
    municipalityCode: string,
    electionResults: VoteResult[],
    municipalityResults: VoteResult[]
): DeviationItem => {
    const deviations = electionResults.map((e) => {
        const m = municipalityResults.find((m) => m.party_id === e.party_id);
        let deviation;
        if (!m) {
            // assuming a zero for the municipality
            deviation = e.votes;
        } else {
            deviation = m.votes - e.votes;
        }
        return {
            party_id: e.party_id,
            deviation,
        };
    });
    deviations.sort((a, b) => {
        return Math.abs(b.deviation) - Math.abs(a.deviation);
    });
    return {
        municipality_code: municipalityCode,
        deviations,
    };
};

const getDistance = (
    sourceDeviationItem: DeviationItem,
    targetDeviationItem: DeviationItem
): Distance => {
    let distance = 0;
    for (const sourceDeviation of sourceDeviationItem.deviations) {
        const targetDeviation = targetDeviationItem.deviations.find((d) => {
            return d.party_id === sourceDeviation.party_id;
        });
        if (targetDeviation) {
            distance += Math.abs(
                sourceDeviation.deviation - targetDeviation.deviation
            );
        } else {
            distance += Math.abs(sourceDeviation.deviation);
        }
    }

    return {
        source_municipality_code: sourceDeviationItem.municipality_code,
        target_municipality_code: targetDeviationItem.municipality_code,
        distance,
    };
};

const getDistanceingList = (
    municipality: Municipality,
    deviations: DeviationItem[]
): DistanceList => {
    const distances = [];
    const thisDeviationItem = deviations.find((d) => {
        return d.municipality_code === municipality.cbs_code;
    });
    if (thisDeviationItem) {
        for (const deviation of deviations) {
            if (deviation !== thisDeviationItem) {
                const distance = getDistance(thisDeviationItem, deviation);
                distances.push(distance);
            }
        }
    }
    distances.sort((a, b) => {
        return a.distance - b.distance;
    });
    distances.length = 12;

    return {
        municipality_code: municipality.cbs_code,
        distances,
    };
};

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
