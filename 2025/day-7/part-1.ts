/**
 * Day 7: Laboratories - Part 1
 *
 * The input is a diagram of a tachyon manifold, e.g.
 *   .......S.......
 *   ...............
 *   .......^.......
 *   ...............
 *   ......^.^......
 *   ...............
 *   .....^.^.^.....
 *   ...............
 *   ....^.^...^....
 *   ...............
 *   ...^.^...^.^...
 *   ...............
 *   ..^...^.....^..
 *   ...............
 *   .^.^.^.^.^...^.
 *   ...............
 *
 * A tachyon beam starts at 'S'
 * and splits when it hits a '^' character, creating two new beams that move
 * one column left and one column right respectively. We need to count how many
 * times the beam splits before it exits the diagram.
 */

const file = Bun.file('./input.txt');
const input = await file.text();

const rows = input.trim().split('\n');
if (!rows[0]) throw new Error('Could not parse lines');

const startCol = rows[0].indexOf('S');
// The beam can split, which means we end up with multiple beams in multiple columns
let currentCols = new Set([startCol]);

let splitCount = 0;

for (let rowNum = 0; rowNum < rows.length - 1; rowNum++) {
    for (const colNum of currentCols) {
        const nextChar = rows[rowNum + 1]![colNum];

        if (nextChar === '^') {
            splitCount++;

            currentCols.delete(colNum);
            currentCols.add(colNum - 1);
            currentCols.add(colNum + 1);
        }
    }
}

console.log(splitCount);
