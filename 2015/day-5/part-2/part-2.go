package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile("../input.txt")
	check(err)

	lines := strings.Split(string(input), "\n")
	niceStringsCount := 0

	for _, line := range lines {
		if hasRepeatingPair(line) && hasRepeatingLetterWithSeparator(line) {
			niceStringsCount++
		}
	}

	fmt.Println(niceStringsCount)
}

func hasRepeatingPair(str string) bool {
	for i := 0; i < len(str)-1; i++ {
		pair := str[i : i+2]

		if strings.Count(str, pair) > 1 {
			return true
		}
	}

	return false
}

func hasRepeatingLetterWithSeparator(str string) bool {
	for i := 0; i < len(str)-2; i++ {
		chunk := str[i : i+3]

		if chunk[0] == chunk[2] {
			return true
		}
	}

	return false
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
