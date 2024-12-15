using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Day15WinFormApp.Model
{
    internal class Wall : IXY
    {
        public int X { get; set; }
        public int Y { get; set; }
        public string MapTile { get; set; }
        public Wall(int x, int y)
        {
            MapTile = "#";
            X = x;
            Y = y;
        }
    }
}
