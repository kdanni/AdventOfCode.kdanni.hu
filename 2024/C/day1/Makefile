# Makefile for compiling and running day1.c

# Compiler
CC = gcc

# Compiler flags
CFLAGS = -Wall -Wextra -std=c11

# Target executable
TARGET = day1.exe

# Source files
SRCS = day1.c

# Default target
all: $(TARGET)

# Compile the target
$(TARGET): $(SRCS)
	$(CC) $(CFLAGS) -o $(TARGET) $(SRCS)

# Clean up
clean:
	rm -f $(TARGET)

# Run the program
run: $(TARGET)
	./$(TARGET)