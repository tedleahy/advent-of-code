const file = Bun.file('./input.txt');
const input = await file.text();

let currentDialPosition = 50;
let zeroCount = 0;

for (const line of input.split('\n')) {
    if (!line[0]) continue;

    const direction = line[0];
    const rotationDistance = parseInt(line.substring(1).trim(), 10);
    const delta = direction === 'L' ? -rotationDistance : rotationDistance;

    currentDialPosition = currentDialPosition + delta;
    // Keep in the range of 0-99, wrap around if needed
    currentDialPosition = (currentDialPosition + 100) % 100;
    
    if (currentDialPosition === 0) zeroCount++;
}

console.log(zeroCount);
