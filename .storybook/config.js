import { addParameters, configure } from '@storybook/angular';

import GlobetrotterTheme from './globetrotter-theme';

addParameters({
  options: {
    theme: GlobetrotterTheme,
    panelPosition: 'bottom',
  },
});

addParameters({
  viewport: {
    /**
     * name to display in the dropdown
     * @type {String}
     */
    name: 'Responsive',

    /**
     * Inline styles to be applied to the story (iframe).
     * styles is an object whose key is the camelCased version of the style name, and whose
     * value is the style’s value, usually a string
     * @type {Object}
     */
    styles: {
      width: '100%',
      height: '100%',
    },

    /**
     * type of the device (e.g. desktop, mobile, or tablet)
     * @type {String}
     */
    type: 'desktop',
  }
});

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
