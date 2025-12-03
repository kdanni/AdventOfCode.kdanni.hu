package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

var fileContent []string

var solution int = 0
var solution2 int = 0

func readFile(filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("failed to open file: %s", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fileContent = append(fileContent, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("error reading file: %s", err)
	}
}

func main() {
	fmt.Println("[day16]")
	readFile("example.txt")
	// readFile("day16.txt")
	part1()
	part2()
	fmt.Println("Solution:", solution, "Solution2:", solution2)
}

// Define a struct to represent the key
type Point struct {
	X, Y int
}

var dirChars = []string{"N", "E", "S", "W"}

func (p Point) dirOffset(dir string) Point {
	switch dir {
	case "N":
	case "^":
		return Point{0, -1}
	case "E":
	case ">":
		return Point{1, 0}
	case "S":
	case "v":
		return Point{0, 1}
	case "W":
	case "<":
		return Point{-1, 0}
	}
	return Point{0, 0}
}

var dictionary = make(map[Point]string)
var start = Point{0, 0}
var end = Point{0, 0}

func part1() {
	fmt.Println("[part1]")

	// re, _ := regexp.Compile(`(\d+)\D+(\d+)`)

	for y := 0; y < len(fileContent); y++ {
		// fmt.Printf("#%03d %s\n", y, fileContent[y])
		var line = ""
		for x := 0; x < len(fileContent[y]); x++ {
			var c = string(fileContent[y][x])
			if c == "S" {
				c = "."
				start = Point{x, y}
			} else if c == "E" {
				c = "."
				end = Point{x, y}
			}
			dictionary[Point{x, y}] = c
			line += c
		}
		fmt.Printf("#%03d %s\n", y, line)
	}

	fmt.Println("\n\n", dictionary)
	fmt.Println("Start:", start, "End:", end)

	var sum int = 0

	// fmt.Println("Sum:", sum)
	solution = sum
}

func part2() {
	fmt.Println("[part2]")

	var sum int = 0

	// fmt.Println("Sum:", sum)
	solution2 = sum
}
