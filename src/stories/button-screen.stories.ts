import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
} from '@storybook/addon-knobs/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ButtonScreenComponent } from 'src/app/shared/button-screen/button-screen.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { RadioButtonsComponent } from 'src/app/shared/radio-buttons/radio-buttons.component';

const actions = {
  onClick: action('clicked')
};

storiesOf('Shared | Button Screen', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [
        ButtonScreenComponent,
        ButtonComponent,
        RadioButtonsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  )
  .add('with text', () => {
    return {
      template: `
        <app-button-screen
          [buttonText]="buttonText"
          [buttonDisabled]="buttonDisabled"
          (clicked)="onClick($event)"
          >
          <h1 style="font-size: 96px; text-align: center;">
            Globetrotter
          </h1>
        </app-button-screen>
      `,
      props: {
        buttonText: text('buttonText', 'Embark'),
        buttonDisabled: boolean('buttonDisabled', false),
        onClick: actions.onClick
      }
    };
  })
  .add('with component', () => {
    return {
      template: `
        <app-button-screen
          [buttonText]="buttonText"
          [buttonDisabled]="buttonDisabled"
          (clicked)="onClick($event)"
          >
          <app-radio-buttons
            text="Choose an option:"
            [stackedVertically]="true"
            [options]="[
              { display: 'Option A', value: 1 },
              { display: 'Option B', value: 2 },
              { display: 'Option C', value: 3 }
            ]"
            >
          </app-radio-buttons>
        </app-button-screen>
      `,
      props: {
        buttonText: text('buttonText', 'Next'),
        buttonDisabled: boolean('buttonDisabled', false),
        onClick: actions.onClick
      }
    };
  });
