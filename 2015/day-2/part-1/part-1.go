package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("../input.txt")
	check(err)

	lines := strings.Split(string(input), "\n")
	totalWrappingPaperSqFt := 0

	for _, line := range lines {
		if line == "" {
			continue
		}

		length, width, height := getDimensions(line)
		surfaceArea := 2*length*width +
			2*width*height +
			2*height*length +
			multiplySmallestTwo(length, width, height)

		totalWrappingPaperSqFt += surfaceArea
	}

	fmt.Println(totalWrappingPaperSqFt)
}

func getDimensions(dimensionsStr string) (int, int, int) {
	parts := strings.Split(dimensionsStr, "x")

	length, err := strconv.Atoi(parts[0])
	check(err)
	width, err := strconv.Atoi(parts[1])
	check(err)
	height, err := strconv.Atoi(parts[2])
	check(err)

	return length, width, height
}

func multiplySmallestTwo(x int, y int, z int) int {
	nums := []int{x, y, z}
	sort.Ints(nums)

	return nums[0] * nums[1]
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
