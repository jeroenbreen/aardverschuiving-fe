export const settings = {
    width: 400,
    padding: 20,
};

export const boundingBox = {
    x1: 3.31497114423,
    x2: 7.09205325687,
    y1: 53.5104033474,
    y2: 50.803721015,
};

// compensation factor for projection
const factor = 1.2;

export const ratio =
    (boundingBox.x2 - boundingBox.x1) /
    (boundingBox.y1 - boundingBox.y2) /
    factor;
