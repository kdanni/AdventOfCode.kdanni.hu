
namespace Day15WinFormApp.Model
{
    internal class Input15
    {
        public string RawInput { get; set; } = "";
        public string[] Lines { get; set; }
        public Input15() {
            var pi = new PuzzleInput.PuzzleInput();
            var reg = new PuzzleInput.WinReqistrySettings();

            RawInput = pi.GetPuzzleInput(15, reg.GetToken());
            RawInput ??= "";
            Lines = RawInput.Split('\n');
        }        
    }
}
