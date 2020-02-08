# Globetrotter

#### Live links:

- **Application**: [https://globetrotter-app.azurewebsites.net](https://globetrotter-app.azurewebsites.net/)
- **Component library**: [https://globetrotter-components.surge.sh](https://globetrotter-components.surge.sh)

This is a geography app! Currently, you can test yourself on the national flags, capitals, or country names from any part(s) of the world that you choose and receive a score based on your answers. More sections are planned and are currently under construction.

The application has an [Angular](https://angular.io/) front-end, a [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/) back-end, and is hosted on [Microsoft Azure](https://azure.microsoft.com/en-us/). The component library is built with [Storybook](https://storybook.js.org/) and hosted on [Surge](https://surge.sh/).

#### Local installation:

1. _Back-end_: navigate into the `api` folder, open the solution in Visual Studio, install all packages with NuGet package manager, and run the solution

1. _Front-end_: navigate into the `client` folder, install all dependencies with npm (`npm install`), and run `npm start` to boot the app in a new browser tab at `http://localhost:4200/`

1. _Component library_: in the `client` folder, run `npm run storybook`. This will run Storybook locally in a new browser tab at`http://localhost:6006/`

#### Goals of this project:

- Tap into the [REST Countries API](https://restcountries.eu) for all data
- Build a well-organized, sophisticated front-end application with Angular
- Build a back-end with .NET Core so that users can make an account and save data specific to them
- Deploy the project to Azure
- Create a polished set of generic components and document them with Storybook

#### Future plans:

- Make app mobile-friendly (currently, it looks good only on tablet screens or larger)
- Add ability to view and re-take past quizzes
- Add timer to application to include with finished quiz info
- Make this a progressive web application by following [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) PWA guidelines
- Build out new features: user authentication, ability to browse countries and save those you've visited or would like to visit, and packing checklists