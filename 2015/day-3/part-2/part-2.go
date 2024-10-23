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

	visitedPositions := map[position]bool{{0, 0}: true}
	housesVisited := 1
	santa := position{0, 0}
	roboSanta := position{0, 0}

	for i, char := range input {
		switch char {
		case '^':
			if i%2 == 0 {
				roboSanta.y++
			} else {
				santa.y++
			}
		case 'v':
			if i%2 == 0 {
				roboSanta.y--
			} else {
				santa.y--
			}
		case '>':
			if i%2 == 0 {
				roboSanta.x++
			} else {
				santa.x++
			}
		case '<':
			if i%2 == 0 {
				roboSanta.x--
			} else {
				santa.x--
			}
		}

		if !visitedPositions[santa] {
			visitedPositions[santa] = true
			housesVisited++
		}

		if !visitedPositions[roboSanta] {
			visitedPositions[roboSanta] = true
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
