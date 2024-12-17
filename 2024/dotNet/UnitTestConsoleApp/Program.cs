
using UnitTestConsoleApp;

Console.WriteLine("Hello, World!");



//Console.WriteLine(PuzzleInputTest.GetPuzzleInputWrapper(15));

string day15 = PuzzleInputTest.GetPuzzleInputWrapper(15);

var lines = day15.Split(Environment.NewLine);
for (var line = 0; line < lines.Length; line++)
{
    Console.WriteLine(lines[line]);
}