using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Day15WinFormApp.Model
{
    internal class Part2
    {
        public List<string> Lines { get; set; } = new List<string>();

        public int MaxX { get; set; }
        public int MaxY { get; set; }

        public Dictionary<(int, int), string> Map { get; set; } = new Dictionary<(int, int), string>();

        public Moves Moves { get; set; }
        public (int,int) Robot { get; set; } = (-1, -1);

        public Part2(Input15 input)
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
            }
            MaxX *= 2;
            for (int y = 0; y < MaxY; y+=1)
            {
                int l = 0;
                for (int x = 0; x < MaxX; x+=2)
                {
                    
                    var xy = input.Lines[y][l].ToString();
                    l++;
                    if (xy == "@")
                    {
                        Robot = (x, y);
                        Map.Add((x, y), "@");
                        Map.Add((x+1, y), ".");
                    }
                    else if (xy == "#")
                    {
                        Map.Add((x, y), "#");
                        Map.Add((x+1, y), "#");
                    }
                    else if (xy == "O")
                    {
                        Map.Add((x, y), "[");
                        Map.Add((x+1, y), "]");
                    }
                    else
                    {
                        Map.Add((x, y), ".");
                        Map.Add((x+1, y), ".");
                    }
                }
            }
        }

        public bool IsDone()
        {
            return Moves.IsDone();
        }

        internal void MoveRobot()
        {
            var (dx, dy) = Moves.GetMove();
            var (x, y) = (Robot.Item1 + dx, Robot.Item2 + dy);
            var (rx,ry) = (Robot.Item1, Robot.Item2);
            //Debug.WriteLine($"BEGIN Robot at ({Robot.X}, {Robot.Y}), Move: (dx: {dx}, dy: {dy}), x,y: ({x},{y}) ");
            if (x < 0 || x >= MaxX || y < 0 || y >= MaxY || Map[(x, y)] == "#")
            {
                return;
            }
            var list = new List<(int, int)>();
            list.Add((Robot.Item1, Robot.Item2));
            //Debug.WriteLine($"Map[(x, y)] ({x},{y}) , {Map[(x, y)].MapTile}");
            if(dy == 0)
            {
                list.Add((x, y));
                while (Map[(x, y)] != ".")
                {
                    (x, y) = (x + dx, y + dy);
                    if (x < 0 || x >= MaxX || y < 0 || y >= MaxY || Map[(x, y)] == "#")
                    {
                        return;
                    }
                    list.Add((x, y));
                }            
                for (int i = list.Count - 1; i > 0; i--)
                {
                    var to = list[i];
                    var from = list[i - 1];
                    var fromChar = Map[from];
                    Map.Remove(to);
                    Map.Remove(from);
                    Map.Add(to, fromChar);
                    Map.Add(from, ".");
                    if (fromChar == "@")
                    {
                        Robot = (to.Item1, to.Item2);
                    }
                }
            }
            if (dy != 0)
            {
                var dict = NeedToMove(rx, ry, dy);
                if (dict == null)
                {
                    return;
                }
                if (dy < 0)
                {
                    for (int iy = 0; iy < MaxY; iy++)
                    {
                        for (int ix = 0; ix < MaxX; ix++)
                        {
                            if (dict.ContainsKey((ix, iy)))
                            {
                                DoMove(ix, iy, dy);
                            }
                        }
                    }
                }
                else if (dy > 0)
                {
                    for (int iy = MaxY - 1; iy >= 0; iy--)
                    {
                        for (int ix = 0; ix < MaxX; ix++)
                        {
                            if (dict.ContainsKey((ix, iy)))
                            {
                                DoMove(ix, iy, dy);
                            }
                        }
                    }
                }                
            }            
        }

        void DoMove(int x, int y, int dy)
        {
            var fromChar = Map[(x,y)];
            //Debug.WriteLine($"from: Map[(from.Item1, from.Item2)] ({x},{y}) {fromChar}");
            if (fromChar == ".")
            {
                return;
            }
            var ly = y + dy;
            //Debug.WriteLine($"to: Map[(lx, ly)] ({x},{ly}) {Map[(x, ly)]}");
            Map.Remove((x, ly));
            Map.Remove((x,y));
            Map.Add((x, ly), fromChar);
            Map.Add((x,y), ".");
            if (fromChar == "@")
            {
                Robot = (x, ly);
            }
        }

        Dictionary<(int, int), bool>? NeedToMove(int x, int y, int dy)
        {
            var dict = new Dictionary<(int, int), bool>();
            dict[(x, y)] = true;
            if (y + dy < 0 || y + dy >= MaxY)
            {
                return null;
            }
            string testChar = Map[(x, y + dy)];
            if (testChar == "#")
            {
                return null;
            }
            if (testChar == ".")
            {
                return dict;
            }
            if (testChar == "[")
            {
                var l1 = NeedToMove(x, y + dy, dy);
                if(l1 == null)
                {
                    return null;
                }
                l1.Keys.ToList().ForEach(k => dict[k] = true);
                var l2 = NeedToMove(x+1, y + dy, dy);
                if (l2 == null)
                {
                    return null;
                }
                l2.Keys.ToList().ForEach(k => dict[k] = true);
            }
            if (testChar == "]")
            {
                var l1 = NeedToMove(x - 1, y + dy, dy);
                if (l1 == null)
                {
                    return null;
                }
                l1.Keys.ToList().ForEach(k => dict[k] = true);
                var l2 = NeedToMove(x, y + dy, dy);
                if (l2 == null)
                {
                    return null;
                }
                l2.Keys.ToList().ForEach(k => dict[k] = true);

            }
            return dict;
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
                        ret += "" + xy;
                        if(xy == "[")
                        {
                            solution += (100 * y) + x;
                        }

                    }
                    ret += Environment.NewLine;
                }
                ret += Environment.NewLine;
                ret += $"Robot: ({Robot.Item1},{Robot.Item2}), Moves.Index: {Moves.Index} , Part 2: {solution}";

                return ret;
            }
        }

    }
}
