import { VoteSet } from "./../types";

export const loadVotes = async (url: string): Promise<unknown> => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => response.json())
            .then((jsonFile: VoteSet[]) => {
                resolve(jsonFile);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    });
};
