# AngularJs-MVC5-Crawler
A web crawler built with jQuery/AngularJs with an MVC5 backend for fetching cross-domain page markup

Built using Microsoft Visual Studio 2013
Asp.Net MVC5 for backend
Angular Js with jQuery for front-end
Using Bootstrap for simple styling.

## Limitations
Only parses Anchors with valid HREF attribute and IMG elements with valid SRC attribute
Subdomains of a given url is treated as a different domain i.e. www.bbc.co.uk is not the same domain as bbc.co.uk
