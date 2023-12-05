import { VoteSet } from "./../types";

export const loadVotes = async (url: string): Promise<unknown> => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => response.json())
            .then((jsonFile: VoteSet[]) => {
                // const t = jsonFile.map((v) => {
                //     return [v[2], v[3], v[0], v[1]];
                // });
                // console.log(JSON.stringify(t));
                resolve(jsonFile);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    });
};
