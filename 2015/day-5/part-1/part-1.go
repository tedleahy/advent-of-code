package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

// match 0+ of any char, followed by a vowel, 3 times.
// This makes the regex non-greedy and allows it to match individual vowels
var vowelsRegex = regexp.MustCompile("(.*[aeiou]){3,}")
var disallowedStringsRegex = regexp.MustCompile("ab|cd|pq|xy")

func main() {
	input, err := os.ReadFile("../input.txt")
	check(err)

	lines := strings.Split(string(input), "\n")
	niceStringsCount := 0

	for _, line := range lines {
		if vowelsRegex.MatchString(line) && containsDoubleLetter(line) && !disallowedStringsRegex.MatchString(line) {
			niceStringsCount++
		}
	}

	fmt.Println(niceStringsCount)
}

func containsDoubleLetter(str string) bool {
	lastChar := ""
	for _, char := range str {
		if string(char) == lastChar {
			return true
		}
		lastChar = string(char)
	}

	return false
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
