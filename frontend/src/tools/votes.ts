import { VoteResult } from "../types";

export const resultsToPercentage = (results: VoteResult[]) => {
    const votesTotal = results.reduce((acc, v) => {
        return acc + v.votes;
    }, 0);
    return results
        .map((r) => {
            return {
                votes: Math.round((100 * r.votes) / votesTotal),
                party_id: r.party_id,
            };
        })
        .sort((a, b) => {
            return b.votes - a.votes;
        });
};

export const getDeviation = (
    election: VoteResult[],
    municipality: VoteResult[]
) => {
    const deviation = election.map((r) => {
        const m = municipality.find((m) => m.party_id === r.party_id);
        let deviation;
        if (!m) {
            deviation = -1;
        } else {
            deviation = m.votes - r.votes;
        }
        return {
            party_id: r.party_id,
            deviation,
        };
    });
    return deviation.sort((a, b) => {
        return Math.abs(b.deviation) - Math.abs(a.deviation);
    });
};
