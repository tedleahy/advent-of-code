/**
 * Finds the highest possible joltage that can be made by turning on exactly 12 batteries in a bank.
 * @param {Array<number>} bank - An array of numbers representing the joltages of batteries in a bank.
 * @param {number} batteryCount - The number of batteries that should be in the max joltage.
 * @returns
 */
export function maxJoltageForBank(bank: number[], batteryCount: number): number {
    const joltageDigits: number[] = [];
    let startIndex = 0;

    for (let remaining = batteryCount; remaining > 0; remaining--) {
        // Search from startIndex to the last position that leaves enough digits remaining
        const endIndex = bank.length - remaining + 1;
        const possibleBatteries = bank.slice(startIndex, endIndex);

        const maxJoltage = Math.max(...possibleBatteries);
        joltageDigits.push(maxJoltage);

        // Move the start index to just after the joltage we've just chosen
        startIndex = bank.indexOf(maxJoltage, startIndex) + 1;
    }

    return Number(joltageDigits.join(''));
}

/**
 * Takes a path to an input file, splits it into lines, and converts each line into an array of numbers.
 * @param {string} inputFilePath - the path to the input file.
 * @returns {Promise<number[][]>} - An array of lines, with each line as an array of numbers.
 */
export async function parseBanks(inputFilePath: string): Promise<number[][]> {
    const file = Bun.file(inputFilePath);
    const input = await file.text();

    return input
        .trim()
        .split('\n')
        .map(bank => bank.split('').map(Number)); // convert each line into an array of numbers
}
