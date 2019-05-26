# Globetrotter

#### Live links:

- **Application**: https://globetrotter.surge.sh
- **Component library**: https://globetrotter-components.surge.sh

This is a geography quiz! Test yourself on the national flags from any part(s) of the world that you choose and receive a score based on your answers. The application is built with [Angular](https://angular.io/) and the component library is built with [Storybook](https://storybook.js.org/).

#### Local installation:

1. Clone the project repository
1. Navigate into the newly-created directory and install all dependencies by running `npm install`
1. Navigate into this project's folder via your terminal
1. **To open the application**: run `npm start`. This will run the app locally in a new browser tab pointing to `http://localhost:4200/`
1. **To open the component library**: run `npm run storybook`. This will run Storybook locally in a new browser tab pointing to `http://localhost:6006/`
1. In either case, changing the source files will reload the served applications on save

#### Goals of this project:

- Tap into the [REST Countries API](https://restcountries.eu) for all data
- Build a well-organized, sophisticated front-end application with Angular
- Include some slick transitions/effects in the app with Angular's animations module
- Create a polished set of generic components and document them with Storybook

#### Future plans:

- Make app mobile-responsive (currently, it looks good only on tablet screens or larger)
- Ability to take different quizzes (such as population size or capital city)
- Ability to view and re-take past quizzes
- Add timer to application to include with finished quiz info
- Make this a progressive web application by following [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) PWA guidelines
- Ability to create user account in order to save quizzes and scores
