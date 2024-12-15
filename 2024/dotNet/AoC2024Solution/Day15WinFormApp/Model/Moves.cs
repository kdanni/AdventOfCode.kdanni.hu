using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Windows.Forms.LinkLabel;

namespace Day15WinFormApp.Model
{
    internal class Moves
    {

        public List<string> directions { get; set; } = new List<string>();
        public int Index { get; set; } = 0;
        public Moves(Input15 input)
        {
            bool isMap = true;
            for (int i = 0; i < input.Lines.Length; i++)
            {
                if (input.Lines[i].Length < 1)
                {
                    isMap = false;
                }
                if (!isMap)
                {
                    var line = input.Lines[i].Trim();
                    for (int j = 0; j < line.Length; j++)
                    {
                        directions.Add(line[j].ToString());
                    }
                }
            }
            Debug.WriteLine($"directions: {directions.Count}");
        }

        public bool IsDone()
        {
            return Index >= directions.Count;
        }

        internal (int dx, int dy) GetMove()
        {
            if (Index >= directions.Count)
            {
                return (0, 0);
            }
            string direction = directions[Index];
            Index++;
            if (direction == "N" || direction == "^")
            {
                return (0, -1);
            }
            else if (direction == "S" || direction == "v")
            {
                return (0, 1);
            }
            else if (direction == "W" || direction == "<")
            {
                return (-1, 0);
            }
            else if (direction == "E" || direction == ">")
            {
                return (1, 0);
            }
            else
            {
                return (0, 0);
            }

        }
    }
}
