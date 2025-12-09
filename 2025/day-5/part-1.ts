/**
 * Day 5: Cafeteria - Part 1
 *
 * The input is a list of ingredient ID ranges, a blank line, and a list of available ingredient IDs,
 * e.g:
 *
 *   3-5
 *   10-14
 *   12-18
 *
 *   1
 *   5
 *   8
 *
 * The task is to determine which of the available ingredient IDs are fresh, so basically to count
 * all the IDs after the blank line that are present in the ranges before the blank line.
 */

export type Range = {
    start: number;
    end: number;
}

const file = Bun.file('./input.txt');
const input = await file.text();

const [rangesInput, availableIds] = input
    .trim()
    .split('\n\n')
    .map(list => list.split('\n'));

if (!availableIds || !rangesInput) throw new Error('Bad input');

const ranges: Range[] = rangesInput.map(range => {
    const [start, end] = range.split('-').map(Number);
    if (start === undefined || end === undefined) throw new Error('Invalid range');

    return { start, end };
});

// Filter the available IDs down to those that exist in at least one range, and print their length.
console.log(
    availableIds.filter(id => numInRanges(Number(id), ranges)).length
);

/**
 * Tests whether a number is within a list of ranges.
 * @param num - The number to test.
 * @param ranges - The ranges of numbers.
 * @returns Whether the number exists within the ranges
 */
function numInRanges(num: number, ranges: Range[]): boolean {
    for (const { start, end } of ranges) {
        if (num >= start && num <= end) {
            return true;
        }
    }

    return false;
}
