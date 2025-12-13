/**
 * Day 6: Trash Compactor - Part 2
 *
 * The problems still look the same as part 1:
 *
 *     123 328  51 64
 *      45 64  387 23
 *       6 98  215 314
 *     *   +   *   +
 *
 * But this time instead of operating on the numbers normally, we need to split each number into
 * columns, and perform the operation on each column from right to left.
 * We process the columns from right to left, grouping numbers by their column position.
 *
 * E.g. in the rightmost problem in the above example, there are 3 columns, from right to left:
 * 4 on its own in the last column, 431 in the middle column, and 623 in the first column.
 * To get the solution, we'd do 4 * 431 * 623.
 * Move over one problem to the left, and there are 3 columns again, so we'd do 175 * 581 * 32.
 * We continue this process until we've processed all columns.
 * The final answer is the sum of all the individual problem solutions.
 */

const file = Bun.file('./input.txt');
const input = await file.text();

const lines = input.trim().split('\n');
if (!lines[0]) throw new Error('Could not parse first line');

let total = 0;
let currentIndex = lines[0].length - 1;

while (currentIndex >= 0) {
    const { solution, nextIndex } = solveProblem(lines, currentIndex);
    total += solution;
    currentIndex = nextIndex;
}

console.log(total);

/**
 * Given a start index, finds the next operator along, and works down each column from the start
 * index to the operator, building up numbers to either add or multiply together.
 * @param lines - Array of puzzle input lines.
 * @param startIndex - The column index to start from.
 * @returns { { solution, nextIndex } } - The solution to the problem, and the index to start from for the next problem.
 */
function solveProblem(
    lines: string[],
    startIndex: number,
): { solution: number; nextIndex: number } {
    let currentIndex = startIndex;

    const isOperator = (str: string) => str === '+' || str === '*';

    // Find the index of the next operator ('+' or '*').
    const lastLine = lines.at(-1); // operator is always on the last line
    let operatorIndex = currentIndex;
    while (!isOperator(lastLine?.[operatorIndex] ?? '')) operatorIndex--;

    const operands: number[] = [];

    // Go down each column to make a number until we get to the same index as the operator.
    while (currentIndex >= operatorIndex) {
        let currentNumber = '';

        // Skip the last line, as that contains the operators
        for (let i = 0; i < lines.length - 1; i++) {
            currentNumber += lines[i]?.[currentIndex];
        }

        operands.push(Number(currentNumber));
        currentIndex--;
    }

    // Do the actual add or multiply operation on all the operands we've found
    const operator = lastLine?.[operatorIndex];
    let solution = 0;

    if (operator === '+') solution = operands.reduce((acc, operand) => acc + operand);
    if (operator === '*') solution = operands.reduce((acc, operand) => acc * operand);

    return {
        solution,
        nextIndex: currentIndex - 1,
    };
}
