package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

var fileContent []string

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
	fmt.Println("Hello, Advent of Code 2024 - Day 6!")
	readFile("day6.txt")
	part1()
}

func part1() {
	fmt.Println("[part1]")

	// fmt.Println("File Content:", fileContent)
	for i := 0; i < len(fileContent); i++ {
		fmt.Println("#", i, fileContent[i])
	}
}
