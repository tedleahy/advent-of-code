/**
 * Day 7: Laboratories - Part 2
 *
 * Similar to part 1, but instead of counting the number of times the beam splits, here we need
 * to count the total number of distinct paths the beam can take through the manifold.
 * Previously seen paths are cached to avoid recomputation.
 */

const file = Bun.file('./input.txt');
const input = await file.text();

let grid = input.trim().split('\n').map(row => row.split(''));
if (!grid[0]) throw new Error('Could not parse grid');

const solutions: Record<string, number> = {};

/**
 * Counts the number of distinct paths from a given position to the bottom of the grid.
 * Uses memoisation to avoid recomputing the same subproblems.
 *
 * @param row - Current row index
 * @param col - Current column index
 * @returns Number of distinct paths from this position to the bottom
 */
function pathsFromPosition(row: number, col: number): number {
    // If we've already seen this position before, just return the solution we already found
    const existingSolution = solutions[`${row},${col}`];
    if (existingSolution) return existingSolution;

    // Base case: we've made it to the bottom of the grid, that means the beam's path ends
    if (row >= grid.length) return 1;

    const currentChar = grid[row]![col];
    // Either split and count the number of possible paths starting from each side of the splitter,
    // or move down a row and count the number of possible paths from there
    const solution = currentChar === '^'
        ? pathsFromPosition(row, col - 1) + pathsFromPosition(row, col + 1)
        : pathsFromPosition(row + 1, col);

    // Cache this solution for future calls
    solutions[`${row},${col}`] = solution;
    return solution;
}

const startCol = grid[0].indexOf('S');
console.log(pathsFromPosition(0, startCol));
