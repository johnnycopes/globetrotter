import { storiesOf, moduleMetadata } from '@storybook/angular';
import {
  withKnobs
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

const actions = {
  onConfirm: action('confirmed')
};

storiesOf('Shared/Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      declarations: [ModalComponent, ButtonComponent]
    })
  )
  .add('open', () => {
    return {
      template: `
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <p>Lots of content in the background Lots of content in the background Lots of content in the background Lots of content in the background</p><br>
        <app-modal *ngIf="true"
          (confirmed)="onModalConfirm()"
          >
          Thank you for reading this notification.
        </app-modal>
      `,
      props: {
        onModalConfirm: actions.onConfirm
      }
    };
  });
