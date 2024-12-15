using System.Diagnostics;
using System.Numerics;


namespace Day15WinFormApp.Model
{
    internal class Map15
    {
        public List<string> Lines { get; set; } = new List<string>();

        public int MaxX { get; set; }
        public int MaxY { get; set; }

        public Dictionary<(int, int), IXY> Map { get; set; } = new Dictionary<(int, int), IXY>();

        public Robot Robot { get; set; } = new Robot(-1, -1);
        public Moves Moves { get; set; }

        public Map15(Input15 input)
        {
            Moves = new Moves(input);
            MaxX = input.Lines[0].Length;
            for (int i = 0; i < input.Lines.Length; i++)
            {
                MaxY = i;
                if (input.Lines[i].Length < 1)
                {
                    break;
                }
                Lines.Add(input.Lines[i]);
                //Debug.WriteLine($"{i}, {input.Lines[i].Length}: {input.Lines[i]}");
            }

            for (int y = 0; y < MaxY; y++)
            {
                for (int x = 0; x < MaxX; x++)
                {
                    var xy = input.Lines[y][x].ToString();
                    if (xy == "@")
                    {
                        Robot.X = x;
                        Robot.Y = y;
                        Map.Add((x, y), Robot);
                    }
                    else if (xy == "#")
                    {
                        Map.Add((x, y), new Wall(x, y));
                    }
                    else if (xy == "O")
                    {
                        Map.Add((x, y), new Box(x, y));
                    }
                    else
                    {
                        Map.Add((x, y), new Empty(x, y));
                    }
                }
            }
        }

        public bool IsDone()
        {
            return Moves.IsDone();
        }

        public void MoveRobot()
        {
            var (dx, dy) = Moves.GetMove();
            var (x, y) = (Robot.X + dx, Robot.Y + dy);
            //Debug.WriteLine($"BEGIN Robot at ({Robot.X}, {Robot.Y}), Move: (dx: {dx}, dy: {dy}), x,y: ({x},{y}) ");
            if (x < 0 || x >= MaxX || y < 0 || y >= MaxY || Map[(x, y)].MapTile == "#")
            {
                return;
            }
            var list = new List<(int,int)>();
            list.Add((Robot.X,Robot.Y));
            list.Add((Map[(x, y)].X, Map[(x, y)].Y));
            //Debug.WriteLine($"Map[(x, y)] ({x},{y}) , {Map[(x, y)].MapTile}");
            while (Map[(x, y)].MapTile != ".")
            {
                (x, y) = (x + dx, y + dy);
                if (x < 0 || x >= MaxX || y < 0 || y >= MaxY || Map[(x, y)].MapTile == "#")
                {
                    return;
                }
                list.Add((x, y));
            }
            //foreach (var l in list)
            //{
            //    Debug.WriteLine($"{l}");
            //}
            for (int i = list.Count - 1; i > 0; i--)
            {
                var to = list[i];
                var from = list[i-1];
                var fromIXY = Map[from];
                //Debug.WriteLine($"from: {fromIXY.MapTile} ({from})");
                //Debug.WriteLine($"to: {Map[to].MapTile} ({to})");
                Map.Remove(to);
                Map.Remove(from);
                fromIXY.X = to.Item1;
                fromIXY.Y = to.Item2;
                Map.Add(to, fromIXY);
                var e = new Empty(from.Item1, from.Item2);
                Map.Add(from, e);
            }
            //Debug.WriteLine($"END Robot at ({Robot.X}, {Robot.Y})");
        }

        
        public new string ToString
        {
            get
            {
                string ret = "";
                long solution = 0;
                for (int y = 0; y < MaxY; y++)
                {
                    ret += $"{y}".PadLeft(3) + " ";
                    for (int x = 0; x < MaxX; x++)
                    {
                        var xy = Map[(x, y)];
                        ret += " " + xy.MapTile;
                        if (xy.MapTile == "O")
                        {
                            solution += (100 * y) + x;
                        }
                    }
                    ret += Environment.NewLine;
                }
                ret += Environment.NewLine;
                ret += $"Robot: ({Robot.X},{Robot.Y}), Moves.Index: {Moves.Index} , Solution: {solution}";

                return ret;
            }
        }
    }
}