using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace PuzzleInput
{
    public class PuzzleInput
    {
        public PuzzleInput() { }
        public string GetPuzzleInput(int day, string token)
        {

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://adventofcode.com/2024/day/" + day + "/input");
                client.DefaultRequestHeaders.Add("Cookie", "session=" + token + ";");
                HttpResponseMessage response = client.GetAsync("").Result;
                response.EnsureSuccessStatusCode();
                string responseBody = response.Content.ReadAsStringAsync().Result;
                return responseBody;

            }
        }
    }

}
