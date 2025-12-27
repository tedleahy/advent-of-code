/**
 * Day 8: Playground - Part 1
 *
 * Input is a list of 3d coordinates for junction boxes, e.g.
 *
 *  162,817,812
 *  57,618,57
 *  906,360,560
 *  592,479,940
 *  352,342,300
 *
 * We have to connect together the first 1000 pairs of junction boxes which
 * are closest together by straight line distance.
 * Connecting two or more boxes forms a circuit.
 * When connecting two boxes (box A and box B):
 *   - If box A is in a circuit and box B isn't, add box B to that circuit, and vice versa.
 *   - If two boxes are closest to each other but in different circuits, those circuits are merged.
 *
 * The solution is the product of the sizes of the three largest circuits.
 */

import DisjointSet from "./DisjointSet";
import { getIndexPermutations, parseBoxes, sortConnectionsByDistance } from "./utils";

const MAX_CONNECTIONS = 1000;

const boxes = await parseBoxes();

// Get all the possible connections between boxes as index pairs
const connections = getIndexPermutations(boxes);
// Get the top connections, sorted from shortest to longest distance apart
const sortedConnections = sortConnectionsByDistance(connections, boxes)
    .slice(0, MAX_CONNECTIONS);

const circuits = new DisjointSet(boxes.length);

// Connect the boxes into circuits, shortest distance first
sortedConnections.forEach(([boxA, boxB]) => circuits.union(boxA, boxB));

// Get the sizes of the top 3 biggest circuits
const topCircuits = circuits.size.sort((a, b) => b - a).slice(0, 3);

// Multiply them together to get the solution
console.log(topCircuits.reduce((acc, x) => acc * x, 1))
