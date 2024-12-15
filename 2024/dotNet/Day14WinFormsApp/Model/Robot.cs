using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace aocDotnetApp
{
    internal class Robot
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Dx { get; }
        public int Dy { get; }
        public int MaxX { get; }
        public int MaxY { get; }

        public Robot(int x, int y, int dx, int dy, int maxX = 101, int maxY = 103)
        {
            X = x;
            Y = y;
            Dx = dx;
            Dy = dy;
            MaxX = maxX;
            MaxY = maxY;
        }

        public void Move()
        {
            this.X += this.Dx;
            this.Y += this.Dy;
            if (this.X < 0)
            {
                this.X += this.MaxX;
            }
            if (this.X >= this.MaxX)
            {
                this.X -= this.MaxX;
            }
            if (this.Y < 0)
            {
                this.Y += this.MaxY;
            }
            if (this.Y >= this.MaxY)
            {
                this.Y -= this.MaxY;
            }
        }

        public override string ToString()
        {
            return "Robot at (" + this.X + ", " + this.Y + ")";
        }
    }
}
