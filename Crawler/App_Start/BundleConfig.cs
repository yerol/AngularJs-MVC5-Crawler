using System.Web.Optimization;

namespace Crawler
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/angular").Include(
						"~/Scripts/angular.js"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
						"~/Scripts/bootstrap.js"));

			bundles.Add(new ScriptBundle("~/bundles/app").Include(
						"~/js/app.js",
						"~/js/crawler-directive.js",
						"~/js/crawler-controller.js",
						"~/js/crawler-factory.js",
						"~/js/crawler-service.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
						"~/Content/bootstrap.css",
						"~/Content/site.css"));
		}
	}
}
