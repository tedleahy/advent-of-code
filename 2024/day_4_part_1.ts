import * as fs from 'fs';

const input: string = fs.readFileSync('inputs/day-4.txt', 'utf-8')
const grid = input.split('\n')
const rows = grid.length
const cols = grid[0].length

const directions = [
  [0, 1],   // right
  [0, -1],  // left
  [-1, 0],  // up
  [1, 0],   // down
  [-1, 1],  // up-right
  [-1, -1], // up-left
  [1, 1],   // down-right
  [1, -1],  // down-left
]

let xmasCount = 0

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    for (const direction of directions) {
      if (checkDirection(y, x, direction)) xmasCount++
    }
  }
}

console.log(xmasCount)

function checkDirection(y: number, x: number, [directionY, directionX]: number[]): boolean {
  let word = ''

  for (let i = 0; i < 4; i++) { // 4 = length of 'XMAS'
    const newY = y + directionY * i
    const newX = x + directionX * i
    const newYIsValid = newY >= 0 && newY < cols
    const newXIsValid = newX >= 0 && newX < rows 
    
    if (!newYIsValid || !newXIsValid) return false

    word += grid[newY][newX]
  }

  return word === 'XMAS'
}
