import {
    DeviationItem,
    Distance,
    DistanceList,
    Municipality,
    VoteResult,
    VoteSet,
} from "../types";

export const resultsToPercentage = (results: VoteResult[], doSort: boolean) => {
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

export const getResultsForMunicipality = (
    municipalityCode: string,
    voteSets: VoteSet[]
) => {
    return voteSets.filter((v) => {
        return v[2] === municipalityCode;
    });
};

export const getDeviationItem = (
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
        source_municipality_code: sourceDeviationItem.municipality_code,
        target_municipality_code: targetDeviationItem.municipality_code,
        distance,
    };
};

export const getDistanceingList = (
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
