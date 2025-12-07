/**
 * Day 4: Printing Department - Part 1
 * The puzzle input is a grid like:
 *
 *    ..@@.@@@@.
 *    @@@.@.@.@@
 *    @@@@@.@.@@
 *    @.@@@@..@.
 *    @@.@@@@.@@
 *    .@@@@@@@.@
 *    .@.@.@.@@@
 *    @.@@@.@@@@
 *    .@@@@@@@@.
 *    @.@.@@@.@.
 *
 * where each '@' is a roll of paper.
 *
 * A roll of paper can be removed if there are fewer than four rolls of paper in the 8 adjacent
 * positions (horizontal, vertical, diagonal). The task here is to count how many rolls of paper
 * can be removed.
 */

import { countAccessiblePapers, parseInput } from "./utils";

const grid = await parseInput('./input.txt');
console.log(countAccessiblePapers(grid))
