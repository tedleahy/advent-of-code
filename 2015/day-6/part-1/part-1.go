package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type position = struct {
	x int
	y int
}

type positionsLookup = map[position]bool

var positionsRegex = regexp.MustCompile(`\d+,\d+`)

func main() {
	file, err := os.Open("../input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lightOnPositions := make(positionsLookup)

	for scanner.Scan() {
		line := scanner.Text()
		if line != "" {
			lightOnPositions = updateLightOnPositions(lightOnPositions, line)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	fmt.Println(len(lightOnPositions))
}

func updateLightOnPositions(lightOnPositions positionsLookup, instruction string) positionsLookup {
	start, end := getStartEndPositions(instruction)

	var lightOperation func(position)

	switch {
	case strings.HasPrefix(instruction, "turn on"):
		lightOperation = func(p position) { lightOnPositions[p] = true }
	case strings.HasPrefix(instruction, "turn off"):
		lightOperation = func(p position) { delete(lightOnPositions, p) }
	case strings.HasPrefix(instruction, "toggle"):
		lightOperation = func(p position) {
			if lightOnPositions[p] {
				delete(lightOnPositions, p)
			} else {
				lightOnPositions[p] = true
			}
		}
	}

	for x := start.x; x <= end.x; x++ {
		for y := start.y; y <= end.y; y++ {
			lightOperation(position{x, y})
		}
	}

	return lightOnPositions
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
