package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("../input.txt")
	if err != nil {
		fmt.Println("Error reading input file:", err)
		os.Exit(1)
	}

	lines := strings.Split(strings.TrimSpace(string(input)), "\n")

	literalStringsCharCount := 0
	parsedStringsCharCount := 0

	for _, line := range lines {
		literalStringsCharCount += len(line)

		parsedLine, err := strconv.Unquote(line)
		if err != nil {
			fmt.Printf("Error unquoting '%s': %s", line, err)
			os.Exit(1)
		}
		parsedStringsCharCount += len(parsedLine)
	}

	fmt.Println(literalStringsCharCount - parsedStringsCharCount)
}
