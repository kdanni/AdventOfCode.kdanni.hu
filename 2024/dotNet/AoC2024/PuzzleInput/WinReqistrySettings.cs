using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PuzzleInput
{
    public class WinReqistrySettings
    {
        private const string DefaultSubKey = @"SOFTWARE\kdanni\AoC\Config";
        public string SubKey { get; set; }
        public string TokenKeyName { get; set; }

        public WinReqistrySettings()
        {
            SubKey = DefaultSubKey;
            TokenKeyName = "Token";

            using (RegistryKey key = Registry.CurrentUser.CreateSubKey(SubKey))
            {

                if (key != null)
                {
                    var v = key.GetValue(TokenKeyName)?.ToString();
                    if (v == null)
                    {
                        key.SetValue(TokenKeyName, "null");
                    }
                }
            }
        }

        public string GetToken()
        {
            using (RegistryKey key = Registry.CurrentUser.OpenSubKey(SubKey))
            {
                if (key != null)
                {
                    return key.GetValue(TokenKeyName)?.ToString();
                }
                return null;
            }
        }

    }
}
