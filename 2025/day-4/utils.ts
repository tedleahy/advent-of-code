const DIRECTION_DELTAS = [
    { row: -1, col: -1 }, // top-left
    { row: -1, col: 0 }, // directly above
    { row: -1, col: 1 }, // top-right
    { row: 0, col: 1 }, // right
    { row: 1, col: 1 }, // bottom-right
    { row: 1, col: 0 }, // directly below
    { row: 1, col: -1 }, // bottom-left
    { row: 0, col: -1 }, // left
];

type Grid = string[][];

export async function parseInput(filePath: string): Promise<Grid> {
    const file = Bun.file('./input.txt');
    const input = await file.text();

    return input
        .trim()
        .split('\n')
        .map(row => row.split(''))
}

/**
 * Counts the rolls of paper that can be accessed for removal.
 * Optionally removes paper rolls immediately after they're counted.
 * @param grid - The puzzle input grid.
 * @param shouldRemove - Whether to remove an accessible roll of paper after counting it.
 * @returns The number of accessible rolls of paper in the grid.
 */
export function countAccessiblePapers(grid: Grid, shouldRemove = false): number {
    let count = 0;

    for (const [rowNum, row] of grid.entries()) {
        for (const [colNum, cell] of [...row].entries()) {
            if (cell === '@' && countAdjacentPapers(grid, rowNum, colNum) < 4) {
                if (shouldRemove) grid[rowNum]![colNum] = '.';
                count++;
            }
        }
    }

    return count;
}

/**
 * Counts the number of adjacent cells that are rolls of paper.
 * @param grid - The puzzle input grid.
 * @param row - The index of the current row.
 * @param col - The index of the current column.
 * @returns The number of adjacent cells that are rolls of paper.
 */
function countAdjacentPapers(grid: Grid, row: number, col: number): number {
    return DIRECTION_DELTAS.reduce(
        (paperCount, delta) => (
            paperCount + Number(isPaper(grid, row + delta.row, col + delta.col))
        ),
        0,
    );
}

/**
 * Tests that a grid position is in bounds and contains a roll of paper (signified by an '@').
 * @param grid - The puzzle input grid.
 * @param row - The index of the current row.
 * @param col - The index of the current column.
 * @returns Whether the cell in the specified position is a roll of paper.
 */
function isPaper(grid: Grid, row: number, col: number): boolean {
    const inBounds = row >= 0 && row < grid.length
        && col >= 0 && col < grid[row]!.length;

    return inBounds && grid[row]![col] === '@';
}
