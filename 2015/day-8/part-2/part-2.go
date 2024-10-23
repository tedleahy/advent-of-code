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
	encodedStringsCharCount := 0

	for _, line := range lines {
		literalStringsCharCount += len(line)
		encodedStringsCharCount += len(strconv.Quote(line))
	}

	fmt.Println(encodedStringsCharCount - literalStringsCharCount)
}
