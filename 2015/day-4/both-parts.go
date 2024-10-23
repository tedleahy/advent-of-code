package main

import (
	"crypto/md5"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

var md5TargetPrefix string

func printUsage() {
	fmt.Println("Usage: 'go run ./both-parts.go <part to run>'")
	os.Exit(1)
}

func main() {
	input := "ckczppom"
	var solution int

	if len(os.Args) > 1 {
		switch os.Args[1] {
		case "1":
			md5TargetPrefix = "00000"
		case "2":
			md5TargetPrefix = "000000"
		default:
			printUsage()
		}
	} else {
		printUsage()
	}

	for i := 0; ; i++ {
		if makesCorrectMD5(input, i) {
			solution = i
			break
		}
	}

	fmt.Println(solution)
}

// Converts toAppend to a string, appends it to str, and checks if MD5-hashing the resulting string returns a hash that
// begins with 5 zeroes
func makesCorrectMD5(str string, toAppend int) bool {
	return strings.HasPrefix(
		strToMD5(str+strconv.Itoa(toAppend)),
		"00000",
	)
}

func strToMD5(str string) string {
	hash := md5.New()
	io.WriteString(hash, str)
	return fmt.Sprintf("%x\n", hash.Sum(nil))
}
