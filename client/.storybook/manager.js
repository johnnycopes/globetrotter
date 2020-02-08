import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';

const globetrotterTheme = create({
  base: 'dark',
  brandTitle: 'Globetrotter',
  brandUrl: 'https://globetrotter-app.azurewebsites.net//',
  brandImage: 'assets/Globetrotter.svg',
  gridCellSize: 12
});

addons.setConfig({
  panelPosition: 'bottom',
  theme: globetrotterTheme
});
