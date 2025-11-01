import { Data } from "./../types";

export const loadData = async (url: string): Promise<Data> => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => response.json())
            .then((jsonFile: Data) => {
                resolve(jsonFile);
            })
            .catch((error) => console.error("Error fetching JSON:", error));
    });
};
