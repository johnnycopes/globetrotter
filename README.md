# Globetrotter

#### Live links:

- **Application**: https://globetrotter.surge.sh
- **Component library**: https://globetrotter-components.surge.sh

This is a geography app! Currently, only the Learn section is complete: you can test yourself on the national flags, capitals, or country names from any part(s) of the world that you choose and receive a score based on your answers. The application is built with [Angular](https://angular.io/) and the component library is built with [Storybook](https://storybook.js.org/).

#### Local installation:

1. Clone the project repository
1. Navigate into the newly-created directory and install all dependencies by running `npm install`
1. Navigate into the project folder
1. **To open the application**: run `npm start`. This will run the app locally in a new browser tab pointing to `http://localhost:4200/`
1. **To open the component library**: run `npm run storybook`. This will run Storybook locally in a new browser tab pointing to `http://localhost:6006/`
1. In opening either the app or the component library, changing the source files will reload the served project on save

#### Goals of this project:

- Tap into the [REST Countries API](https://restcountries.eu) for all data
- Build a well-organized, sophisticated front-end application with Angular
- Include some slick transitions/effects in the app with Angular's animations module
- Create a polished set of generic components and document them with Storybook

#### Future plans:

- Make app mobile-friendly (currently, it looks good only on tablet screens or larger)
- Add ability to view and re-take past quizzes
- Add timer to application to include with finished quiz info
- Make this a progressive web application by following [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) PWA guidelines
- Build out new features: user authentication, ability to browse countries and save those you've visited or would like to visit, and packing checklists
