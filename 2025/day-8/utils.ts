/**
 * Parses the input file and returns an array of 3D box coordinates.
 * Each line in the file should contain three comma-separated numbers representing x, y, z coordinates.
 *
 * @returns An array of 3D coordinates.
 */
export async function parseBoxes(): Promise<number[][]> {
    const file = Bun.file('./input.txt');
    const input = await file.text();

    return input
        .trim()
        .split('\n')
        .map(position => position.split(',').map(Number));
}

/**
 * Generates all unique pairs of indices from an array.
 *
 * @param arr - The input array.
 * @returns An array of index pairs [i, j] where i < j.
 */
export function getIndexPermutations<T>(arr: T[]): [number, number][] {
    const permutations: [number, number][] = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            permutations.push([i, j]);
        }
    }

    return permutations;
}

/**
 * Sorts connections by their Euclidean distance in 3D space.
 *
 * @param connections - Array of index pairs representing potential connections.
 * @param boxes - Array of 3D coordinates.
 * @returns The sorted connections truncated to MAX_CONNECTIONS.
 */
export function sortConnectionsByDistance(connections: [number, number][], boxes: number[][]) {
    const connectionDistance = ([i, j]: [number, number]) => distanceBetween(boxes[i]!, boxes[j]!);

    return connections.sort(
        (connA, connB) => connectionDistance(connA) - connectionDistance(connB)
    );
}

/**
 * Calculates the Euclidean (straight line) distance between two points in 3D space.
 * Formula for distance between points (x1, y1, z1) and (x2, y2, z2) is:
 *
 * Distance = sqrt( (x2 - x1)^2 + (y2 - y1)^2 + (z2 - z1)^2 )
 *
 * See https://en.wikipedia.org/wiki/Euclidean_distance#Higher_dimensions
 *
 * @param startPoint - The first point.
 * @param endPoint  - The second point.
 * @returns - The distance between the two points.
 */
function distanceBetween(startPoint: number[], endPoint: number[]) {
    if (startPoint.length !== 3) throw new Error('Invalid start point');
    if (endPoint.length !== 3) throw new Error('Invalid end point');

    const [startX, startY, startZ] = startPoint;
    const [endX, endY, endZ] = endPoint;

    return Math.sqrt(
        ((endX! - startX!) ** 2) +
        ((endY! - startY!) ** 2) +
        ((endZ! - startZ!) ** 2)
    );
}
