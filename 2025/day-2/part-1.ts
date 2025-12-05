/**
 * Day 2: Gift Shop - Part 1
 *
 * The input file is a single line of ID ranges separated by commas, e.g.
 *     "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,..."
 *
 * An invalid ID is a number that repeats the same digits exactly once, e.g. 123123 or 6464.
 * So in the range 11-22, there are two invalid IDs, 11 and 22.
 * In the range 95-115, there is one invalid ID, 99.
 *
 * The task is to find the sum of all the invalid IDs in all the ranges.
 */

const file = Bun.file('./input.txt');
const input = await file.text();

let count = 0;

for (const idRange of input.split(',')) {
    let [start, end] = idRange.split('-').map(Number);

    if (!start) throw new Error('no range start');
    if (!end) throw new Error('no range end');

    for (let currentId = start; currentId <= end; currentId++) {
        const currentIdStr = currentId.toString();

        // We're looking for a sequence of digits that repeats itself once.
        // If an id has an odd number of digits, it can't repeat itself, so skip this iteration.
        if (currentIdStr.length % 2 !== 0) continue;

        const midPoint = Math.floor(currentIdStr.length / 2);
        const firstHalf = currentIdStr.substring(0, midPoint);
        const secondHalf = currentIdStr.substring(midPoint);

        if (firstHalf === secondHalf) {
            count += currentId;
        }
    }
}

console.log(count);
