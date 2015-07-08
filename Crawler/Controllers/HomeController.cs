using System.IO;
using System.Net;
using System.Web.Mvc;

namespace Crawler.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}
		
		/// <summary>
		/// The handler responsible from fetching the markup of the page url provided
		/// </summary>
		/// <param name="url">The url to be downloaded</param>
		/// <returns>String - Downloaded page markup</returns>
		public string Fetch(string url)
		{
			string htmlText = "";

			// Create a new web request
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
			// Don't want a persistent connection
			request.KeepAlive = false;
			// GET only
			request.Method = WebRequestMethods.Http.Get;
			// HTML content type
			request.ContentType = "text/html";

			// Make the call
			WebResponse response = request.GetResponse();
			// Get the response stream and read it till the end
			Stream stream = response.GetResponseStream();
			if (stream != null)
			{
				StreamReader reader = new StreamReader(stream);
				htmlText = reader.ReadToEnd();
			}

			// Return whatever we have from the given url
			return htmlText;
		}
	}
}