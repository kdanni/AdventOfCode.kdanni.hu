using PuzzleInput;

namespace UnitTestConsoleApp
{
    internal class PuzzleInputTest
    {
        public static string GetPuzzleInputWrapper(int day)
        {
            return PuzzleInput.GetPuzzleInput(day);
        }
    }
}
