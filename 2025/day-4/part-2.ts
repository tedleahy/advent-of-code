/**
 * Day 4: Printing Department - Part 2
 *
 * This is the same as part 1 except instead of just counting how many rolls of paper could be
 * removed, we have to also remove them as we go along and keep going until it's not possible to
 * remove any more.
*/

import { countAccessiblePapers, parseInput } from "./utils";

const grid = await parseInput('./input.txt');

let totalCount = 0;

// Keep removing papers, tracking how many have been removed until no more can be removed.
while (true) {
    const removedCount = countAccessiblePapers(grid, true);
    totalCount += removedCount;

    if (!removedCount) break;
}

console.log(totalCount);
