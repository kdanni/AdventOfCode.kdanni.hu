using Day15WinFormApp.Model;
using System.ComponentModel;
using System.Diagnostics;


namespace Day15WinFormApp
{
    public partial class Day15 : Form
    {
        private BackgroundWorker backgroundWorker;

        Input15 Input15 { get; set; }
        Map15? Map15 { get; set; }
        Part2? Part2 { get; set; }


        int MoveCount { get; set; } = 0;
        bool NoAnimation { get; set; } = true;

        public Day15()
        {

            DoubleBuffered = true;
            Input15 = new Input15();
            InitializeComponent();
            isAnimatedCB.Checked = !NoAnimation;

        }

        private void InitializeBackgroundWorker()
        {
            backgroundWorker = new BackgroundWorker
            {
                WorkerReportsProgress = true,
                WorkerSupportsCancellation = true
            };
            backgroundWorker.DoWork += BackgroundWorker_DoWork;
            backgroundWorker.ProgressChanged += BackgroundWorker_ProgressChanged;
            backgroundWorker.RunWorkerAsync();
        }

        private void BackgroundWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            if (Map15 != null)
            {
                DoWorkPart1();
            }
            else if (Part2 != null)
            {
                DoWorkPart2();
            }

        }

        private void DoWorkPart2()
        {
            while (Part2 != null && !Part2.IsDone())
            {
                if (!NoAnimation)
                {
                    System.Threading.Thread.Sleep(10);
                }
                Part2.MoveRobot();
                MoveCount++;
                if (!NoAnimation)
                {
                    System.Threading.Thread.Sleep(10);
                    backgroundWorker.ReportProgress(MoveCount);
                }
                else
                {
                    if (MoveCount % 100 == 0)
                    {
                        System.Threading.Thread.Sleep(20);
                        backgroundWorker.ReportProgress(MoveCount);
                        System.Threading.Thread.Sleep(20);
                    }
                }
            }
            if (NoAnimation && Part2 != null && Part2.IsDone())
            {
                backgroundWorker.ReportProgress(MoveCount);
            }
        }

        private void DoWorkPart1()
        {
            while (Map15 != null && !Map15.IsDone())
            {
                if (!NoAnimation)
                {
                    System.Threading.Thread.Sleep(20);
                }
                Map15.MoveRobot();
                MoveCount++;
                if (!NoAnimation)
                {
                    System.Threading.Thread.Sleep(20);
                    backgroundWorker.ReportProgress(MoveCount);
                }
                else
                {
                    if (MoveCount % 100 == 0)
                    {
                        System.Threading.Thread.Sleep(20);
                        backgroundWorker.ReportProgress(MoveCount);
                        System.Threading.Thread.Sleep(20);
                    }
                }
            }
            if (NoAnimation && Map15 != null && Map15.IsDone())
            {
                backgroundWorker.ReportProgress(MoveCount);
            }
        }

        private void BackgroundWorker_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {

            if (Map15 != null)
            {
                SetTextBox(Map15.ToString);
            }
            else if (Part2 != null)
            {
                SetTextBox(Part2.ToString);
            }

        }

        private void SetTextBox(string text)
        {
            try
            {
                textBox.Text = text;
            }
            catch (Exception err)
            {
                Debug.WriteLine(err.Message);
            }
        }

        private void startPart1_Click(object sender, EventArgs e)
        {
            Part2 = null;
            Map15 = new Map15(Input15);
            MoveCount = 0;
            SetTextBox(Map15.ToString);
            InitializeBackgroundWorker();
        }

        private void startPart2_Click(object sender, EventArgs e)
        {
            Map15 = null;
            Part2 = new Part2(Input15);
            MoveCount = 0;
            SetTextBox(Part2.ToString);
            InitializeBackgroundWorker();
        }

        private void isAnimatedCB_CheckedChanged(object sender, EventArgs e)
        {
            NoAnimation = !isAnimatedCB.Checked;
        }
    }
}
