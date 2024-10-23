package main

import (
	"fmt"
	"os"
)

func main() {
	input, err := os.ReadFile("part-2-input.txt")
	if err != nil {
		panic(err)
	}

	currentFloor := 0

	for i, char := range input {
		if char == '(' {
			currentFloor++
		} else if char == ')' {
			currentFloor--
		}

		if currentFloor == -1 {
			fmt.Println(i + 1)
			break
		}
	}
}
