using ArcGIS.Desktop.Framework.Contracts;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ArchesEsri
{
    internal class Button1 : Button
    {


        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        static async Task Taco()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://qa.archesproject.org/search/resources");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                ArcGIS.Desktop.Framework.Dialogs.MessageBox.Show($"Project path: {responseBody}", "Project Info");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }
        }
        protected override void OnClick()
        {
            Taco();
        }
    }
}
