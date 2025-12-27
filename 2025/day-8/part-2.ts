/**
 * Day 8: Playground - Part 2
 *
 * Input is a list of 3d coordinates for junction boxes, e.g.
 *
 *  162,817,812
 *  57,618,57
 *  906,360,560
 *  592,479,940
 *  352,342,300
 *
 * Mostly the same as part one, except we have to keep connecting boxes until
 * they form a single big circuit, and then multiply the X coordinates of the
 * last two connected boxes to get the solution.
 */

import DisjointSet from "./DisjointSet";
import { parseBoxes, getIndexPermutations, sortConnectionsByDistance } from "./utils";

const boxes = await parseBoxes();

// Get all the possible connections between boxes as index pairs
const connections = getIndexPermutations(boxes);
// Sort them from shortest to longest distance
const sortedConnections = sortConnectionsByDistance(connections, boxes);

// Sort all the connections from shortest to longest distance
const circuits = new DisjointSet(boxes.length);
let lastConnected: number[] = [];

// Connect the boxes into circuits, shortest distance first, until all the
// boxes are connected into one big circuit
for (const [boxA, boxB] of sortedConnections) {
    circuits.union(boxA, boxB);

    // Stop when all the boxes are in the same circuit
    if (Math.max(...circuits.size) === boxes.length) {
        lastConnected = [boxA, boxB];
        break;
    }
}

// Get the X coordinates of the last two connected boxes
const [aX, bX] = lastConnected.map(index => boxes[index]?.[0]);
if (!aX || !bX) throw new Error('Error getting last 2 connected boxes');

// Multiply them together to get the solution
console.log(aX * bX);
