namespace Day15WinFormApp
{
    partial class Day15
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            textBox = new RichTextBox();
            startPart1 = new Button();
            startPart2 = new Button();
            isAnimatedCB = new CheckBox();
            SuspendLayout();
            // 
            // textBox
            // 
            textBox.BackColor = Color.Black;
            textBox.Font = new Font("Consolas", 11.25F, FontStyle.Bold, GraphicsUnit.Point, 238);
            textBox.ForeColor = Color.FloralWhite;
            textBox.Location = new Point(97, 12);
            textBox.Name = "textBox";
            textBox.ReadOnly = true;
            textBox.Size = new Size(1775, 977);
            textBox.TabIndex = 0;
            textBox.Text = "";
            // 
            // startPart1
            // 
            startPart1.BackColor = Color.Black;
            startPart1.ForeColor = Color.Gainsboro;
            startPart1.Location = new Point(12, 253);
            startPart1.Name = "startPart1";
            startPart1.Size = new Size(75, 44);
            startPart1.TabIndex = 1;
            startPart1.Text = "Start Part1";
            startPart1.UseVisualStyleBackColor = false;
            startPart1.Click += startPart1_Click;
            // 
            // startPart2
            // 
            startPart2.BackColor = Color.Black;
            startPart2.ForeColor = Color.Gainsboro;
            startPart2.Location = new Point(12, 337);
            startPart2.Name = "startPart2";
            startPart2.Size = new Size(75, 42);
            startPart2.TabIndex = 2;
            startPart2.Text = "Start Part2";
            startPart2.UseVisualStyleBackColor = false;
            startPart2.Click += startPart2_Click;
            // 
            // isAnimatedCB
            // 
            isAnimatedCB.AutoSize = true;
            isAnimatedCB.Location = new Point(5, 409);
            isAnimatedCB.Name = "isAnimatedCB";
            isAnimatedCB.Size = new Size(82, 19);
            isAnimatedCB.TabIndex = 3;
            isAnimatedCB.Text = "Animation";
            isAnimatedCB.UseVisualStyleBackColor = true;
            isAnimatedCB.CheckedChanged += isAnimatedCB_CheckedChanged;
            // 
            // Day15
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.DimGray;
            ClientSize = new Size(1884, 1001);
            Controls.Add(isAnimatedCB);
            Controls.Add(startPart2);
            Controls.Add(startPart1);
            Controls.Add(textBox);
            Name = "Day15";
            StartPosition = FormStartPosition.Manual;
            Text = "Day15";
            WindowState = FormWindowState.Maximized;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private RichTextBox textBox;
        private Button startPart1;
        private Button startPart2;
        private CheckBox isAnimatedCB;
    }
}