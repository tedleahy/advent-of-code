const file = Bun.file('./input.txt');
const input = await file.text();

let dialPosition = 50;
let zeroCount = 0;

for (const line of input.split('\n')) {
    if (!line[0]) continue;

    const direction = line[0];
    const rotationDistance = parseInt(line.substring(1).trim(), 10);

    // Every time the dial does a full rotation, it crosses zero, so add that to the count
    const fullRotations = Math.trunc(rotationDistance / 100);
    zeroCount += fullRotations;

    const remaining = rotationDistance % 100;
    const delta = direction === 'L' ? -remaining : remaining;

    // If the dial was already on zero, that's been counted so don't count it as crossing zero again
    if (dialPosition != 0) {
        // Check if turning it the remaining distance (either left or right) causes it to cross zero
        if (direction === 'L' && (dialPosition - remaining) <= 0)
            zeroCount++;

        if (direction === 'R' && (dialPosition + remaining) > 99)
            zeroCount++;
    }

    dialPosition += delta;

    // Keep in the range of 0-99, wrapping around if needed
    dialPosition = (dialPosition + 100) % 100;
}

console.log(zeroCount);


