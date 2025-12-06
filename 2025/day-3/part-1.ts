
/**
 * Day 3: Lobby - Part 1
 *
 * Each line of the puzzle input represents a bank of a batteries.
 * Each digit in the line is the joltage rating (1-9) of a battery.
 * E.g.
 *
 *    987654321111111
 *    811111111111119
 *    234234234234278
 *    818181911112111
 *
 * The joltage each bank produces is equal to the number formed by the digits
 * on the batteries that have been turned on. E.g. if you have a bank 12345 and you turn on
 * batteries 2 and 4, the bank produces 24 jolts.
 *
 * The task is to find the largest possible joltage each bank can produce when exactly two
 * batteries are turned on.
*/

import { maxJoltageForBank, parseBanks } from "./utils";

const banks = await parseBanks('./input.txt');

const totalJoltage = banks.reduce(
    (acc, bank) => acc + maxJoltageForBank(bank, 2),
    0,
);

console.log(totalJoltage);
