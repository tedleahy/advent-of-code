package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var positionsRegex = regexp.MustCompile(`\d+,\d+`)

const gridSize = 1000

type Grid [gridSize][gridSize]int
type position = struct {
	x int
	y int
}

func main() {
	var grid Grid

	file, err := os.Open("../input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		if line != "" {
			updateGrid(&grid, line)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	fmt.Println(calculateTotalBrightness(grid))
}

func calculateTotalBrightness(grid Grid) int {
	totalBrightness := 0

	for x := 0; x < gridSize; x++ {
		for y := 0; y < gridSize; y++ {
			totalBrightness += grid[x][y]
		}
	}

	return totalBrightness
}

func updateGrid(grid *Grid, instruction string) {
	start, end := getStartEndPositions(instruction)

	var lightOperation func(int, int)

	switch {
	case strings.HasPrefix(instruction, "turn on"):
		lightOperation = func(x, y int) { grid[x][y]++ }
	case strings.HasPrefix(instruction, "toggle"):
		lightOperation = func(x, y int) { grid[x][y] += 2 }
	case strings.HasPrefix(instruction, "turn off"):
		lightOperation = func(x, y int) {
			if grid[x][y] > 0 {
				grid[x][y]--
			}
		}
	}

	for x := start.x; x <= end.x; x++ {
		for y := start.y; y <= end.y; y++ {
			lightOperation(x, y)
		}
	}
}

func getStartEndPositions(instruction string) (position, position) {
	positions := positionsRegex.FindAllString(instruction, -1)

	return parsePosition(positions[0]), parsePosition(positions[1])
}

// Takes a string position (e.g. 0,0, and returns it as a position)
func parsePosition(positionStr string) position {
	xAndY := strings.Split(positionStr, ",")

	x, err := strconv.Atoi(xAndY[0])
	if err != nil {
		fmt.Println("Error reading X coordinate: ", err)
	}

	y, err := strconv.Atoi(xAndY[1])
	if err != nil {
		fmt.Println("Error reading Y coordinate: ", err)
	}

	return position{x: x, y: y}
}
