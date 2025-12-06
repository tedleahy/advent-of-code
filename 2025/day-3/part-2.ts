
/**
 * Day 3: Lobby - Part 2
 *
 * Basically the same as part 1, except this time we need to find the largest possible joltage
 * each bank can produce when exactly *twelve* batteries are turned on.
*/

import { maxJoltageForBank, parseBanks } from "./utils";

const banks = await parseBanks('./input.txt');
const totalJoltage = banks.reduce(
    (acc, bank) => acc + maxJoltageForBank(bank, 12),
    0,
);

console.log(totalJoltage);
