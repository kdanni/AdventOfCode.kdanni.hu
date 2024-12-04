package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"regexp"
	"sort"
	"strconv"
)

var fileContent []string
var left []int
var right []int

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
	fmt.Println("[day1]")
	readFile("day1.txt")
	part1()
	part2()
	fmt.Println("Solution:", solution, "Solution2:", solution2)
}

func part1() {
	fmt.Println("[part1]")

	re, _ := regexp.Compile(`(\d+)\D+(\d+)`)

	for i := 0; i < len(fileContent); i++ {
		matches := re.FindStringSubmatch(fileContent[i])
		if len(matches) >= 3 {
			leftValue, _ := strconv.Atoi(matches[1])
			rightValue, _ := strconv.Atoi(matches[2])
			left = append(left, leftValue)
			right = append(right, rightValue)
		} else {
			fmt.Println("No match found")
		}
	}

	// fmt.Println("Left values:", left)
	// fmt.Println("Right values:", right)

	sort.Ints(left)
	sort.Ints(right)

	// fmt.Println("Left values:", left)
	// fmt.Println("Right values:", right)

	var sum int = 0

	for i := 0; i < len(left); i++ {
		leftValue := left[i]
		rightValue := right[i]
		dif := int(math.Abs(float64(rightValue - leftValue)))
		// fmt.Println("Left:", leftValue, "Right:", rightValue, "Difference:", dif)
		sum += dif
	}

	// fmt.Println("Sum:", sum)
	solution = sum
}

func part2() {
	fmt.Println("[part2]")

	var sum int = 0

	for i := 0; i < len(left); i++ {
		var leftValue int = left[i]
		var similarityScore int = 0
		for j := 0; j < len(right); j++ {
			if leftValue == right[j] {
				similarityScore += leftValue
			}
		}
		sum += similarityScore
	}

	// fmt.Println("Sum:", sum)
	solution2 = sum
}
