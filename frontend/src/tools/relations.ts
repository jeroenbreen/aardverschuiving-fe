import {
    DeviationItem,
    Distance,
    DistanceList,
    Municipality, Municipality_id,
    // VoteResult,
    VoteSet,
} from "../types";

export const resultsToPercentage = (results: VoteSet[], doSort: boolean) => {
    const votesTotal = results.reduce((acc, v) => {
        return acc + v[2];
    }, 0);
    const normalised = results.map((r) => {
        return {
            votes: Math.round((100 * r[2]) / votesTotal),
            party_id: r[1],
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

export const getResultsForMunicipality = (
    municipality_id: Municipality_id,
    voteSets: VoteSet[]
) => {
    return voteSets
        .filter((v) => {
            return v[0] === municipality_id;
        })
        .map((value) => {
            return {
                party_id: value[1],
                municipality_id: value[0],
                votes: value[2],
            };
        });
};

// export const getDeviationItem = (
//     municipality_id: Municipality_id,
//     electionResults: VoteResult[],
//     municipalityResults: VoteResult[]
// ): DeviationItem => {
//     const deviations = electionResults.map((e) => {
//         const m = municipalityResults.find((m) => m.party_id === e.party_id);
//         let deviation;
//         if (!m) {
//             // assuming a zero for the municipality
//             deviation = e.votes;
//         } else {
//             deviation = m.votes - e.votes;
//         }
//         return {
//             party_id: e.party_id,
//             deviation,
//         };
//     });
//     deviations.sort((a, b) => {
//         return Math.abs(b.deviation) - Math.abs(a.deviation);
//     });
//     return {
//         municipality_id: municipality_id,
//         deviations,
//     };
// };

export const getDistance = (
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
        source_municipality_id: sourceDeviationItem.municipality_id,
        target_municipality_id: targetDeviationItem.municipality_id,
        distance,
    };
};

export const getDistanceingList = (
    municipality: Municipality,
    deviations: DeviationItem[]
): DistanceList => {
    const distances = [];
    const thisDeviationItem = deviations.find((d) => {
        return d.municipality_id === municipality.id;
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
        municipality_id: municipality.id,
        distances,
    };
};
