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
	totalRibbonFeet := 0

	for _, line := range lines {
		if line == "" {
			continue
		}

		length, width, height := getDimensions(line)
		smallestSide1, smallestSide2 := smallestTwo(length, width, height)
		totalRibbonFeet += smallestSide1*2 + smallestSide2*2 + (length * width * height)
	}

	fmt.Println(totalRibbonFeet)
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

func smallestTwo(x int, y int, z int) (int, int) {
	nums := []int{x, y, z}
	sort.Ints(nums)

	return nums[0], nums[1]
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
