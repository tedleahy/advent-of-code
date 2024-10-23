package main

import (
	"fmt"
	"os"
)

type position struct {
	x int
	y int
}

func main() {
	input, err := os.ReadFile("../input.txt")
	check(err)

	currentX, currentY := 0, 0
	visitedPositions := map[position]bool{{0, 0}: true}
	housesVisited := 1

	for _, char := range input {
		switch char {
		case '^':
			currentY++
		case 'v':
			currentY--
		case '>':
			currentX++
		case '<':
			currentX--
		}

		currentPosition := position{x: currentX, y: currentY}
		if !visitedPositions[currentPosition] {
			visitedPositions[currentPosition] = true
			housesVisited++
		}
	}

	fmt.Println(housesVisited)
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
