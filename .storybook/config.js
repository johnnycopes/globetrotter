import { addParameters, configure } from '@storybook/angular';

import GlobetrotterTheme from './globetrotter-theme';

addParameters({
  options: {
    name: 'Globetrotter',
    theme: GlobetrotterTheme,
    panelPosition: 'bottom'
  }
});

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
