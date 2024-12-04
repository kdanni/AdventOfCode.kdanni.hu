#include <stdio.h>

int main() {
    // Print hello word text to standard output
    printf("[day1]\n");

    // Read ./day1.txt file and then print it to standard output

    // Open file
    FILE *file = fopen("day1.txt", "r");

    // Check if file is opened successfully
    if (file == NULL) {
        printf("Cannot open file\n");
        return 1;
    }

    // Read file
    char line[100];
    while (fgets(line, sizeof(line), file)) {
        printf("%s", line);
    }

    // Close file
    fclose(file);

    

    return 0;
}