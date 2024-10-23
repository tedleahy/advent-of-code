package main

import (
	"fmt"
	"os"
)

func main() {
	input, err := os.ReadFile("part-1-input.txt")
	if err != nil {
		panic(err)
	}

	currentFloor := 0

	for _, char := range input {
		if char == '(' {
			currentFloor++
		} else if char == ')' {
			currentFloor--
		}
	}

	fmt.Println(currentFloor)
}
