/**
 * Day 5: Cafeteria - Part 2
 *
 * The puzzle input is the same as part 1, except this time we only need to look at the ID ranges.
 * The task this time is to count the number of unique IDs that exist in all the ranges.
 */

import type { Range } from "./part-1";

const file = Bun.file('./input.txt');
const input = await file.text();

const ranges = input
    .trim()
    .split('\n\n')[0]
    ?.split('\n')
    ?.map(range => {
        const [start, end] = range.split('-').map(Number);
        if (start === undefined || end === undefined) throw new Error('Invalid range');

        return { start, end };
    })
    ?.sort((a, b) => a.start - b.start);

if (!ranges) throw new Error("Couldn't parse puzzle input");

let total = 0;

// We're going to process ranges in blocks - overlapping/contiguous ranges will be merged into
// this current block
let currentBlock: Range = {
    start: ranges[0]!.start,
    end: ranges[0]!.end,
};

for (let i = 0; i < ranges.length; i++) {
    if (!ranges[i]) break;
    const { start, end } = ranges[i]!;

    if (start <= currentBlock.end + 1) {
        // If this range overlaps with or touches the current block, merge it in.
        currentBlock.end = Math.max(currentBlock.end, end);
    } else {
        total += currentBlock.end - currentBlock.start + 1;
        currentBlock.start = start;
        currentBlock.end = end;
    }
}

// Add the last block
total += currentBlock.end - currentBlock.start + 1;

console.log(total);
