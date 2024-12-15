//using PuzzleInput;


namespace UnitTestConsoleApp
{
    internal class PuzzleInputTest
    {
        
        public static string GetPuzzleInputWrapper(int day)
        {
            //return PuzzleInput.GetPuzzleInput(day);

            
            PuzzleInput.PuzzleInput puzzleInput = new PuzzleInput.PuzzleInput();
            PuzzleInput.WinReqistrySettings winReqistrySettings = new PuzzleInput.WinReqistrySettings();

            string token = winReqistrySettings.GetToken();


            //return token;

            return puzzleInput.GetPuzzleInput(day, token);
        }
    }
}
