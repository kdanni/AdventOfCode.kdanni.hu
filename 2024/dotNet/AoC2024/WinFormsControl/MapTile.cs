using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AoC2024.WinFormsControl
{
    public partial class MapTile : UserControl
    {
        public Color color { get; set; }

        public void Repaint(Color color)
        {
            this.color = color;
            this.Invalidate();
        }

        public MapTile()
        {
            this.color = Color.Black;
            InitializeComponent();
            this.DoubleBuffered = true;
            this.Paint += new PaintEventHandler(MapTile_Paint); // Associate the Paint event
        }

        private void UserControl1_Load(object sender, EventArgs e)
        {

        }

        private void MapTile_Paint(object sender, PaintEventArgs e)
        {
            // Get the graphics object
            Graphics g = e.Graphics;

            // Set up drawing tools
            Brush brush = new SolidBrush(this.color);

            // Fill a rectangle
            g.FillRectangle(brush, new Rectangle(0, 0, 10, 10));

            // Clean up
            brush.Dispose();
        }
    }
}
