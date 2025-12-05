/**
 * Day 2: Gift Shop - Part 2
 *
 * The input file is a single line of ID ranges separated by commas, e.g.
 *     "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,..."
 *
 * An invalid ID is a number that repeats the same digits *at least* once, e.g. 123123, 123123123, etc.
 * So in the range 11-22, there are two invalid IDs, 11 and 22.
 * In the range 95-115, there are two invalid IDs, 99 and 111.
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
        if (isRepeatingDigits(currentId)) {
            count += currentId;
        }
    }
}

console.log(count);

/**
 * Checks whether a number is made up of only digits that repeat at least once.
 * e.g. 11, 123123, 646464.
 * @param {number} num - the number to check.
 * @returns {boolean} - whether the number is made up only of a repeating pattern of digits.
 */
function isRepeatingDigits(num: number): boolean {
    const numStr = num.toString();
    const numDigits = numStr.length;

    // A pattern can't repeat if it's more than half the total length of the number
    const maxPatternLength = numDigits / 2;

    for (let patternLength = 1; patternLength <= maxPatternLength; patternLength++) {
        // Skip if the pattern length doesn't divide evenly into the total length
        // e.g. a 3-digit pattern can't repeat cleanly into a 7-digit number
        if (numDigits % patternLength !== 0) continue;

        const candidatePattern = numStr.slice(0, patternLength);

        // Check if this pattern repeats throughout the entire number
        let patternRepeats = true;
        // Move through the string, getting chunks of the same length as the pattern, and checking
        // that they're equal to it
        for (let offset = patternLength; offset < numDigits; offset += patternLength) {
            const chunk = numStr.slice(offset, offset + patternLength);

            if (chunk !== candidatePattern) {
                patternRepeats = false;
                break;
            }
        }

        if (patternRepeats) return true;
    }

    return false;
}

/**
 * Does the same as isRepeatingDigits, but slower, because it's compiling a new regex for every
 * possible pattern length, for every ID. This was my first attempt at implementing this function.
 * It takes about 4 seconds to run vs about half a second for the other version.
 * @param num - the number to check.
 * @returns {boolean} - whether the number is just repeating digits
 */
function isRepeatingDigitsRegex(num: number): boolean {
    const numStr = num.toString();

    // Don't bother testing patterns more than half the length of the number - it can't repeat if
    // there's not enough space to do so!
    const maxPatternLength = numStr.length / 2;

    // For each possible pattern length, check if the number is made up of a repeating string of that length
    for (let patternLength = 1; patternLength <= maxPatternLength; patternLength++) {
        // The string length must be divisible by the pattern length to get a repeating pattern
        if (numStr.length % patternLength !== 0) continue;

        // Capture patternLength characters, which gives you a chunk of the number, and then check
        // whether that chunk (stored in \1) is repeated one or more times
        const patternRegex = new RegExp(`^(.{${patternLength}})\\1+$`);

        if (patternRegex.test(numStr)) {
            return true;
        }
    }

    return false;
}
