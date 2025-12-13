/**
 * Day 6: Trash Compactor - Part 1
 *
 * Here we have a list of math problems, ordered in vertical columns like this:
 *
 *     123 328  51 64
 *      45 64  387 23
 *       6 98  215 314
 *     *   +   *   +
 *
 * Each column is separated by spaces. We need to calculate the answer to each problem, and sum
 * all the answers.
 * So in the above example, we'd do:
 *   - 123 * 45 * 6
 *   - 328 + 64 + 98
 *   etc., and then add up the results.
 */

export type Grid = string[][];

const file = Bun.file('./input.txt');
const input = await file.text();

// split into a 2D grid
const grid: Grid = input
    .trim()
    .split('\n')
    .map(line => line.trim().split(/\s+/));

const firstRow = grid[0];
if (!firstRow) throw new Error('Could not parse first row');

// The operation (add or multiply) will always be the last thing in a column
const operationsRow = grid[grid.length - 1];

let total = 0;

// Move across the first row, going down each column
for (let column = 0; column < firstRow.length; column++) {
    const operation = operationsRow?.[column];
    if (!operation) throw new Error('Could not parse operation');

    total += computeColumn(grid, column, operation);
}

console.log(total);

/**
 * Move down the column, either adding or multiplying all the values to get a solution.
 * @param grid - The full grid parsed from the puzzle input.
 * @param column - The number of the current column.
 * @param operation - The operation (add or multiply) to perform.
 */
function computeColumn(grid: Grid, column: number, operation: string): number {
    // Start with the identity value of the operation
    let solution = operation === '*' ? 1 : 0;

    for (let row = 0; row < grid.length - 1; row++) {
        const value = Number(grid[row]?.[column]);
        if (value === undefined) throw new Error(`Couldn't find a value at ${row},${column}`);

        if (operation === '+') solution += value;
        if (operation === '*') solution *= value;
    }

    return solution;
}
