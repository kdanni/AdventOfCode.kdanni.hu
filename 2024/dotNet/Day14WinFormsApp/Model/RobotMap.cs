using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;

namespace aocDotnetApp
{
    internal class RobotMap
    {
        List<Robot> robots = new List<Robot>();

        public RobotMap()
        {
            string startupDir = AppDomain.CurrentDomain.BaseDirectory;

            string filePath = Path.Combine(startupDir, "day14.txt");

            if (File.Exists(filePath))
            {
                string[] lines = File.ReadAllLines(filePath);
                foreach (string line in lines)
                {
                    Debug.WriteLine(line);
                }
            }
            else
            {
                Debug.WriteLine("File not found: " + filePath);
            }
        }
    }
}
