import * as fs from 'fs'

const input: string = fs.readFileSync('inputs/day-4.txt', 'utf-8')
const grid = input.split('\n')
const rows = grid.length
const cols = grid[0].length

let xMasCount = 0

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const currentLetter = grid[y][x] 

    if (currentLetter === 'A') {
      const positionHasValidDiagonals =
        y > 0 && y < (rows - 1) &&
        x > 0 && x < (cols - 1)
      
      if (!positionHasValidDiagonals) continue

      const firstDiagonal =
        grid[y-1][x-1] + // up-left
        currentLetter +
        grid[y+1][x+1]   // down-right

      if (firstDiagonal === 'MAS' || firstDiagonal === 'SAM') {
        const secondDiagonal =
          grid[y-1][x+1] + // up-right
          currentLetter +
          grid[y+1][x-1]   // down-left

        if (secondDiagonal === 'MAS' || secondDiagonal === 'SAM')
          xMasCount++
      }
    }
  }
}

console.log(xMasCount)
