package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

var connections = make(map[string]string)
var valueCache = make(map[string]uint16)

func main() {
	input, err := os.ReadFile("../input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
	}

	lines := strings.Split(strings.TrimSpace(string(input)), "\n")

	for _, line := range lines {
		parts := strings.Split(line, " -> ")
		connections[parts[1]] = parts[0]
	}

	fmt.Println(getValue("a"))
}

// Get the value for a wire, by recursively processing any wires it depends on
func getValue(wire string) uint16 {
	// Return cached value if available
	if value, exists := valueCache[wire]; exists {
		return value
	}

	// If the input is already an integer
	if value, err := strconv.Atoi(wire); err == nil {
		valueCache[wire] = uint16(value)
		return valueCache[wire]
	}

	operation := connections[wire]

	// Direct assignment of an integer to a wire, e.g. "1 -> x"
	if value, err := strconv.Atoi(operation); err == nil {
		valueCache[wire] = uint16(value)
		return valueCache[wire]
	}

	switch {
	case strings.HasPrefix(operation, "NOT"):
		operand := strings.TrimPrefix(operation, "NOT ")
		value := ^getValue(operand)
		valueCache[wire] = value
		return value
	case strings.Contains(operation, "OR"):
		parts := strings.Split(operation, " OR ")
		value := getValue(parts[0]) | getValue(parts[1])
		valueCache[wire] = value
		return value
	case strings.Contains(operation, "AND"):
		parts := strings.Split(operation, " AND ")
		value := getValue(parts[0]) & getValue(parts[1])
		valueCache[wire] = value
		return value
	case strings.Contains(operation, "LSHIFT"):
		parts := strings.Split(operation, " LSHIFT ")
		value := getValue(parts[0]) << getValue(parts[1])
		valueCache[wire] = value
		return value
	case strings.Contains(operation, "RSHIFT"):
		parts := strings.Split(operation, " RSHIFT ")
		value := getValue(parts[0]) >> getValue(parts[1])
		valueCache[wire] = value
		return value
	default:
		// Wire to wire connection, e.g. "lx -> a"
		value := getValue(operation)
		valueCache[wire] = value
		return value
	}
}
